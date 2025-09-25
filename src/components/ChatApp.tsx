import { useState } from "react";
import { ChatSidebar } from "./chat/ChatSidebar";
import { ChatArea } from "./chat/ChatArea";
import { LoginForm } from "./auth/LoginForm";
import { SignupForm } from "./auth/SignupForm";
import { useToast } from "@/hooks/use-toast";

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

// Mock data for demo purposes
const mockChats = [
  {
    id: "1",
    name: "Alice Johnson",
    lastMessage: "Hey! How are you doing today?",
    lastMessageTime: "2m ago",
    isOnline: true,
    unreadCount: 2,
  },
  {
    id: "2", 
    name: "Bob Smith",
    lastMessage: "Thanks for the help with the project!",
    lastMessageTime: "15m ago",
    isOnline: false,
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Team Alpha",
    lastMessage: "Meeting at 3 PM tomorrow",
    lastMessageTime: "1h ago", 
    isOnline: true,
    unreadCount: 5,
  },
  {
    id: "4",
    name: "Sarah Wilson",
    lastMessage: "Can you review this document?",
    lastMessageTime: "2h ago",
    isOnline: true,
    unreadCount: 1,
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hey! How's your day going?",
    senderId: "alice",
    senderName: "Alice Johnson",
    timestamp: "10:30 AM",
    isCurrentUser: false,
    type: "text" as const,
  },
  {
    id: "2",
    content: "Pretty good! Just working on some new features. How about you?",
    senderId: "me",
    senderName: "You",
    timestamp: "10:32 AM", 
    isCurrentUser: true,
    type: "text" as const,
  },
  {
    id: "3",
    content: "Same here! I'm excited about the new chat app we're building.",
    senderId: "alice",
    senderName: "Alice Johnson",
    timestamp: "10:33 AM",
    isCurrentUser: false,
    type: "text" as const,
  },
  {
    id: "4",
    content: "It's going to be amazing! The real-time features will be so cool 🚀",
    senderId: "me", 
    senderName: "You",
    timestamp: "10:35 AM",
    isCurrentUser: true,
    type: "text" as const,
  },
];

export const ChatApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedChatId, setSelectedChatId] = useState<string | null>("1");
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    // Simulate login - in real app this would connect to Supabase
    setTimeout(() => {
      setIsAuthenticated(true);
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
    }, 1000);
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    // Simulate signup - in real app this would connect to Supabase
    setTimeout(() => {
      setIsAuthenticated(true);
      toast({
        title: "Account created!",
        description: "Welcome to the chat app.",
      });
    }, 1000);
  };

  const handleSendMessage = (content: string, type: 'text' | 'image', file?: File) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      senderId: "me",
      senderName: "You", 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
      type,
      imageUrl: file ? URL.createObjectURL(file) : undefined,
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate typing indicator and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responseMessage = {
        id: (Date.now() + 1).toString(),
        content: "That's awesome! I love this new chat interface.",
        senderId: "alice",
        senderName: "Alice Johnson",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: false,
        type: "text" as const,
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 2000);
  };

  const handleNewChat = () => {
    toast({
      title: "Coming soon!",
      description: "New chat creation will be available after connecting Supabase.",
    });
  };

  if (!isAuthenticated) {
    return (
      <>
        {authMode === 'login' ? (
          <LoginForm
            onLogin={handleLogin}
            onToggleMode={() => setAuthMode('signup')}
          />
        ) : (
          <SignupForm
            onSignup={handleSignup}
            onToggleMode={() => setAuthMode('login')}
          />
        )}
      </>
    );
  }

  const selectedChat = selectedChatId ? mockChats.find(chat => chat.id === selectedChatId) : null;

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <ChatSidebar
        chats={mockChats}
        selectedChatId={selectedChatId}
        onChatSelect={setSelectedChatId}
        onNewChat={handleNewChat}
      />
      <ChatArea
        chat={selectedChat}
        messages={messages}
        onSendMessage={handleSendMessage}
        isTyping={isTyping}
      />
    </div>
  );
};