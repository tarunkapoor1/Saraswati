import React from 'react';

const Logo = () => {
  return (
    <div className="relative w-24 h-24 mx-auto mb-4">
      {/* Lotus petals using gradients */}
      <div className="absolute inset-0 animate-pulse">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16">
          {[0, 60, 120, 180, 240, 300].map((rotation, i) => (
            <div
              key={i}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-12 origin-bottom"
              style={{
                transform: `translateX(-50%) rotate(${rotation}deg)`,
              }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-t from-[#b8b8f3] via-[#d7b8f3] to-[#f397d6] opacity-80" />
            </div>
          ))}
        </div>
      </div>
      {/* Center circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#f42272] to-[#232e21] opacity-90" />
    </div>
  );
};

export default Logo;