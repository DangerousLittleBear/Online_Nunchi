'use client';

import React from 'react';
import Image from 'next/image';

interface GameBoardProps {
  characterPosition: { x: number; y: number };
  size: { width: number; height: number };
  obstacles: Array<{ x: number; y: number }>;
}

export default function GameBoard({ characterPosition, size, obstacles }: GameBoardProps) {
  const grid = Array(size.height).fill(null).map(() => Array(size.width).fill(null));

  const isObstacle = (x: number, y: number) => {
    return obstacles.some(obstacle => obstacle.x === x && obstacle.y === y);
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div 
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${size.width}, 2rem)`,
          gridTemplateRows: `repeat(${size.height}, 2rem)`
        }}
      >
        {grid.map((row, y) =>
          row.map((_, x) => (
            <div
              key={`${x}-${y}`}
              className={`w-8 h-8 border border-gray-300 rounded-sm flex items-center justify-center relative ${
                isObstacle(x, y) ? 'bg-gray-400' : 'bg-white'
              }`}
            >
              {characterPosition.x === x && characterPosition.y === y && (
                <Image
                  src="/images/character.png"
                  alt="Character"
                  width={24}
                  height={24}
                  priority
                  className="object-contain"
                />
              )}
              {x === 30 && y === 20 && (
                <Image
                  src="/images/door_closed.png"
                  alt="Door"
                  width={24}
                  height={24}
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