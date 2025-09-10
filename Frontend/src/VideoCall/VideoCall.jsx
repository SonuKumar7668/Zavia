import React, { useState } from 'react';
import {Mic, MicOff,Video,VideoOff,Phone} from "lucide-react";

// The main App component that contains the entire video call UI.
export default function VideoCall() {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  // Helper component to render a single participant's video feed.
  const ParticipantView = ({ name, isMuted, isCameraOff, isLocal, isLarge }) => (
    <div className={`relative rounded-2xl overflow-hidden bg-gray-800 border-2 border-transparent transition-all duration-300 ${isLarge ? 'w-full h-full' : 'w-48 h-32 md:w-64 md:h-40'}`}>
      {/* Placeholder for video stream */}
      <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold">
        {isCameraOff ? "Camera Off" : "Video Feed"}
      </div>

      {/* Mute, camera, and name overlay */}
      <div className="absolute bottom-4 left-4 flex items-center bg-black bg-opacity-50 text-white rounded-full px-4 py-2 text-sm">
        {isMuted && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="1" y1="1" x2="23" y2="23" />
            <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.94" />
            <path d="M17 16.95A7 7 0 0 1 5 12V8" />
            <path d="M12 21v-4" />
          </svg>
        )}
        {isCameraOff && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 1l22 22M15 10v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M16 16v-2.1l6.1 3.5a1 1 0 0 0 1.4-1V6.6a1 1 0 0 0-.8-1l-5.7 3.2" />
          </svg>
        )}
        {name} {isLocal && '(You)'}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 flex flex-col items-center justify-center">
      <div className="relative max-w-7xl mx-auto w-full h-[80vh] flex items-center justify-center">
        
        {/* Large video feed for the other person */}
        <ParticipantView name="Yash" isMuted={false} isCameraOff={false} isLocal={false} isLarge={true} />
        
        {/* Small video feed for the user in the bottom-right */}
        <div className="absolute bottom-6 right-6 z-10">
          <ParticipantView name="Sonu" isMuted={isMuted} isCameraOff={isCameraOff} isLocal={true} isLarge={false} />
        </div>

        {/* Control Bar */}
        <div className="absolute bottom-6 flex justify-center items-center space-x-4 bg-gray-800 p-4 md:p-6 rounded-full shadow-lg z-20">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 md:p-4 rounded-full transition-colors duration-200 ${isMuted ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            {isMuted ? (
                <MicOff />
            ) : (
                <Mic />
            )}
          </button>

          <button
            onClick={() => setIsCameraOff(!isCameraOff)}
            className={`p-3 md:p-4 rounded-full transition-colors duration-200 ${isCameraOff ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            {isCameraOff ? (
                <VideoOff/>
            ) : (
                <Video/>
            )}
          </button>

          <button className="bg-red-600 hover:bg-red-500 p-3 md:p-4 rounded-full transition-colors duration-200">
          <Phone />
          </button>
        </div>

      </div>
    </div>
  );
}
