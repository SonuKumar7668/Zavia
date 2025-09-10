import { useState } from "react";
// import { Button } from "@/components/ui/button";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  Settings,
  MessageSquare,
  Users,
  Share
} from "lucide-react";
// import { cn } from "@/lib/utils";

export const ControlBar = ({ onEndCall, className }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const handleEndCall = () => {
    onEndCall?.();
  };

  return (
    <div className={(
      "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50",
      "bg-control-surface backdrop-blur-lg rounded-2xl p-4 shadow-control",
      "border border-border/50 animate-slide-up",
      className
    )}>
      <div className="flex items-center gap-3">
        {/* Mute/Unmute */}
        <button
          variant="secondary"
          size="lg"
          onClick={() => setIsMuted(!isMuted)}
          className={`w-14 h-14 rounded-full transition-smooth
            ${isMuted && 'bg-danger hover:bg-danger/80'}`
          }
        >
          {isMuted ? (
            <MicOff className="h-6 w-6 text-white" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </button>

        {/* Video On/Off */}
        <button
          variant="secondary"
          size="lg"
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={
            `w-14 h-14 rounded-full transition-smooth
            ${isVideoOff && "bg-danger hover:bg-danger/80"}`
          }
        >
          {isVideoOff ? (
            <VideoOff className="h-6 w-6 text-white" />
          ) : (
            <Video className="h-6 w-6" />
          )}
        </button>

        {/* Share Screen */}
        <button
          variant="secondary"
          size="lg"
          className="w-14 h-14 rounded-full transition-smooth hover:bg-control-hover"
        >
          <Share className="h-6 w-6" />
        </button>

        {/* Chat */}
        <button
          variant="secondary"
          size="lg"
          className="w-14 h-14 rounded-full transition-smooth hover:bg-control-hover"
        >
          <MessageSquare className="h-6 w-6" />
        </button>

        {/* Participants */}
        <button
          variant="secondary"
          size="lg"
          className="w-14 h-14 rounded-full transition-smooth hover:bg-control-hover"
        >
          <Users className="h-6 w-6" />
        </button>

        {/* Settings */}
        <button
          variant="secondary"
          size="lg"
          className="w-14 h-14 rounded-full transition-smooth hover:bg-control-hover"
        >
          <Settings className="h-6 w-6" />
        </button>

        {/* End Call */}
        <button
          variant="destructive"
          size="lg"
          onClick={handleEndCall}
          className="w-14 h-14 rounded-full bg-danger hover:bg-danger/80 transition-smooth ml-2"
        >
          <Phone className="h-6 w-6 text-white rotate-[135deg]" />
        </button>
      </div>
    </div>
  );
};