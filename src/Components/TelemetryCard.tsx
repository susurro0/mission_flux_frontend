import React from "react";

interface Props {
  label: string;
  value: number;
  unit?: string;
}

const TelemetryCard: React.FC<Props> = ({ label, value, unit }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded shadow">
      <h3 className="text-lg font-bold">{label}</h3>
      <p className="text-2xl">{value}{unit}</p>
    </div>
  );
};

export default TelemetryCard;
