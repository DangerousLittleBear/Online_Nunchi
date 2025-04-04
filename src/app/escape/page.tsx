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
      const type = data.type;
      const position = data.position;
      console.log(type);
      console.log(position);
      setPlayerCount(data.playerCount);

      if (type === 'POSITION_UPDATE') {
        setCharacterPosition(position);
        console.log("position update");
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