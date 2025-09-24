import React, { useState, useEffect } from "react";
import VideoTile from "./VideoTile";
import CallControls from "./CallControls";
import ChatSidebar from "./ChatSidebar";

/**
 * VideoCall - main layout component
 * - Integrate your WebRTC / video provider by replacing the mock participants and handlers.
 */
export default function VideoCall() {
  const [participants, setParticipants] = useState([
    // Example participant objects; replace with live stream refs or objects from your RTC layer
    { id: "me", name: "Yash Nema", initials: "Y", cameraOn: false, muted: true, stream: null },
    { id: "mentor", name: "Ava Mentor", initials: "A", cameraOn: true, muted: false, stream: null }
  ]);

  const [chatOpen, setChatOpen] = useState(true);
  const [callActive, setCallActive] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    let t;
    if (callActive) {
      t = setInterval(() => setTimerSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(t);
  }, [callActive]);

  function formatTimer(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  // Example toggles — connect these to your signaling / WebRTC logic
  const toggleMute = (id) => {
    setParticipants(prev => prev.map(p => p.id === id ? { ...p, muted: !p.muted } : p));
  };

  const toggleCamera = (id) => {
    setParticipants(prev => prev.map(p => p.id === id ? { ...p, cameraOn: !p.cameraOn } : p));
  };

  const leaveCall = () => {
    // Hook in any cleanup: close tracks, signal leave, navigate away, etc.
    setCallActive(false);
    // For demo: clear participants
    setParticipants([]);
  };

  // Layout: left = video area, right = chat (toggle-able)
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Video area */}
      <div className={`flex-1 p-4 flex flex-col ${chatOpen ? "lg:pr-0" : ""}`}>
        <div className="relative flex-1 rounded-2xl overflow-hidden bg-gradient-to-br from-red-900 to-red-700 shadow-inner">
          {/* Top-right small status / mute icon might go here */}
          <div className="absolute top-4 left-6 text-sm text-white/90 flex items-center gap-3 z-10">
            <span className="font-medium">{participants.find(p => p.id === "mentor")?.name || "Mentor"}</span>
            <span className="text-xs opacity-80">|</span>
            <span className="text-xs opacity-80">{formatTimer(timerSeconds)}</span>
          </div>

          {/* Grid of participant tiles (single large tile for primary) */}
          <div className="h-full w-full flex items-center justify-center p-6">
            {/* Show a large primary tile and smaller secondary tiles can be layered or in a corner */}
            {participants.length === 0 ? (
              <div className="text-center">
                <h3 className="text-xl font-semibold">Call ended</h3>
                <p className="text-sm text-white/80 mt-2">You left the meeting.</p>
              </div>
            ) : (
              <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {participants.map(p => (
                  <VideoTile key={p.id} participant={p} />
                ))}
              </div>
            )}
          </div>

          {/* Bottom controls overlay */}
          <div className="absolute left-0 right-0 bottom-0 px-6 pb-6">
            <CallControls
              participants={participants}
              onToggleMute={() => toggleMute("me")}
              onToggleCamera={() => toggleCamera("me")}
              onEndCall={() => {
                if (confirm("End call for everyone?")) leaveCall();
              }}
              onToggleChat={() => setChatOpen(open => !open)}
            />
          </div>
        </div>
      </div>

      {/* Chat sidebar (desktop) */}
      <div className={`hidden lg:block w-96 p-4`}>
        <ChatSidebar onClose={() => setChatOpen(false)} />
      </div>

      {/* Chat drawer for mobile (optional) */}
      {chatOpen && (
        <div className="fixed bottom-16 right-4 block lg:hidden z-30">
          <button
            onClick={() => setChatOpen(false)}
            className="bg-white/10 text-white px-3 py-2 rounded-md backdrop-blur"
          >
            Close chat
          </button>
        </div>
      )}
    </div>
  );
}
