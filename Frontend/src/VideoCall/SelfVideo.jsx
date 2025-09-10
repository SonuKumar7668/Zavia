// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export const SelfVideo = ({ 
  isVideoEnabled = true, 
  userName = "You",
  userAvatar
}) => {
  return (
    <div className="absolute bottom-6 right-6 w-48 h-36 rounded-xl overflow-hidden bg-video-surface border border-border shadow-lg animate-fade-in">
      {isVideoEnabled ? (
        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <div className="text-white text-sm">Your Video</div>
        </div>
      ) : (
        <div className="w-full h-full bg-video-surface flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-12 h-12">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">Camera off</span>
          </div>
        </div>
      )}
      
      {/* User label */}
      <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm rounded px-2 py-0.5">
        <span className="text-white text-xs">{userName}</span>
      </div>
    </div>
  );
};