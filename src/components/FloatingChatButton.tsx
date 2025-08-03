// FloatingChatButton.tsx (or .jsx if you convert to .tsx)
import { MessageCircle } from "lucide-react";
import React from "react";

type FloatingChatButtonProps = {
  onClick: () => void; // explicitly typed as a function with no arguments and no return value
};

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-[#5a57ff] hover:bg-[#4a47ef] text-white rounded-full p-4 shadow-lg z-50"
      aria-label="Open Chatbot"
    >
      <MessageCircle size={24} />
    </button>
  );
};

export default FloatingChatButton;
