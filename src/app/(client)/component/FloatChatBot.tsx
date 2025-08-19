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
      {/* Float Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={toggleChat}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full !p-4 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            aria-label="Mở chat bot"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
          isMinimized ? 'h-16 w-80' : 'h-96 w-80'
        }`}>
          
          {/* Header */}
          <div className="bg-blue-500 text-white !p-4 rounded-t-2xl flex items-center justify-between">
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
                className="hover:bg-blue-600 !p-1 rounded transition-colors"
                aria-label="Thu nhỏ"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={toggleChat}
                className="hover:bg-blue-600 !p-1 rounded transition-colors"
                aria-label="Đóng chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Content - Hidden when minimized */}
          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="h-64 overflow-y-auto !p-3 !space-y-3 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div className="flex items-start !space-x-2 max-w-[85%]">
                      {message.sender === 'bot' && (
                        <div className="bg-blue-500 !p-1.5 rounded-full flex-shrink-0">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                      )}
                      
                      <div
                        className={`!px-3 !py-2 rounded-xl text-sm ${
                          message.sender === 'user'
                            ? 'bg-blue-500 text-white rounded-br-sm'
                            : 'bg-white text-gray-800 shadow-sm rounded-bl-sm'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      
                      {message.sender === 'user' && (
                        <div className="bg-blue-500 !p-1.5 rounded-full flex-shrink-0">
                          <User className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start !space-x-2">
                      <div className="bg-blue-500 !p-1.5 rounded-full">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-white !px-3 !py-2 rounded-xl shadow-sm">
                        <div className="flex !space-x-1">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="!p-3 border-t border-gray-200 bg-white rounded-b-2xl">
                <div className="flex items-center !space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 !p-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white !p-2 rounded-full transition-colors flex-shrink-0"
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
    </>
  );
};

export default FloatChatBot;