import React, { useEffect, useState, useContext } from "react";
import * as S from "./main.style";
import StatusCard from "../component/StatusCard";
import CarStatus from "../component/CarStatus";
import FadeImage from "../component/FadeImage";
import ConnectionModal from "../component/ConnectedModal";
import api from "../api";
import { WebSocketContext } from "../context/WebSocketContext";

const SENSOR_KEYS = ["temperature", "humidity", "illuminance", "motorSpeed"];

function Main() {
  const { socket } = useContext(WebSocketContext);
  const [lastSensorTime, setLastSensorTime] = useState(Date.now());
  const [espConnected, setEspConnected] = useState(true);
  const [carStatus, setCarStatus] = useState(null);
  const [latest, setLatest] = useState(null);
  const [sensorData, setSensorData] = useState({
    temperature: [],
    humidity: [],
    motorSpeed: [],
    illuminance: [],
  });

  //초기 데이터 로딩
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const sensorRes = await api.get("/sensor");
        const carRes = await api.get("/carState");

        const sensorArray = sensorRes.data.data || [];

        setSensorData({
          temperature: sensorArray,
          humidity: sensorArray,
          motorSpeed: sensorArray,
          illuminance: sensorArray,
        });
        setLatest(sensorArray[0]);
        setCarStatus(carRes.data.data);
      } catch (error) {
        console.error("초기 데이터 로딩 실패:", error);
      }
    };
    fetchInitialData();
  }, []);

  // WebSocket 수신 핸들러
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

          setSensorData((prev) => ({
            temperature: [newSensor, ...prev.temperature].slice(0, 60),
            humidity: [newSensor, ...prev.humidity].slice(0, 60),
            motorSpeed: [newSensor, ...prev.motorSpeed].slice(0, 60),
            illuminance: [newSensor, ...prev.illuminance].slice(0, 60),
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

  // ⏱ ESP 연결 상태 추적 (3초간 데이터 없으면 false)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastSensorTime > 3000) {
        setEspConnected(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastSensorTime]);

  return (
    <>
    <FadeImage/>
      {!espConnected && <ConnectionModal visible={true} />}
      <S.MonitorContainer>
        <S.DeviceSection>
          <CarStatus status={carStatus} />
        </S.DeviceSection>
        <S.SystemStatusSection>
          {SENSOR_KEYS.map((key) => (
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
