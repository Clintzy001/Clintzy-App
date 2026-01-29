import React from 'react';

const StatusViewer = ({ imageUrl, username }) => {
  return (
    <div className="h-screen w-screen bg-black relative flex flex-col">
      {/* Progress Bar */}
      <div className="absolute top-4 left-0 right-0 flex px-2 gap-1 z-20">
        <div className="h-1 flex-1 bg-orange-500 rounded-full" />
        <div className="h-1 flex-1 bg-zinc-700 rounded-full" />
      </div>

      {/* Header */}
      <div className="absolute top-8 left-4 flex items-center z-20">
        <div className="w-10 h-10 rounded-full border-2 border-orange-500 mr-3" />
        <span className="text-white font-bold">{username}</span>
      </div>

      {/* Main Image */}
      <img src={imageUrl} className="flex-1 object-contain" alt="Status" />

      {/* Reply Bar */}
      <div className="p-6 bg-gradient-to-t from-black to-transparent">
        <input 
          type="text" 
          placeholder="Reply to status..." 
          className="w-full bg-zinc-900/80 border border-zinc-700 p-3 rounded-full text-white px-6 outline-none"
        />
      </div>
    </div>
  );
};

export default StatusViewer;
