import React, { useState, useEffect } from 'react';

const SecretChat = ({ message, expiryTime = 10 }) => {
  const [timeLeft, setTimeLeft] = useState(expiryTime);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  if (timeLeft === 0) return null; // Message "Self-Destructs"

  return (
    <div className="flex justify-end my-2 px-4">
      <div className="bg-gradient-to-br from-zinc-800 to-black border border-orange-900/50 p-3 rounded-2xl rounded-tr-none max-w-[80%] relative">
        <p className="text-zinc-200 text-sm">{message}</p>
        
        {/* Countdown Timer Badge */}
        <div className="flex items-center mt-2 space-x-1">
          <span className="text-[10px] text-orange-500 font-bold italic">
             Destructing in {timeLeft}s
          </span>
          <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default SecretChat;
