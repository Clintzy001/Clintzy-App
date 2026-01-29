import React from 'react';

const ChatItem = ({ name, message, time, unreadCount, isOnline, avatarUrl }) => {
  return (
    <div className="flex flex-row items-center p-4 bg-black active:bg-zinc-900 transition-colors border-b border-zinc-800/50">
      <div className="relative">
        <img 
          src={avatarUrl || 'https://via.placeholder.com/150'} 
          className={`w-14 h-14 rounded-full border-2 ${isOnline ? 'border-orange-500' : 'border-zinc-700'}`} 
          alt={name}
        />
        {isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-orange-500 rounded-full border-2 border-black" />}
      </div>

      <div className="flex-1 ml-4 text-left">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-bold text-lg">{name}</h3>
          <span className="text-zinc-500 text-xs italic">{time}</span>
        </div>
        <p className="text-zinc-400 text-sm truncate">{message}</p>
      </div>

      {unreadCount > 0 && (
        <div className="ml-2 bg-orange-600 h-5 min-w-[20px] rounded-full flex items-center justify-center px-1 shadow-[0_0_10px_rgba(245,124,0,0.5)]">
          <span className="text-white text-[10px] font-black">{unreadCount}</span>
        </div>
      )}
    </div>
  );
};

export default ChatItem;
