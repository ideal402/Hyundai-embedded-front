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

const SensorChartMinute = ({ data, dataKey, label, yMin = 0, yMax = 100 }) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  // ✅ 최신 10개만 추출
  const latestData = sortedData.slice(-10);

  // ✅ 부족한 개수만큼 앞에서 0으로 채우기
  const fillCount = 10 - latestData.length;
  let filledData = [...latestData];

  if (fillCount > 0) {
    const now = Date.now();
    const oneMinute = 60 * 1000;
    const zeroFilled = Array.from({ length: fillCount }, (_, i) => ({
      [dataKey]: 0,
      createdAt: new Date(now - (fillCount - i) * oneMinute).toISOString(),
    }));
    filledData = [...zeroFilled, ...filledData];
  }

  const formatMinute = (value) => {
    const date = new Date(value);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
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
            tickFormatter={formatMinute}
            stroke="#888"
            tickMargin={10}
            tick={{ fontSize: 12 }}
          />
          <YAxis stroke="#888" tick={{ fontSize: 12 }} domain={[yMin, yMax]} />
          <Tooltip labelFormatter={formatMinute} />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#4db6ff"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SensorChartMinute;
