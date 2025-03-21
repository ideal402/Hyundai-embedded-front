import React, { useState, useEffect } from "react";
import api from "../api";
import * as S from "./StatusCard.style";
import SensorChart from "./SensorChart";

const StatusCard = ({ name, onDataLoaded }) => {
  const [allData, setAllData] = useState([]);
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/sensor");
        console.log("🚀 ~ fetchData ~ response:", response.data.data);

        const dataArray = response.data.data;

        if (Array.isArray(dataArray) && dataArray.length > 0) {
          setAllData(dataArray);
          setLatest(dataArray[0]);
          if (onDataLoaded) onDataLoaded(dataArray);
        }
      } catch (error) {
        console.error("API 요청 실패:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <S.StatusCardContainer>
      <S.StatusTitle>{name || "로딩 중..."}</S.StatusTitle>
      <S.StatusValue>
        {latest && latest[name] !== undefined ? `${latest[name]}` : "로딩 중..."}
      </S.StatusValue>
      <S.StatusBar
        percentage={latest && latest[name] !== undefined ? latest[name] % 100 : 0}
      />

      {/* ✅ 그래프 컴포넌트에 데이터 전달 */}
      {allData.length > 0 && (
        <SensorChart
          data={allData}
          dataKey={name}
        />
      )}
    </S.StatusCardContainer>
  );
};

export default StatusCard;
