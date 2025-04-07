'use client';

import React from 'react';

interface WaitingRoomProps {
  playerCount: number;
  isConnected: boolean;
}

export default function WaitingRoom({ playerCount, isConnected }: WaitingRoomProps) {
  const totalPlayers = 5;
  const playerCircles = Array(totalPlayers).fill(null);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
          게임 대기중
        </h2>

        {/* 연결 상태 표시 */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
          <span className="text-gray-600">
            {isConnected ? '서버와 연결됨' : '연결 끊김'}
          </span>
        </div>

        {/* 플레이어 카운트 시각화 */}
        <div className="flex justify-center items-center gap-4 mb-8">
          {playerCircles.map((_, index) => (
            <div
              key={index}
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                index < playerCount
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300 bg-gray-50'
              }`}
            >
              {index < playerCount && (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* 상태 메시지 */}
        <div className="text-center space-y-2">
          <p className="text-xl font-semibold text-gray-800">
            {playerCount}/5 명 참가중
          </p>
          <p className="text-gray-600">
            {5 - playerCount}명 더 모이면 게임이 시작됩니다
          </p>
        </div>

        {/* 로딩 애니메이션 */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 