
import React from 'react';

const emojis = ['❤️', '💖', '💕', '💗', '💓', '💘', '💝', '💞', '💟', '🎂', '🎊', '🎉', '✨', '🎁', '🥳', '🍰'];

const Background: React.FC = () => {
  // Создаем массив из 20 эмодзи со случайными позициями
  const decorations = Array.from({ length: 20 }, (_, index) => {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const left = `${Math.random() * 100}%`;
    const top = `${Math.random() * 100}%`;
    const size = `${Math.random() * 1 + 1}rem`;
    const animationDelay = `${Math.random() * 5}s`;
    
    return (
      <div 
        key={index}
        className="floating-emoji" 
        style={{ 
          left, 
          top, 
          fontSize: size, 
          animationDelay,
          animationDuration: `${5 + Math.random() * 5}s`
        }}
      >
        {emoji}
      </div>
    );
  });

  return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">{decorations}</div>;
};

export default Background;
