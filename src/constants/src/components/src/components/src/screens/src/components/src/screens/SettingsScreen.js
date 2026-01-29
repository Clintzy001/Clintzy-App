import React from 'react';
import { COLORS } from '../constants/Colors';

const SettingsScreen = () => {
  const settingsOptions = [
    { id: 1, title: 'Account', icon: '👤', sub: 'Privacy, security, change number' },
    { id: 2, title: 'Chats', icon: '💬', sub: 'Theme, wallpapers, chat history' },
    { id: 3, title: 'Clintzy Glow', icon: '✨', sub: 'Customize neon accents & animations', highlight: true },
    { id: 4, title: 'Notifications', icon: '🔔', sub: 'Message, group & call tones' },
    { id: 5, title: 'Storage and Data', icon: '📊', sub: 'Network usage, auto-download' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center mt-8 mb-10">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-2 border-orange-500 p-1 shadow-[0_0_15px_#F57C00]">
            <img 
              src="https://via.placeholder.com/150" 
              className="w-full h-full rounded-full object-cover" 
              alt="Profile" 
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full border-2 border-black">
            <span className="text-xs">📷</span>
          </div>
        </div>
        <h2 className="mt-4 text-2xl font-black italic">Clintzy User</h2>
        <p className="text-zinc-500 text-sm">Available | Enjoying the Glow 🍊</p>
      </div>

      {/* Settings List */}
      <div className="space-y-4">
        {settingsOptions.map((item) => (
          <div 
            key={item.id} 
            className={`flex items-center p-4 rounded-2xl transition-all active:scale-95 ${
              item.highlight ? 'bg-orange-950/20 border border-orange-500/30' : 'bg-zinc-900/50 border border-zinc-800'
            }`}
          >
            <div className="text-2xl mr-4">{item.icon}</div>
            <div className="flex-1">
              <h4 className={`font-bold ${item.highlight ? 'text-orange-500' : 'text-white'}`}>
                {item.title}
              </h4>
              <p className="text-zinc-500 text-xs">{item.sub}</p>
            </div>
            <span className="text-zinc-600">❯</span>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <button className="w-full mt-10 p-4 rounded-2xl border border-red-900/50 text-red-500 font-bold bg-red-950/10">
        Log Out
      </button>
    </div>
  );
};

export default SettingsScreen;
