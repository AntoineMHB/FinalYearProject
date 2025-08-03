import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";

type Message = {
  from: "bot" | "user";
  text: string;
};

type ChatbotModalProps = {
  onClose: () => void;
};

const ChatbotModal: React.FC<ChatbotModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi! I can help you with budgeting. Ask me anything!" },
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/chatbot/ask",
        userMessage,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setMessages((prev) => [...prev, { from: "bot", text: response.data }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error getting advice. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-50">
      <div className="bg-white w-full max-w-md h-full p-4 shadow-lg flex flex-col">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-bold">Budget Advisor</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="mt-4 overflow-y-auto flex-1 space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg max-w-[90%] ${
                msg.from === "user" ? "bg-blue-100 self-end ml-auto" : "bg-gray-100"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <p className="text-sm text-gray-400">Typing...</p>}
        </div>

        <div className="mt-2 flex">
          <input
            type="text"
            placeholder="Ask about budgeting..."
            className="flex-1 p-2 border rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-[#5a57ff] text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;
