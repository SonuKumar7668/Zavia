import { useState, useEffect } from "react";

export const CallHeader = ({ 
  callDuration = 0, 
  participantCount = 2,
  meetingTitle = "Video Call"
}) => {
  const [duration, setDuration] = useState(callDuration);

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed top-6 left-6 z-50 animate-fade-in">
      <div className="bg-control-surface backdrop-blur-lg rounded-xl p-4 shadow-control border border-border/50">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">{meetingTitle}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                {formatDuration(duration)}
              </span>
              <span>{participantCount} participants</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};