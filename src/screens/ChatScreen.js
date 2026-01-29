import React from 'react';
import { COLORS } from '../constants/Colors';

const ChatScreen = () => {
  const messages = [
    { id: 1, text: "Hey! Did you check out the new Clintzy UI?", sender: 'other', time: '10:00 AM' },
    { id: 2, text: "Yeah, the orange glow is insane! 🔥", sender: 'me', time: '10:02 AM' },
  ];

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <div className="p-4 flex items-center border-b border-zinc-900 bg-black/80 backdrop-blur-md sticky top-0">
        <span className="text-orange-500 mr-4 text-xl">←</span>
        <div className="w-10 h-10 rounded-full bg-zinc-800 mr-3" />
        <div className="flex-1">
          <h4 className="text-white font-bold">Jessica</h4>
          <p className="text-orange-500 text-[10px] animate-pulse">online</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] p-3 rounded-2xl ${
              msg.sender === 'me' 
                ? 'bg-gradient-to-br from-orange-500 to-orange-700 text-white rounded-tr-none shadow-[0_4px_15px_rgba(245,124,0,0.3)]' 
                : 'bg-zinc-900 text-zinc-200 rounded-tl-none border border-zinc-800'
            }`}>
              <p className="text-sm">{msg.text}</p>
              <p className={`text-[9px] mt-1 ${msg.sender === 'me' ? 'text-orange-200' : 'text-zinc-500'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Input Bar */}
      <div className="p-4 bg-black border-t border-zinc-900">
        <div className="flex items-center bg-zinc-900 rounded-full px-4 py-2 border border-zinc-800 focus-within:border-orange-500 transition-all">
          <button className="text-zinc-400 text-xl">+</button>
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="flex-1 bg-transparent border-none text-white px-3 focus:outline-none text-sm"
          />
          <button className="text-orange-500 font-bold ml-2">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
