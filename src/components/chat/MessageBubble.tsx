import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: string;
  isCurrentUser: boolean;
  type: 'text' | 'image';
  imageUrl?: string;
}

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const { content, timestamp, isCurrentUser, type, imageUrl, senderName } = message;

  return (
    <div className={`flex items-end space-x-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {!isCurrentUser && (
        <Avatar className="w-8 h-8 mb-1">
          <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
            {senderName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        {!isCurrentUser && (
          <span className="text-xs text-muted-foreground mb-1 px-1">{senderName}</span>
        )}
        
        <div
          className={`message-bubble ${
            isCurrentUser ? 'message-sent' : 'message-received'
          } ${type === 'image' ? 'p-1' : ''}`}
        >
          {type === 'image' && imageUrl ? (
            <div className="rounded-lg overflow-hidden">
              <img
                src={imageUrl}
                alt="Shared image"
                className="max-w-64 max-h-64 object-cover"
              />
              {content && (
                <div className="p-3 pt-2">
                  <p className="text-sm">{content}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm">{content}</p>
          )}
        </div>
        
        <span className="text-xs text-muted-foreground mt-1 px-1">
          {timestamp}
        </span>
      </div>
      
      {isCurrentUser && (
        <Avatar className="w-8 h-8 mb-1">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
            You
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};