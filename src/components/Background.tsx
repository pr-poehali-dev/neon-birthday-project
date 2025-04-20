
import React from 'react';

// Расширенный набор эмодзи с большим количеством сердец и единорогами
const emojis = [
  '❤️', '💖', '💕', '💗', '💓', '💘', '💝', '💞', '💟', 
  '💌', '💓', '💔', '💖', '💗', '💙', '💚', '💛', '💜', 
  '🦄', '🦄', '🦄', '🦄', '🦄', // Много единорогов
  '🎂', '🎊', '🎉', '✨', '🎁', '🥳', '🍰'
];

const Background: React.FC = () => {
  // Увеличиваем количество эмодзи на фоне
  const decorations = Array.from({ length: 40 }, (_, index) => {
    // Даем больше шансов появиться сердечкам и единорогам
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const left = `${Math.random() * 100}%`;
    const top = `${Math.random() * 100}%`;
    
    // Делаем единорогов крупнее
    const isUnicorn = emoji === '🦄';
    const baseSize = isUnicorn ? 2 : 1;
    const size = `${baseSize + Math.random() * 1.5}rem`;
    
    const animationDelay = `${Math.random() * 8}s`;
    
    return (
      <div 
        key={index}
        className={`floating-emoji ${isUnicorn ? 'unicorn-animation' : ''}`}
        style={{ 
          left, 
          top, 
          fontSize: size, 
          animationDelay,
          animationDuration: `${5 + Math.random() * 7}s`,
          zIndex: isUnicorn ? 1 : 0
        }}
      >
        {emoji}
      </div>
    );
  });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {decorations}
      
      {/* Добавляем дополнительный слой только с сердечками */}
      {Array.from({ length: 30 }, (_, index) => {
        const heartEmojis = ['❤️', '💖', '💕', '💗', '💓', '💘', '💝', '💞', '💟'];
        const emoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        return (
          <div 
            key={`heart-${index}`}
            className="floating-emoji heart-pulse"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`, 
              fontSize: `${0.8 + Math.random() * 1}rem`, 
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
              opacity: 0.7 + Math.random() * 0.3
            }}
          >
            {emoji}
          </div>
        );
      })}
    </div>
  );
};

export default Background;
