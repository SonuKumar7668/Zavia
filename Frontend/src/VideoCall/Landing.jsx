import { useState } from "react";
import { VideoArea } from "./VideoArea";
import { SelfVideo } from "./SelfVideo";
import { ControlBar } from "./ControlBar";
import { CallHeader } from "./CallHeader";
// import { useToast } from "@/hooks/use-toast";

const Landing = () => {
  const [isCallActive, setIsCallActive] = useState(true);
//   const { toast } = useToast();

  const handleEndCall = () => {
    setIsCallActive(false);
    // toast({
    //   title: "Call Ended",
    //   description: "The video call has been ended successfully.",
    // });
  };

  if (!isCallActive) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center animate-fade-in">
          <h1 className="mb-4 text-4xl font-bold text-foreground">Call Ended</h1>
          <p className="text-xl text-muted-foreground mb-8">Thank you for using our video calling platform!</p>
          <button 
            onClick={() => setIsCallActive(true)}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth"
          >
            Start New Call
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-video-background overflow-hidden relative">
      {/* Call Header */}
      <CallHeader 
        meetingTitle="Team Standup Meeting"
        participantCount={3}
      />

      {/* Main Video Area */}
      <div className="h-screen flex items-center justify-center p-6">
        <VideoArea 
          isVideoEnabled={true}
          participantName="Sarah Johnson"
          className="max-w-6xl w-full animate-fade-in"
        />
      </div>

      {/* Self Video (Picture-in-Picture) */}
      <SelfVideo 
        isVideoEnabled={true}
        userName="You"
      />

      {/* Control Bar */}
      <ControlBar onEndCall={handleEndCall} />
    </div>
  );
};

export default Landing;