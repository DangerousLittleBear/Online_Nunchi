'use client';

import { useState, useEffect } from 'react';
import GameBoard from '@/components/escape/GameBoard';
import DirectionControls from '@/components/escape/DirectionControls';

export default function EscapeGame() {
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 });
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
      if (data.type === 'POSITION_UPDATE') {
        setCharacterPosition(data.position);
      } else if (data.type === 'PLAYER_COUNT') {
        setPlayerCount(data.count);
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

    const newPosition = { ...characterPosition };
    
    switch (direction) {
      case 'up':
        if (newPosition.y > 0) newPosition.y--;
        break;
      case 'down':
        if (newPosition.y < 9) newPosition.y++;
        break;
      case 'left':
        if (newPosition.x > 0) newPosition.x--;
        break;
      case 'right':
        if (newPosition.x < 9) newPosition.x++;
        break;
    }

    // 서버에 새로운 위치 전송
    socket.send(JSON.stringify({
      type: 'MOVE',
      position: newPosition
    }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">방탈출 게임</h1>
        <p className="text-gray-600 text-lg">현재 접속자: {playerCount}/30</p>
        <p className="text-gray-600 text-lg">연결 상태: {isConnected ? '연결됨' : '연결 끊김'}</p>
      </div>
      
      <div className="mb-12">
        <GameBoard 
          characterPosition={characterPosition}
          size={10}
        />
      </div>
      
      <DirectionControls onMove={handleMove} />
    </div>
  );
} 