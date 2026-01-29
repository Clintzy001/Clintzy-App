// Clintzy Chat List Item Component
const ChatItem = ({ name, message, time, unreadCount, isOnline }) => {
  return (
    <div className="flex flex-row items-center p-4 bg-black active:bg-zinc-900 transition-colors border-b border-zinc-800/50">
      {/* Avatar with Status Ring */}
      <div className="relative">
        <img 
          src={avatarUrl} 
          className={`w-14 h-14 rounded-full border-2 ${isOnline ? 'border-orange-500' : 'border-zinc-700'}`} 
        />
        {isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-orange-500 rounded-full border-2 border-black" />}
      </div>

      {/* Message Info */}
      <div className="flex-1 ml-4">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-bold text-lg">{name}</h3>
          <span className="text-zinc-500 text-xs">{time}</span>
        </div>
        <p className="text-zinc-400 text-sm truncate">{message}</p>
      </div>

      {/* Unread Badge */}
      {unreadCount > 0 && (
        <div className="ml-2 bg-orange-600 h-5 min-w-[20px] rounded-full flex items-center justify-center px-1 shadow-[0_0_10px_rgba(245,124,0,0.5)]">
          <span className="text-white text-[10px] font-black">{unreadCount}</span>
        </div>
      )}
    </div>
  );
};
