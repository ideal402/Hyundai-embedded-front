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

const SensorChart = ({ data, dataKey, label, yMin = 0, yMax = 100 }) => {
  // 🔄 1. 시간순 정렬 (오래된 → 최신)
  const sortedData = [...data].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  // ⏱️ 2. 최근 60초 내 데이터만 추리기
  const now = Date.now();
  const oneMinuteAgo = now - 60 * 1000;
  const lastMinuteData = sortedData.filter(d => new Date(d.createdAt).getTime() >= oneMinuteAgo);

  // 3. 부족한 길이는 앞에서 0 채우기 (총 60개 유지)
  const fillCount = 60 - lastMinuteData.length;
  let filledData = [...lastMinuteData];

  if (fillCount > 0) {
    const zeroFilled = Array.from({ length: fillCount }, (_, i) => ({
      [dataKey]: 0,
      createdAt: new Date(oneMinuteAgo + i * 1000).toISOString(), // 시간도 적절히 증가
    }));
    filledData = [...zeroFilled, ...filledData];
  }

  // 🕒 시간 포맷
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
            interval={10}
            tickMargin={10}
            tick={{ fontSize: 12 }}
          />
          <YAxis stroke="#888" tick={{ fontSize: 12 }} domain={[yMin, yMax]}/>
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
