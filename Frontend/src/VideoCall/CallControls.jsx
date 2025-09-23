import React from "react";

/**
 * CallControls - bottom control bar
 * - Icons are inline SVGs to avoid external icon dependencies.
 * - Replace handlers with real logic (toggle mic track, camera track, start screen share).
 */
export default function CallControls({ participants, onToggleMute, onToggleCamera, onEndCall, onToggleChat }) {
  const me = participants.find(p => p.id === "me") || {};

  return (
    <div className="mx-auto max-w-3xl bg-black/40 backdrop-blur rounded-full px-4 py-3 flex items-center justify-center gap-3 shadow-lg">
      {/* Microphone */}
      <button
        onClick={onToggleMute}
        aria-label="Toggle microphone"
        className="p-3 rounded-full bg-white/10 hover:bg-white/20"
        title={me.muted ? "Unmute" : "Mute"}
      >
        {me.muted ? (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 11v2a3 3 0 0 0 6 0v-2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="1" y1="1" x2="23" y2="23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 1v12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Camera */}
      <button
        onClick={onToggleCamera}
        aria-label="Toggle camera"
        className="p-3 rounded-full bg-white/10 hover:bg-white/20"
        title="Toggle camera"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 10a3 3 0 0 0 6 0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Screen share (placeholder) */}
      <button
        onClick={() => alert("Screen share action — integrate your screen capture logic")}
        className="p-3 rounded-full bg-white/10 hover:bg-white/20"
        title="Share screen"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 16V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="7" y="17" width="10" height="4" rx="1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Reactions / emoji */}
      <button
        onClick={() => alert("Emoji picker - implement your own")}
        className="p-3 rounded-full bg-white/10 hover:bg-white/20"
        title="Reactions"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

     

      {/* Chat toggle */}
      <button onClick={onToggleChat} className="p-3 rounded-full bg-white/10 hover:bg-white/20" title="Toggle chat">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* End call */}
      <button
        onClick={onEndCall}
        className="ml-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-md"
        title="End call"
      >
        End
      </button>
    </div>
  );
}
