export interface Telemetry {
  timestamp: string;
  battery: number;
  temperature: number;
  signal_strength: number;
}

export interface ChatMessage {
  sender: "user" | "assistant";
  text: string;
}
