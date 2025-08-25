// FloatChatBot.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageCircle, X, Minimize2 } from 'lucide-react';
import { API_BASE_URL } from '@/config/env';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatResponse {
  success: boolean;
  message: string;
  timestamp: string;
  error?: string;
  details?: string;
}

const FloatChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Xin chào! Tôi có thể giúp gì cho bạn?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (): Promise<void> => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const conversationHistory = messages
        .slice(-5)
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));

      const response = await fetch(`${API_BASE_URL}/chatAI/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          conversationHistory: conversationHistory
        }),
      });

      const data: ChatResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      const botResponse: Message = {
        id: Date.now() + 1,
        text: data.message,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);

    } catch (error: any) {
      console.error('Chat Error:', error);
      
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = (): void => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = (): void => {
    setIsMinimized(true);
  };

  const formatTime = (timestamp: Date): string => {
    return new Date(timestamp).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
   <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={toggleChat}
            className="relative flex items-center justify-center rounded-full !p-4 shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-105 group"
            aria-label="Mở chat bot"
          >
            <span className="absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-75 animate-ping"></span>
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 opacity-60 animate-ping"
              style={{ animationDelay: "0.5s" }}
            ></span>
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 opacity-50 animate-ping"
              style={{ animationDelay: "1s" }}
            ></span>

            <span
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 bg-[length:300%_300%] animate-pulse shadow-2xl group-hover:shadow-purple-500/50"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #6366f1, #06b6d4)",
                backgroundSize: "300% 300%",
                animation: "gradientMove 3s ease infinite, pulse 2s infinite",
              }}
            ></span>

            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-60 blur-md group-hover:opacity-80 transition-opacity duration-300"></span>

            <span
              className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-full animate-bounce opacity-70"
              style={{ animationDelay: "0s", animationDuration: "2s" }}
            ></span>
            <span
              className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-bounce opacity-80"
              style={{ animationDelay: "0.7s", animationDuration: "2.5s" }}
            ></span>
            <span
              className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-pink-300 rounded-full animate-bounce opacity-70"
              style={{ animationDelay: "1.4s", animationDuration: "3s" }}
            ></span>
            <span
              className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-300 rounded-full animate-bounce opacity-60"
              style={{ animationDelay: "2.1s", animationDuration: "2.2s" }}
            ></span>

            <Bot className="w-6 h-6 relative z-10 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />

            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse z-20 border-2 border-white">
!
            </span>
          </button>
        </div>
      )}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
            isMinimized ? "h-16 w-80" : "h-96 w-80"
          }`}
        >
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white !p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center !space-x-2">
              <Bot className="w-5 h-5" />
              <span className="font-medium">Chat Tera Shoes</span>
              {isLoading && (
                <div className="w-2 h-2 bg-blue-200 rounded-full animate-ping"></div>
              )}
            </div>
            <div className="flex items-center !space-x-2">
              <button
                onClick={minimizeChat}
                className="hover:bg-white/20 !p-1 rounded transition-colors"
                aria-label="Thu nhỏ"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={toggleChat}
                className="hover:bg-white/20 !p-1 rounded transition-colors"
                aria-label="Đóng chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          {!isMinimized && (
            <>
              <div className="h-64 overflow-y-auto !p-3 !space-y-3 bg-gradient-to-br from-gray-50 to-blue-50/30">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div className="flex items-start !space-x-2 max-w-[85%]">
                      {message.sender === "bot" && (
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 !p-1.5 rounded-full flex-shrink-0 shadow-lg">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                      )}

                      <div
                        className={`!px-3 !py-2 rounded-xl text-sm shadow-lg ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-sm"
                            : "bg-white text-gray-800 shadow-lg rounded-bl-sm border border-gray-100"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "user"
                              ? "text-blue-100"
                              : "text-gray-500"
}`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>

                      {message.sender === "user" && (
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 !p-1.5 rounded-full flex-shrink-0 shadow-lg">
                          <User className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start !space-x-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 !p-1.5 rounded-full shadow-lg">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-white !px-3 !py-2 rounded-xl shadow-lg border border-gray-100">
                        <div className="flex !space-x-1">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-1.5 h-1.5 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="!p-3 border-t border-gray-200 bg-gradient-to-r from-white to-blue-50/30 rounded-b-2xl">
                <div className="flex items-center !space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 !p-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-300 text-white !p-2 rounded-full transition-all duration-300 flex-shrink-0 shadow-lg hover:shadow-xl hover:scale-105"
aria-label="Gửi tin nhắn"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      <style jsx>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
};

export default FloatChatBot;