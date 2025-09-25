import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, Video, MoreVertical } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { TypingIndicator } from "./TypingIndicator";

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

interface ChatAreaProps {
  chat: {
    id: string;
    name: string;
    avatar?: string;
    isOnline: boolean;
  } | null;
  messages: Message[];
  onSendMessage: (content: string, type: 'text' | 'image', file?: File) => void;
  isTyping: boolean;
}

export const ChatArea = ({ chat, messages, onSendMessage, isTyping }: ChatAreaProps) => {
  if (!chat) {
    return (
      <div className="flex-1 bg-chat-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg
              className="w-12 h-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Welcome to Chat</h3>
          <p className="text-muted-foreground">Select a conversation or start a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-chat-background flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-card border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarImage src={chat.avatar} alt={chat.name} />
              <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                {chat.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {chat.isOnline && (
              <div className="online-indicator absolute -bottom-1 -right-1" />
            )}
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{chat.name}</h2>
            <p className="text-xs text-muted-foreground">
              {chat.isOnline ? 'Active now' : 'Last seen recently'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};