import React, { useState } from "react";

/**
 * ChatSidebar - simple chat UI
 * - Provide sendMessage handler integration for your backend or socket layer.
 * - Supports pinning a message (local state; connect to server for persistent pinned notes).
 */
export default function ChatSidebar({ onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, author: "System", text: "Let contributors send messages (toggleable)." },
    { id: 2, author: "System", text: "You can pin a message to make it visible for people who join later." }
  ]);
  const [text, setText] = useState("");
  const [pinned, setPinned] = useState(null);

  const sendMessage = () => {
    if (!text.trim()) return;
    const msg = { id: Date.now(), author: "You", text: text.trim() };
    setMessages(prev => [...prev, msg]);
    setText("");
    // Integrate: emit message to server / peers
  };

  return (
    <div className="h-full bg-white rounded-2xl p-4 text-black shadow-xl flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">In-call messages</h3>
        <button onClick={onClose} aria-label="Close chat" className="p-2 rounded-md hover:bg-black/5">
          ✕
        </button>
      </div>

      {pinned && (
        <div className="bg-blue-50 p-3 rounded-md mb-3 text-sm">
          <strong>Pinned:</strong> {pinned.text}
        </div>
      )}

      <div className="flex-1 overflow-auto space-y-3 mb-4">
        {messages.map(m => (
          <div key={m.id} className="text-sm">
            <div className="text-xs text-black/60">{m.author}</div>
            <div className="bg-gray-100 p-2 rounded-md inline-block mt-1">{m.text}</div>
            <div>
              <button
                onClick={() => setPinned(m)}
                className="text-xs text-blue-600 mt-1 hover:underline"
                aria-label={`Pin message ${m.id}`}
              >
                Pin
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Send a message"
          className="flex-1 px-3 py-2 rounded-full border border-gray-200 text-sm"
          onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded-full"
          aria-label="Send message"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
