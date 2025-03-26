import React from "react";
import * as S from "./StatusCard.style";
import SensorChartSecond  from "./SensorChartSecond";
import SensorChartMinute from "./SensorChartMinute";

const sensorRanges = {
  temperature: { min: -20, max: 50 },
  humidity: { min: 0, max: 100 },
  illuminance: { min: 0, max: 1000 },
  motorSpeed: { min: 0, max: 200 },
  mileage: { min: 0, max: 300 },
};

const keyName = {
  temperature: "온도",
  humidity: "습도",
  illuminance: "조도",
  motorSpeed: "모터 속도",
  mileage: "주행거리",
};

const keyUnit = {
  temperature: "℃",
  humidity: "%",
  illuminance: "lx",
  motorSpeed: "km/h",
  mileage: "km",
};

const StatusCard = ({ name, latest, allData, chartType = "second"}) => {
  const range = sensorRanges[name] || { min: 0, max: 100 };

  const { min, max } = range;
  const percentage =
    latest !== undefined
      ? Math.max(0, Math.min(100, ((latest - min) / (max - min)) * 100))
      : 0;

  const ChartComponent =
    chartType === "minute" ? SensorChartMinute : SensorChartSecond;

  return (
    <S.StatusCardContainer>
      <S.StatusArea>
        <S.StatusTitle>{keyName[name]}</S.StatusTitle>
        <S.StatusValue>
          {latest !== undefined ? `${latest} ${keyUnit[name]}` : "로딩 중..."}
        </S.StatusValue>
      </S.StatusArea>
      <S.StatusBar percentage={percentage} />
      <S.ChartContainer>
        {allData.length > 0 && (
          <ChartComponent
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
