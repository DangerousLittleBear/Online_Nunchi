'use client';

import React from 'react';
import Image from 'next/image';
import { useScreenStore } from '@/store/useScreenStore';

interface GameBoardProps {
  characterPosition: { x: number; y: number };
  size: { width: number; height: number };
  obstacles: Array<{ x: number; y: number }>;
}

export default function GameBoard({ characterPosition, size, obstacles }: GameBoardProps) {
  const isPortable = useScreenStore((state) => state.isPortable);
  const grid = Array(size.height).fill(null).map(() => Array(size.width).fill(null));

  const isObstacle = (x: number, y: number) => {
    return obstacles.some(obstacle => obstacle.x === x && obstacle.y === y);
  };

  // 셀 크기를 isPortable 상태에 따라 조정
  const cellSize = isPortable ? '1.5rem' : '2rem';
  const imageSize = isPortable ? 18 : 24; // 이미지 크기도 비례적으로 조정

  return (
    <div className="flex justify-center items-center p-4">
      <div 
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${size.width}, ${cellSize})`,
          gridTemplateRows: `repeat(${size.height}, ${cellSize})`
        }}
      >
        {grid.map((row, y) =>
          row.map((_, x) => (
            <div
              key={`${x}-${y}`}
              className={`border border-gray-300 rounded-sm flex items-center justify-center relative ${
                isObstacle(x, y) ? 'bg-gray-400' : 'bg-white'
              }`}
              style={{
                width: cellSize,
                height: cellSize
              }}
            >
              {characterPosition.x === x && characterPosition.y === y && (
                <Image
                  src="/images/character.png"
                  alt="Character"
                  width={imageSize}
                  height={imageSize}
                  priority
                  className="object-contain"
                />
              )}
              {x === 30 && y === 20 && (
                <Image
                  src="/images/door_closed.png"
                  alt="Door"
                  width={imageSize}
                  height={imageSize}
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