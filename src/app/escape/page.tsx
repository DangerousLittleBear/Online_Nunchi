'use client';

import { useState, useEffect } from 'react';
import GameBoard from '@/components/escape/GameBoard';
import DirectionControls from '@/components/escape/DirectionControls';
import GameInstructions from '@/components/escape/GameInstructions';

export default function EscapeGame() {
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 });
  const [obstacles, setObstacles] = useState<Array<{ x: number; y: number }>>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/ws');

    ws.onopen = () => {
      console.log('WebSocket Connected');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const type = data.type;
      const position = data.position;
      const obstacles = data.obstacles;
      
      console.log(obstacles); 
      
      setPlayerCount(data.playerCount);
      if (type === 'POSITION_UPDATE') {
        setCharacterPosition(position);
        console.log("position update");
      }
      if (obstacles) {
        setObstacles(obstacles);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (!socket || !isConnected) return;

    let xDirection = 0;
    let yDirection = 0;
    switch (direction) {
      case 'up':
        xDirection = 0;
        yDirection = -1;
        break;
      case 'down':
        xDirection = 0;
        yDirection = 1;
        break;
      case 'left':
        xDirection = -1;
        yDirection = 0;
        break;
      case 'right':
        xDirection = 1;
        yDirection = 0;
        break;
    }

    // 서버에 새로운 위치 전송
    socket.send(JSON.stringify({
      type: 'MOVE',
      position: 
      {
        x: xDirection,
        y: yDirection
      }
    }));
  };

  return (
    <div className="min-h-screen bg-white flex">
      <GameInstructions />

      {/* 메인 게임 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="mb-1 w-full">
          <div className="max-w-3xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold">방탈출 게임</h1>
            <div className="flex flex-col items-end gap-1">
              <p className="text-gray-600 text-lg">현재 접속자: {playerCount}/5</p>
              <p className="text-gray-600 text-lg">연결 상태: {isConnected ? '연결됨' : '연결 끊김'}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-1 w-full px-4">
          <GameBoard 
            characterPosition={characterPosition}
            size={{ width: 31, height: 21 }}
            obstacles={obstacles}
          />
        </div>
        
        <DirectionControls onMove={handleMove} />
      </div>
    </div>
  );
} 