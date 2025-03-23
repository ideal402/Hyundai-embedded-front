import React from "react";
import * as S from "./StatusCard.style";
import SensorChart from "./SensorChart";

const sensorRanges = {
  temperature: { min: 0, max: 50 },
  humidity: { min: 0, max: 100 },
  motorSpeed: { min: 0, max: 5000 },
  illuminance: { min: 0, max: 1000 },
};

const StatusCard = ({ name, latest, allData }) => {
  const range = sensorRanges[name] || { min: 0, max: 100 };
  
  return (
    <S.StatusCardContainer>
      <S.StatusTitle>{name}</S.StatusTitle>
      <S.StatusValue>
        {latest !== undefined ? `${latest}` : "로딩 중..."}
      </S.StatusValue>
      <S.StatusBar
        percentage={latest !== undefined ? latest % 100 : 0}
      />
      <S.ChartContainer>
        {allData.length > 0 && (
          <SensorChart
            data={allData}
            dataKey={name}
            yMin={range.min}
            yMax={range.max}
          />
        )}
      </S.ChartContainer>
    </S.StatusCardContainer>
  );
};


export default StatusCard;
