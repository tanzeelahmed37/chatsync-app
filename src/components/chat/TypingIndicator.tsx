import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const TypingIndicator = () => {
  return (
    <div className="flex items-end space-x-2">
      <Avatar className="w-8 h-8 mb-1">
        <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
          T
        </AvatarFallback>
      </Avatar>
      
      <div className="bg-message-received text-message-received-foreground rounded-lg px-4 py-2 max-w-xs">
        <div className="typing-indicator">
          <div className="typing-dot" style={{"--delay": "0ms"} as React.CSSProperties}></div>
          <div className="typing-dot" style={{"--delay": "150ms"} as React.CSSProperties}></div>
          <div className="typing-dot" style={{"--delay": "300ms"} as React.CSSProperties}></div>
        </div>
      </div>
    </div>
  );
};