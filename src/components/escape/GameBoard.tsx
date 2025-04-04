'use client';

import React from 'react';
import Image from 'next/image';

interface GameBoardProps {
  characterPosition: { x: number; y: number };
  size: number;
}

export default function GameBoard({ characterPosition, size }: GameBoardProps) {
  const grid = Array(size).fill(null).map(() => Array(size).fill(null));

  return (
    <div className="p-4">
      <div className={`grid grid-cols-${size} gap-2 w-fit`}>
        {grid.map((row, y) =>
          row.map((_, x) => (
            <div
              key={`${x}-${y}`}
              className="w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center relative"
            >
              {characterPosition.x === x && characterPosition.y === y && (
                <Image
                  src="/images/character.png"
                  alt="Character"
                  width={45}
                  height={45}
                  priority
                  className="object-contain"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
} 