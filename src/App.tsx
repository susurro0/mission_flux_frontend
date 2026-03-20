import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Telemetry } from "./interfaces/types";
import TelemetryCard from "./Components/TelemetryCard";
import TelemetryChart from "./Components/TelemetryChart";
import ChatPanel from "./Components/ChatPanel";


const App: React.FC = () => {
  const [telemetry, setTelemetry] = useState<Telemetry[]>([]);

  useEffect(() => {
  let isMounted = true;

  (async () => {
    try {
      const res = await axios.get<Telemetry[]>("http://localhost:8001/telemetry/history");
      if (isMounted) setTelemetry(res.data);
    } catch (error) {
      console.error(error);
    }
  })();

  const interval = setInterval(async () => {
    try {
      const res = await axios.get<Telemetry[]>("http://localhost:8001/telemetry/history");
      if (isMounted) setTelemetry(res.data);
    } catch (error) {
      console.error(error);
    }
  }, 5000);

  return () => {
    isMounted = false;
    clearInterval(interval);
  };
}, []);


  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Mission Dashboard</h1>

      {telemetry.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <TelemetryCard label="Battery" value={telemetry[telemetry.length-1].battery} unit="%" />
          <TelemetryCard label="Temperature" value={telemetry[telemetry.length-1].temperature} unit="°C" />
          <TelemetryCard label="Signal Strength" value={telemetry[telemetry.length-1].signal_strength} unit="dBm" />
        </div>
      )}

      <TelemetryChart data={telemetry} dataKey="battery" label="Battery Over Time" />
      <ChatPanel />
    </div>
  );
};

export default App;
