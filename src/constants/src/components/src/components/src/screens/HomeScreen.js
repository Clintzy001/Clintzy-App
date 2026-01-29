import React from 'react';
import ChatItem from '../components/ChatItem';
import StatusRow from '../components/StatusRow';
import { COLORS } from '../constants/Colors';

const HomeScreen = () => {
  // Mock data for display
  const chats = [
    { id: 1, name: 'Jessica', message: 'See you at the park! 🍊', time: '11:35 AM', unreadCount: 2, isOnline: true },
    { id: 2, name: 'Clintzy Team', message: 'Welcome to the future of chat.', time: 'Yesterday', unreadCount: 0, isOnline: false }
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header Area with Logo */}
      <div className="p-4 flex justify-between items-center border-b border-zinc-900 sticky top-0 bg-black/80 backdrop-blur-md z-10">
        <h1 className="text-2xl font-black italic text-orange-500">Clintzy</h1>
        <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">🔍</span>
        </div>
      </div>

      <StatusRow users={chats} />

      <div className="flex-1">
        {chats.map(chat => (
          <ChatItem key={chat.id} {...chat} />
        ))}
      </div>
      
      {/* FAB Button */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-orange-500 rounded-full shadow-[0_0_20px_#F57C00] text-white text-3xl">
        +
      </button>
    </div>
  );
};

export default HomeScreen;
