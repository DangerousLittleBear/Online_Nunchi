'use client';

import React from 'react';
import Image from 'next/image';

interface GameBoardProps {
  playerPosition: { x: number; y: number };
  totalPlayers: number;
}

export default function GameBoard({ playerPosition, totalPlayers }: GameBoardProps) {
  const gridSize = 10;
  const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));

  return (
    <div className="p-4">
      <div className="grid grid-cols-10 gap-2">
        {grid.map((row, y) =>
          row.map((_, x) => (
            <div
              key={`${x}-${y}`}
              className="w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center"
            >
              {playerPosition.x === x && playerPosition.y === y ? (
                <Image
                  src="/images/character.png"
                  alt="Player"
                  width={45}
                  height={45}
                  priority
                  className="object-contain"
                />
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
} 