'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Send, Image, Mic, MicOff, ChevronLeft, MoreVertical } from 'lucide-react';
import { useAudio } from '@/hooks/useAudio';

interface Message {
  id: string;
  type: 'text' | 'image' | 'voice';
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  duration?: number; // for voice messages
}

function ChatPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get('id');

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationTitle, setConversationTitle] = useState('新对话');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use audio hook
  const {
    isRecording,
    recordingDuration,
    playingVoiceId,
    startRecording,
    stopRecording,
    playVoiceMessage,
    stopVoiceMessage
  } = useAudio();

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  // Initialize conversation based on ID
  useEffect(() => {
    if (conversationId) {
      // Mock conversation titles based on ID
      const titles: { [key: string]: string } = {
        '1': '罗马旅行助手',
        '2': '美食推荐',
        '3': '景点咨询',
        '4': '交通指南',
        '5': '住宿推荐'
      };
      setConversationTitle(titles[conversationId] || '新对话');
      
      // Load mock messages for existing conversations
      if (conversationId !== 'new') {
        setMessages([
          {
            id: '1',
            type: 'text',
            content: '您好！我是您的旅行助手，有什么可以帮助您的吗？',
            sender: 'ai',
            timestamp: new Date(Date.now() - 1000 * 60 * 5)
          }
        ]);
      }
    }
  }, [conversationId]);

  // Mock AI responses
  const getAIResponse = (userMessage: string): string => {
    const responses = [
      '感谢您的消息！我正在为您查找相关信息...',
      '这是一个很好的问题，让我为您详细解答。',
      '根据您的需求，我推荐以下方案...',
      '我理解您的想法，这确实是个不错的选择。',
      '让我为您提供一些实用的建议...'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Send text message
  const sendTextMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'text',
      content: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'text',
        content: getAIResponse(inputText.trim()),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // Send image message
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageMessage: Message = {
        id: Date.now().toString(),
        type: 'image',
        content: e.target?.result as string,
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, imageMessage]);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'text',
          content: '收到您的图片了！这张照片很漂亮，有什么特别想了解的吗？',
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    };
    reader.readAsDataURL(file);
  };

  // Handle voice recording
  const handleStartRecording = async () => {
    await startRecording();
  };

  const handleStopRecording = () => {
    const voiceMessage = stopRecording();
    if (voiceMessage) {
      setMessages(prev => [...prev, voiceMessage]);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'text',
          content: '我听到了您的语音消息，让我为您提供帮助！',
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };


  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Format date
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <div className="min-h-screen bg-[#F9F7F5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#E8E8E8]">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F9F7F5]"
            >
              <ChevronLeft className="w-5 h-5 text-[#333333]" />
            </button>
            <h1 className="text-lg font-semibold text-[#333333]">{conversationTitle}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F9F7F5]">
              <MoreVertical className="w-4 h-4 text-[#333333]" />
            </button>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto" style={{ height: 'calc(100vh - 140px)' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.sender === 'user'
                      ? 'bg-[#4A90E2] text-white'
                      : 'bg-white border border-[#E8E8E8] text-[#333333]'
                  }`}
                >
                  {message.type === 'text' && (
                    <p className="text-sm">{message.content}</p>
                  )}
                  {message.type === 'image' && (
                    <div className="space-y-2">
                      <img
                        src={message.content}
                        alt="Sent image"
                        className="w-full max-w-48 rounded-lg"
                      />
                    </div>
                  )}
                  {message.type === 'voice' && (
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => {
                          if (playingVoiceId === message.id) {
                            stopVoiceMessage();
                          } else {
                            playVoiceMessage(message.id, message.content);
                          }
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          message.sender === 'user' 
                            ? playingVoiceId === message.id 
                              ? 'bg-white/30' 
                              : 'bg-white/20 hover:bg-white/30'
                            : playingVoiceId === message.id 
                              ? 'bg-[#4A90E2]/20' 
                              : 'bg-[#4A90E2]/10 hover:bg-[#4A90E2]/20'
                        }`}
                      >
                        {playingVoiceId === message.id ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        )}
                      </button>
                      <div className="flex items-center space-x-1">
                        <div className={`w-16 h-1 rounded-full ${
                          message.sender === 'user' ? 'bg-white/30' : 'bg-[#4A90E2]/30'
                        }`}>
                          <div 
                            className={`h-1 rounded-full transition-all duration-300 ${
                              message.sender === 'user' ? 'bg-white' : 'bg-[#4A90E2]'
                            }`}
                            style={{ 
                              width: playingVoiceId === message.id ? '100%' : '50%' 
                            }}
                          ></div>
                        </div>
                        <span className={`text-xs ${
                          message.sender === 'user' ? 'text-white/70' : 'text-[#9B9B9B]'
                        }`}>
                          {message.duration}s
                        </span>
                      </div>
                    </div>
                  )}
                  <div className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-[#9B9B9B]'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#E8E8E8] rounded-2xl p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#9B9B9B] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#9B9B9B] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-[#9B9B9B] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-[#E8E8E8] p-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F9F7F5] text-[#333333]"
          >
            <Image className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendTextMessage()}
              placeholder="输入消息..."
              className="w-full px-4 py-3 bg-[#F9F7F5] rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-[#4A90E2] text-[#333333]"
            />
          </div>

          {isRecording ? (
            <div className="flex items-center space-x-2">
              <div className="text-xs text-[#333333] font-medium">
                {Math.round(recordingDuration)}s
              </div>
              <button
                onClick={handleStopRecording}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500 text-white animate-pulse"
              >
                <MicOff className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleStartRecording}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F9F7F5] text-[#333333] hover:bg-[#E8E8E8] transition-colors"
            >
              <Mic className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={sendTextMessage}
            disabled={!inputText.trim()}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#4A90E2] text-white disabled:bg-[#E8E8E8] disabled:text-[#9B9B9B]"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F9F7F5] flex items-center justify-center text-[#9B9B9B]">加载中...</div>}>
      <ChatPageInner />
    </Suspense>
  );
}
