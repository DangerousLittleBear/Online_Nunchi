'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useScreenStore } from '@/store/useScreenStore';

export default function GameInstructions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isPortable = useScreenStore((state) => state.isPortable);

  return (
    <>
      {/* 기본 게임 설명 (큰 화면에서만 표시) */}
      {!isPortable && (
        <div className="w-80 bg-gray-50 p-6 border-r border-gray-200 h-screen">
          <h2 className="text-2xl font-bold mb-4 text-black">게임 설명</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-black">게임 목표</h3>
              <p className="text-gray-600">방을 탈출하세요! 출구를 찾아 탈출하는 것이 목표입니다.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2 text-black">조작 방법</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>↑ : 위로 이동</li>
                <li>↓ : 아래로 이동</li>
                <li>← : 왼쪽으로 이동</li>
                <li>→ : 오른쪽으로 이동</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-black">게임 규칙</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>장애물을 피해서 이동하세요</li>
                <li>다른 플레이어와 협력하세요</li>
                <li>한번 이동하면 3초간 못 움직여요.</li>
                <li className="flex items-center">
                  출구(문)에 도달하면 게임 클리어!
                  <Image
                    src="/images/door_closed.png"
                    alt="Door"
                    width={16}
                    height={16}
                    className="ml-1 inline-block"
                  />
                </li>
              </ul>
            </div>

            <div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                상세 규칙 보기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 작은 화면에서만 보이는 정보 버튼 */}
      {isPortable && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed top-4 left-4 z-40 bg-white p-2 rounded-lg shadow-md"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      )}

      {/* 상세 규칙 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-md rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-black">상세 게임 규칙</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <section>
                <h3 className="text-xl font-semibold mb-2 text-black">1. 이동 규칙</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>한 번 이동 후 3초간 대기 시간이 있습니다.</li>
                  <li>장애물이 있는 칸으로는 이동할 수 없습니다.</li>
                  <li>맵 경계 밖으로는 이동할 수 없습니다.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-2 text-black">2. 팁</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>최대 플레이어는 5명입니다.</li>
                  <li className="font-bold">쿨타임은 각자에게 따로 적용됩니다..!</li>
                  <p className="text-xs">*쿨타임은 3초이지만 최대 플레이어가 5명이니 어쩌면 멈추지 않고 움직일 수 있을지도 모르겠습니다...*</p>
                </ul>
              </section>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 