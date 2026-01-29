import React from 'react';

const MediaGallery = ({ photos }) => {
  return (
    <div className="p-2 grid grid-cols-3 gap-1 bg-black">
      {photos.map((url, index) => (
        <div key={index} className="aspect-square relative group">
          <img 
            src={url} 
            className="w-full h-full object-cover rounded-sm hover:opacity-80 transition-opacity" 
            alt="Media" 
          />
          <div className="absolute inset-0 border border-orange-500/0 group-hover:border-orange-500/50 transition-all" />
        </div>
      ))}
    </div>
  );
};

export default MediaGallery;
