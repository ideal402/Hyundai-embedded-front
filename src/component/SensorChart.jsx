import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SensorChart = ({ data, dataKey, label }) => {
  // ✅ 60개 미만이면 앞에 0으로 채우기
  const filledData = [...data];

  const fillCount = 60 - filledData.length;
  if (fillCount > 0) {
    const zeroFilled = Array.from({ length: fillCount }, (_, i) => ({
      [dataKey]: 0,
      createdAt: new Date(Date.now() - (fillCount - i) * 1000).toISOString(),
    }));
    filledData.unshift(...zeroFilled);
  }

  // ✅ 시:분:초 포맷
  const formatTime = (value) => {
    const date = new Date(value);
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    const s = date.getSeconds().toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div style={{ width: "100%", height: 250, marginTop: "20px" }}>
      <h4 style={{ color: "#fff", marginBottom: "8px" }}>{label}</h4>
      <ResponsiveContainer>
      <LineChart
        data={filledData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis
            dataKey="createdAt"
            tickFormatter={formatTime}
            stroke="#888"
            angle={0}
            textAnchor="middle"
            height={60}
            interval={10}
            tickMargin={10}
            tick={{ fontSize: 12 }}
        />
        <YAxis stroke="#888" tick={{ fontSize: 12 }}/>
        <Tooltip labelFormatter={formatTime} />
        <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#ff4d4d"
            strokeWidth={2}
            dot={false}
        />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SensorChart;
