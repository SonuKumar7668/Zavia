import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import { Send,Ellipsis } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Enables GitHub-style markdown (tables, lists, etc.)


export default function Chatbot() {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "👋 Hi! I'm zavia. Ask me anything about career guidance." },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_API;
            const res = await axios.post(`${backendUrl}/chat`, { message: input });
            const botReply = res.data.reply || "Sorry, I couldn’t understand that.";
            setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "⚠️ Something went wrong. Please try again later." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar */}
          <aside className="hidden md:flex flex-col w-64 bg-[var(--color-primary)] text-white p-4">
            <Link to="/"><h2 className="text-lg font-semibold mb-6">ZAVIA</h2></Link>
            <button
              onClick={() =>
                setMessages([{ sender: "bot", text: "New chat started. How can I help you?" }])
              }
              className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/90 rounded-md p-3 mb-3 text-left text-gray-900 font-medium transition-all"
            >
              + New Chat
            </button>
            <div className="flex-1 overflow-y-auto text-white/90 text-sm space-y-2">
              <p>Career Tips</p>
              <p>Skill Guidance</p>
              <p>Mentor Matching</p>
            </div>
            <p className="mt-auto text-xs text-white/70">v1.0 — ZAVIA</p>
          </aside>
      
          {/* Chat Area */}
          <main className="flex-1 flex flex-col bg-white">
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-lg text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[var(--color-primary)] text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-600 px-4 py-3 rounded-lg text-sm">
                    <span className="animate-pulse"><Ellipsis /></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
      
            {/* Input bar */}
            <div className="bg-gray-100 p-4 border-t border-gray-300">
              <div className="flex items-center max-w-3xl mx-auto bg-white rounded-lg px-3 py-2 border border-gray-300 shadow-sm">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Send a message..."
                  className="flex-1 bg-transparent text-gray-800 outline-none placeholder-gray-400 px-2"
                />
                <button
                  onClick={handleSend}
                  disabled={loading}
                  className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] p-1"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-center text-gray-500 text-xs mt-2">
                Zavia chatbot may suggest careers based on your interests.
              </p>
            </div>
          </main>
        </div>
      );
      
}
