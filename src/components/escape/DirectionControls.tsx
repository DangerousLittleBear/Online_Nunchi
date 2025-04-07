'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface DirectionControlsProps {
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
}

export default function DirectionControls({ onMove }: DirectionControlsProps) {
  const [isCooldown, setIsCooldown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCooldown) {
      setIsAnimating(true);
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsCooldown(false);
            return 3;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCooldown]);

  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    // 테스트를 위해 쿨다운 비활성화
    // if (isCooldown) return;
    // setIsCooldown(true);
    onMove(direction);
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => handleMove('left')}
        disabled={isCooldown}
        className={`w-16 h-16 bg-transparent rounded-lg flex items-center justify-center hover:opacity-80 transition-all active:scale-95 active:translate-y-1 relative ${
          isCooldown ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        <Image
          src="/images/left_key_image.png"
          alt="왼쪽으로 이동"
          width={64}
          height={64}
          priority
        />
        {isCooldown && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg transition-all duration-1000" />
            <span 
              className={`text-white text-xl font-bold relative z-10 transform transition-transform duration-300 ${
                isAnimating ? 'translate-x-0' : 'translate-x-full'
              }`}
              onAnimationEnd={() => setIsAnimating(false)}
            >
              {countdown}
            </span>
          </div>
        )}
      </button>
      
      <button
        onClick={() => handleMove('up')}
        disabled={isCooldown}
        className={`w-16 h-16 bg-transparent rounded-lg flex items-center justify-center hover:opacity-80 transition-all active:scale-95 active:translate-y-1 relative ${
          isCooldown ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        <Image
          src="/images/up_key_image.png"
          alt="위로 이동"
          width={64}
          height={64}
          priority
        />
        {isCooldown && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg transition-all duration-1000" />
            <span 
              className={`text-white text-xl font-bold relative z-10 transform transition-transform duration-300 ${
                isAnimating ? 'translate-x-0' : 'translate-x-full'
              }`}
              onAnimationEnd={() => setIsAnimating(false)}
            >
              {countdown}
            </span>
          </div>
        )}
      </button>
      
      <button
        onClick={() => handleMove('down')}
        disabled={isCooldown}
        className={`w-16 h-16 bg-transparent rounded-lg flex items-center justify-center hover:opacity-80 transition-all active:scale-95 active:translate-y-1 relative ${
          isCooldown ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        <Image
          src="/images/down_key_image.png"
          alt="아래로 이동"
          width={64}
          height={64}
          priority
        />
        {isCooldown && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg transition-all duration-1000" />
            <span 
              className={`text-white text-xl font-bold relative z-10 transform transition-transform duration-300 ${
                isAnimating ? 'translate-x-0' : 'translate-x-full'
              }`}
              onAnimationEnd={() => setIsAnimating(false)}
            >
              {countdown}
            </span>
          </div>
        )}
      </button>
      
      <button
        onClick={() => handleMove('right')}
        disabled={isCooldown}
        className={`w-16 h-16 bg-transparent rounded-lg flex items-center justify-center hover:opacity-80 transition-all active:scale-95 active:translate-y-1 relative ${
          isCooldown ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        <Image
          src="/images/right_key_image.png"
          alt="오른쪽으로 이동"
          width={64}
          height={64}
          priority
        />
        {isCooldown && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg transition-all duration-1000" />
            <span 
              className={`text-white text-xl font-bold relative z-10 transform transition-transform duration-300 ${
                isAnimating ? 'translate-x-0' : 'translate-x-full'
              }`}
              onAnimationEnd={() => setIsAnimating(false)}
            >
              {countdown}
            </span>
          </div>
        )}
      </button>
    </div>
  );
} 