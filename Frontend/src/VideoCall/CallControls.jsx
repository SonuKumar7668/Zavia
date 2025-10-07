import React from "react";
import {Mic, MicOff, Video,VideoOff, Smile,ScreenShare, MessageSquare, PhoneOff} from "lucide-react";

/**
 * CallControls - bottom control bar
 * - Icons are inline SVGs to avoid external icon dependencies.
 * - Replace handlers with real logic (toggle mic track, camera track, start screen share).
 */
export default function CallControls({ videoStatus,audioStatus, onToggleMute, onToggleCamera, onEndCall, onToggleChat }) {
  //const me = participants.find(p => p.id === "me") || {};

  return (
    <div className="mx-auto max-w-3xl bg-black/40 backdrop-blur rounded-full px-4 py-3 flex items-center justify-center gap-3 shadow-lg">
      {/* Microphone */}
      <button
        onClick={onToggleMute}
        aria-label="Toggle microphone"
        className="p-3 rounded-full bg-white/10 hover:bg-white/20"
        title={audioStatus ? <Mic/> : <MicOff/>}
      >
        {audioStatus ? (
          <Mic />
        ) : (
          <MicOff />
        )}
      </button>

      {/* Camera */}
      <button
        onClick={onToggleCamera}
        aria-label="Toggle camera"
        className="p-3 rounded-full bg-white/10 hover:bg-white/20"
        title="Toggle camera"
      >
        {videoStatus ? <Video /> : <VideoOff/>}
        
      </button>

      {/* Screen share (placeholder) */}
      <button
        onClick={() => alert("Screen share action — integrate your screen capture logic")}
        className="p-3 rounded-full bg-white/10 hover:bg-white/20"
        title="Share screen"
      >
        <ScreenShare />
      </button>

      {/* Reactions / emoji */}
      <button
        onClick={() => alert("Emoji picker - implement your own")}
        className="p-3 rounded-full bg-white/10 hover:bg-white/20"
        title="Reactions"
      >
        <Smile />
      </button>

     

      {/* Chat toggle */}
      <button onClick={onToggleChat} className="p-3 rounded-full bg-white/10 hover:bg-white/20" title="Toggle chat">
      <MessageSquare />
      </button>

      {/* End call */}
      <button
        onClick={onEndCall}
        className="ml-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-md"
        title="End call"
      >
        <PhoneOff />
      </button>
    </div>
  );
}
