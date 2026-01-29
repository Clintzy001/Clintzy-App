import React from 'react';

const VoiceNote = ({ duration }) => {
  return (
    <div className="flex items-center space-x-3 bg-zinc-900 p-3 rounded-2xl border border-zinc-800 w-64">
      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
        <span className="text-white text-xs">▶</span>
      </div>
      <div className="flex-1 flex items-end space-x-0.5 h-6">
        {/* Mock Waveform Bars */}
        {[40, 70, 45, 90, 65, 80, 30].map((h, i) => (
          <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-orange-500/40 rounded-full" />
        ))}
      </div>
      <span className="text-zinc-500 text-[10px]">{duration}</span>
    </div>
  );
};

export default VoiceNote;
