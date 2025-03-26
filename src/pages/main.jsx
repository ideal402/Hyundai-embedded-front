import React, { useEffect, useState, useContext, useRef } from "react";
import * as S from "./main.style";
import StatusCard from "../component/StatusCard";
import CarStatus from "../component/CarStatus";
import FadeImage from "../component/FadeImage";
import ConnectionModal from "../component/ConnectedModal";
import AlertModal from "../component/AlertModal";
import api from "../api";
import { WebSocketContext } from "../context/WebSocketContext";

const TOP_SENSOR_KEYS = ["temperature", "humidity", "illuminance"];
const BOTTOM_SENSOR_KEYS = ["motorSpeed", "mileage"];

function Main() {
  const { socket, sendMessage } = useContext(WebSocketContext);
  const [lastSensorTime, setLastSensorTime] = useState(Date.now());
  const [espConnected, setEspConnected] = useState(true);
  const [showVibModal, setShowVibModal] = useState(false);
  const [showSpeedModal, setShowSpeedModal] = useState(false);
  const [showACModal, setShowACModal] = useState(false);
  const [acTurnedOn, setAcTurnedOn] = useState(false); 
  const [showTopCards, setShowTopCards] = useState(false);
  const [carStatus, setCarStatus] = useState(null);
  const [latest, setLatest] = useState(null);
  const [sensorData, setSensorData] = useState({
    temperature: [],
    humidity: [],
    motorSpeed: [],
    illuminance: [],
    mileage: [],
  });
  const [sensorMinuteData, setSensorMinuteData] = useState({
    temperature: [],
    humidity: [],
    illuminance: [],
  });
  const speedOverStartRef = useRef(null);
  
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const sensorRes = await api.get("/sensor");
        const carRes = await api.get("/carState");
        console.log("🚀 ~ fetchInitialData ~ carRes:", carRes)
  
        const sensorArray = sensorRes.data.data || [];
  
        setSensorData({
          temperature: sensorArray.map(s => ({ temperature: s.temperature, createdAt: s.createdAt })),
          humidity: sensorArray.map(s => ({ humidity: s.humidity, createdAt: s.createdAt })),
          motorSpeed: sensorArray.map(s => ({ motorSpeed: s.motorSpeed, createdAt: s.createdAt })),
          illuminance: sensorArray.map(s => ({ illuminance: s.illuminance, createdAt: s.createdAt })),
          mileage: sensorArray.map(s => ({ mileage: s.mileage, createdAt: s.createdAt })),
        });
  
        const firstSensor = sensorArray[0];
        const initialMinuteData = {};
        TOP_SENSOR_KEYS.forEach((key) => {
          initialMinuteData[key] = [{
            [key]: firstSensor?.[key] ?? 0,
            createdAt: new Date().toISOString()
          }];
        });
        setSensorMinuteData(initialMinuteData);
  
        setLatest(firstSensor);
        setCarStatus(carRes.data.data);
      } catch (error) {
        console.error("초기 데이터 로딩 실패:", error);
      }
    };
    fetchInitialData();
  }, []);
  

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "sensor") {
          const now = Date.now();
          setLastSensorTime(now);
          setEspConnected(true);

          const newSensor = {
            ...data.payload,
            createdAt: data.payload.createdAt || new Date().toISOString(),
          };

          if (data.vib === 1) {
            setShowVibModal(true);
          }

          const motorSpeed = Number(newSensor.motorSpeed); // 혹시 모르니 숫자로 변환

          if (motorSpeed >= 200) {
            if (!speedOverStartRef.current) {
              speedOverStartRef.current = Date.now();
            } else if (Date.now() - speedOverStartRef.current >= 4000) {
              setShowSpeedModal(true);
              speedOverStartRef.current = null;
            }
          } else {
            speedOverStartRef.current = null;
          }
          console.log("💨 motorSpeed:", motorSpeed);
          console.log("⏱️ speedOverStartRef.current:", speedOverStartRef.current);


          // 온도가 45도 이상이면 에어컨 ON 명령 전송
          if (newSensor.temperature >= 45 && !acTurnedOn) {
            // 서버로 에어컨 켜기 명령 전송
            sendMessage({
              type: "command",
              command: "airconOn",
            });
            setShowACModal(true);
            setAcTurnedOn(true); // 다시 안보내게 막기
          }


          setSensorData(prev => ({
            temperature: [{ temperature: newSensor.temperature, createdAt: newSensor.createdAt }, ...prev.temperature].slice(0, 60),
            humidity: [{ humidity: newSensor.humidity, createdAt: newSensor.createdAt }, ...prev.humidity].slice(0, 60),
            motorSpeed: [{ motorSpeed: newSensor.motorSpeed, createdAt: newSensor.createdAt }, ...prev.motorSpeed].slice(0, 60),
            illuminance: [{ illuminance: newSensor.illuminance, createdAt: newSensor.createdAt }, ...prev.illuminance].slice(0, 60),
            mileage: [{ mileage: newSensor.mileage, createdAt: newSensor.createdAt }, ...prev.mileage].slice(0, 60),
          }));

          setLatest(newSensor);
          
        }

        if (data.type === "carState") {
          setCarStatus(data.payload);
        }
      } catch (err) {
        console.error("WebSocket 메시지 처리 오류:", err);
      }
    };

    socket.addEventListener("message", handleMessage);
    return () => socket.removeEventListener("message", handleMessage);
  }, [socket]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastSensorTime > 3000) {
        setEspConnected(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastSensorTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMinuteData = {};
  
      TOP_SENSOR_KEYS.forEach((key) => {
        const latestValue = latest?.[key];
  
        newMinuteData[key] = [
          { [key]: typeof latestValue === "number" ? latestValue : 0, createdAt: new Date().toISOString() },
          ...sensorMinuteData[key],
        ].slice(0, 60);
      });
  
      setSensorMinuteData((prev) => ({
        ...prev,
        ...newMinuteData,
      }));
    }, 60000); // 1분마다
  
    return () => clearInterval(interval);
  }, [latest]);
  

  return (
    <>
      <FadeImage />
      {showVibModal && (
        <AlertModal
          title="⚠️ 진동 감지됨"
          message="진동이 감지되었습니다. 차량 상태를 확인해주세요."
          onClose={() => setShowVibModal(false)}
        />
      )}

      {showSpeedModal && (
        <AlertModal
          title="🚨 과속 경고"
          message="속도가 200km/h 이상으로 4초 이상 유지되었습니다. 주의하세요!"
          onClose={() => setShowSpeedModal(false)}
        />
      )}

      {showACModal && (
        <AlertModal
          title="❄️ 에어컨 자동 작동"
          message="온도가 45도 이상이 되어 에어컨을 자동으로 켰습니다."
          onClose={() => setShowACModal(false)}
        />
      )}

      <S.MonitorContainer>
        <S.DeviceSection>
          <CarStatus status={carStatus} />
        </S.DeviceSection>

        <S.SystemStatusSection>
          <S.StatusTop>
            <S.StatusLeft>
              {latest ? (
                <>
                  {latest.temperature} ℃ / {latest.humidity}%
                </>
              ) : (
                <>로딩중</>
              )}
            </S.StatusLeft>
            <S.StatusRight>
              <S.ToggleButton onClick={() => setShowTopCards((prev) => !prev)}>
                {showTopCards ? "▲" : "▼"}
              </S.ToggleButton>
            </S.StatusRight>
          </S.StatusTop>
          <S.TopCardArea data-visible={showTopCards}>
            {TOP_SENSOR_KEYS.map((key) => (
              <StatusCard
                key={key}
                name={key}
                latest={latest?.[key]}
                allData={sensorMinuteData[key]}
                chartType="minute"
              />
            ))}
          </S.TopCardArea>
          {/* 하단 카드 */}
            {BOTTOM_SENSOR_KEYS.map((key) => (
              <StatusCard
                key={key}
                name={key}
                latest={latest?.[key]}
                allData={sensorData[key]}
              />
            ))}
        </S.SystemStatusSection>
      </S.MonitorContainer>
    </>
  );
}

export default Main;
