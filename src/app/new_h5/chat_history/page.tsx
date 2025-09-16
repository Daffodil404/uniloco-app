'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, MoreVertical, Search } from 'lucide-react';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  avatar?: string;
}

export default function ChatHistoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock conversations data
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: '罗马旅行助手',
      lastMessage: '您好！我是您的罗马旅行助手，有什么可以帮助您的吗？',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      unreadCount: 0,
      avatar: '🤖'
    },
    {
      id: '2',
      title: '美食推荐',
      lastMessage: '推荐您去Trattoria da Mario品尝正宗意面',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      unreadCount: 2,
      avatar: '🍝'
    },
    {
      id: '3',
      title: '景点咨询',
      lastMessage: '斗兽场的最佳参观时间是早上9点',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      unreadCount: 0,
      avatar: '🏛️'
    },
    {
      id: '4',
      title: '交通指南',
      lastMessage: '从机场到市区的交通方式有地铁、巴士和出租车',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      unreadCount: 1,
      avatar: '🚇'
    },
    {
      id: '5',
      title: '住宿推荐',
      lastMessage: '推荐住在特雷维喷泉附近的酒店',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      unreadCount: 0,
      avatar: '🏨'
    }
  ]);

  // Start new conversation
  const startNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: '新对话',
      lastMessage: '开始新的对话',
      timestamp: new Date(),
      unreadCount: 0,
      avatar: '💬'
    };
    setConversations(prev => [newConversation, ...prev]);
    // Navigate to chat page with new conversation
    router.push(`/new_h5/chat?id=${newConversation.id}`);
  };

  // Open conversation
  const openConversation = (conversationId: string) => {
    router.push(`/new_h5/chat?id=${conversationId}`);
  };

  // Format time
  const formatTime = (date: Date) => {
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

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F9F7F5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#E8E8E8]">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold text-[#333333]">聊天记录</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={startNewConversation}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#4A90E2] text-white"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F9F7F5]">
              <MoreVertical className="w-4 h-4 text-[#333333]" />
            </button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9B9B9B]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="搜索聊天记录..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-[#E8E8E8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4A90E2] text-[#333333]"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="px-4 pb-4 space-y-3">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-[#9B9B9B] text-sm">没有找到相关聊天记录</div>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => openConversation(conversation.id)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E8E8] active:scale-95 transition-all"
            >
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#4A90E2] to-[#66D2A0] flex items-center justify-center text-white text-lg flex-shrink-0">
                  {conversation.avatar}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-[#333333] truncate">{conversation.title}</h3>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span className="text-xs text-[#9B9B9B]">{formatTime(conversation.timestamp)}</span>
                      {conversation.unreadCount > 0 && (
                        <span className="w-5 h-5 bg-[#4A90E2] text-white text-xs rounded-full flex items-center justify-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#9B9B9B] line-clamp-2">{conversation.lastMessage}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Empty State */}
      {conversations.length === 0 && (
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#E8E8E8] rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-[#9B9B9B]" />
            </div>
            <h3 className="text-lg font-semibold text-[#333333] mb-2">开始新的对话</h3>
            <p className="text-[#9B9B9B] text-sm mb-4">与AI助手开始您的第一次对话</p>
            <button
              onClick={startNewConversation}
              className="bg-[#4A90E2] text-white px-6 py-3 rounded-2xl font-medium active:scale-95 transition-all"
            >
              开始聊天
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
