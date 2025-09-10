// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export const VideoArea = ({ 
  isVideoEnabled = true, 
  participantName = "John Doe",
  participantAvatar,
  className = ""
}) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-video-surface shadow-video ${className}`}>
      {isVideoEnabled ? (
        <div className="aspect-video w-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
          <div className="text-muted-foreground text-lg">Video Feed Placeholder</div>
        </div>
      ) : (
        <div className="aspect-video w-full bg-video-surface flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={participantAvatar} alt={participantName} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {participantName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-xl font-medium text-foreground">{participantName}</h3>
              <p className="text-muted-foreground">Camera is off</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Participant name overlay */}
      {isVideoEnabled && (
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
          <span className="text-white text-sm font-medium">{participantName}</span>
        </div>
      )}
    </div>
  );
};