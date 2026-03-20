import React, { useState } from "react";
import axios from "axios";
import type { ChatMessage } from "../interfaces/types";

const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");

  const sendMessage = async () => {
    if (!input) return;

    const userMsg: ChatMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await axios.post("http://localhost:8000/chat", { user_input: input });
      const assistantMsg: ChatMessage = { sender: "assistant", text: res.data.message };
      setMessages(prev => [...prev, userMsg, assistantMsg]);
    } catch (error) {
      console.error(error);
    }

    setInput("");
  };

  return (
    <div className="bg-gray-900 p-4 rounded shadow mt-4">
      <div className="h-40 overflow-y-auto mb-2">
        {messages.map((m, i) => (
          <div key={i} className={m.sender === "user" ? "text-right" : "text-left text-green-400"}>
            {m.text}
          </div>
        ))}
      </div>
      <input
        className="w-full p-2 rounded"
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && sendMessage()}
        placeholder="Type your command..."
      />
    </div>
  );
};

export default ChatPanel;
