import React from "react";
import { useMemo } from "react";

/**
 * VideoTile
 * - If participant.stream is available, attach it to a <video> element (integration point).
 * - Otherwise show circular avatar with initials.
 */
function VideoTile({ participant,videoStatus=true,audioStatus=true, stream }) {
  const { name="mentor", initials, cameraOn="true", muted="false" } = participant;
  const videoRef = React.useRef();
  React.useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    console.log("stream", stream);
  }, [stream]);

  return (
    <div className="relative rounded-xl overflow-hidden bg-black/30 flex items-center justify-center">
      {videoStatus ? (
        // Replace srcObject mapping when integrating real streams
        <div className="w-full h-full">
          <video
            // when integrating, set ref and videoRef.current.srcObject = participant.stream
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted={audioStatus}
            ref={videoRef}
            // poster fallback or src can be added for static preview
          />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-orange-700 flex items-center justify-center text-3xl font-semibold shadow-lg">
            {initials}
          </div>
          <div className="mt-3 text-sm md:text-base text-white/90">{name}</div>
        </div>
      )}

      {/* Small mute indicator */}
      <div className="absolute bottom-3 left-3 text-xs bg-black/50 px-2 py-1 rounded-md flex items-center gap-2">
        {muted ? (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 9v6h4l5 5V4l-5 5H9z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 9v6h4l5 5V4l-5 5H9z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        <span className="opacity-90 text-xs">{muted ? "Muted" : "Live"}</span>
      </div>
    </div>
  );
}
export default VideoTile;