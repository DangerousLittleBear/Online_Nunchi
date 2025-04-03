'use client';

import { useState, useEffect } from 'react';
import GameBoard from '@/components/escape/GameBoard';
import DirectionControls from '@/components/escape/DirectionControls';

export default function EscapeGame() {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 }); // 0-based index
  const [players, setPlayers] = useState<Array<{ id: string, x: number, y: number }>>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    // WebSocket 연결
    const ws = new WebSocket('ws://localhost:3001'); // 서버 주소는 실제 서버 주소로 변경 필요

    ws.onopen = () => {
      console.log('WebSocket 연결됨');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'playerPosition') {
        setPlayerPosition({ x: data.x, y: data.y });
      } else if (data.type === 'players') {
        setPlayers(data.players);
        setPlayerCount(data.players.length);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket 연결 끊김');
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket 에러:', error);
    };

    setSocket(ws);

    // 컴포넌트 언마운트 시 WebSocket 연결 종료
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (!socket || !isConnected) return;

    const newPosition = { ...playerPosition };
    
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

    // 서버에 이동 정보 전송
    socket.send(JSON.stringify({
      type: 'move',
      x: newPosition.x,
      y: newPosition.y
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
          playerPosition={playerPosition} 
          players={players}
          size={10}
        />
      </div>
      
      <DirectionControls onMove={handleMove} />
    </div>
  );
} 