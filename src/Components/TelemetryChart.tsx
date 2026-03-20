import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { Telemetry } from "../interfaces/types";

interface Props {
  data: Telemetry[];
  dataKey: keyof Telemetry;
  label: string;
}

const TelemetryChart: React.FC<Props> = ({ data, dataKey, label }) => {
  return (
    <div className="bg-gray-800 p-4 rounded shadow mt-4">
      <h3 className="text-white font-bold mb-2">{label}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey as string} stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TelemetryChart;
