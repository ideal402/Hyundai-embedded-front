import React from "react";
import * as S from "./StatusCard.style";
import SensorChart from "./SensorChart";

const sensorRanges = {
  temperature: { min: -20, max: 50 },
  humidity: { min: 0, max: 100 },
  motorSpeed: { min: 0, max: 200 },
  illuminance: { min: 0, max: 1000 },
};
const keyName = {"temperature":"온도", "humidity":"습도", "illuminance":"조도", "motorSpeed":"모터 속도"}
const keyUnit = {"temperature":"℃", "humidity":"%", "illuminance":"lx", "motorSpeed":"km/h"}

const StatusCard = ({ name, latest, allData }) => {
  const range = sensorRanges[name] || { min: 0, max: 100 };
  
  return (
    <S.StatusCardContainer>
      <S.StatusArea>
        <S.StatusTitle>{keyName[name]}</S.StatusTitle>
        <S.StatusValue>
          {latest !== undefined ? `${latest} ${keyUnit[name]}` : "로딩 중..."}
        </S.StatusValue>
      </S.StatusArea>
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
