import React from 'react';
import ChatItem from '../components/ChatItem.js';

const HomeScreen = () => {
  const chats = [
    { id: 1, name: 'Boss Clintzy', message: 'The UI looks better than WhatsApp!', time: '12:45 AM', unread: 2, online: true },
    { id: 2, name: 'Jessica', message: 'Did you see the orange glow?', time: 'Yesterday', unread: 0, online: false }
  ];

  return (
    <div className="flex flex-col bg-black h-screen">
      <div className="p-4 border-b border-zinc-900 flex justify-between items-center sticky top-0 bg-black/90">
        <h1 className="text-2xl font-black italic text-orange-500">Clintzy</h1>
        <div className="text-xl">🔍</div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map(chat => (
          <ChatItem key={chat.id} {...chat} />
        ))}
      </div>
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-orange-500 rounded-full text-white text-3xl shadow-lg shadow-orange-500/40">+</button>
    </div>
  );
};

export default HomeScreen;
