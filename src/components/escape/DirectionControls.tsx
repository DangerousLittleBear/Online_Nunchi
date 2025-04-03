'use client';

import React from 'react';
import Image from 'next/image';

interface DirectionControlsProps {
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
}

export default function DirectionControls({ onMove }: DirectionControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => onMove('left')}
        className="w-16 h-16 bg-transparent rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
      >
        <Image
          src="/images/left_key_image.png"
          alt="왼쪽으로 이동"
          width={64}
          height={64}
          priority
        />
      </button>
      
      <button
        onClick={() => onMove('up')}
        className="w-16 h-16 bg-transparent rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
      >
        <Image
          src="/images/up_key_image.png"
          alt="위로 이동"
          width={64}
          height={64}
          priority
        />
      </button>
      
      <button
        onClick={() => onMove('down')}
        className="w-16 h-16 bg-transparent rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
      >
        <Image
          src="/images/down_key_image.png"
          alt="아래로 이동"
          width={64}
          height={64}
          priority
        />
      </button>
      
      <button
        onClick={() => onMove('right')}
        className="w-16 h-16 bg-transparent rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
      >
        <Image
          src="/images/right_key_image.png"
          alt="오른쪽으로 이동"
          width={64}
          height={64}
          priority
        />
      </button>
    </div>
  );
} 