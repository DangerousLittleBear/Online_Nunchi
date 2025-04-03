'use client';

import { useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import logo from '@/public/images/logo.png';
import Image from 'next/image';

export default function Home() {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-96 h-96 relative mb-8">
        <Image
          src={logo}
          alt="Online Nunchi Logo"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-5xl px-4">
        <button className="flex-1 min-w-[200px] py-4 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xl font-semibold">
          방탈출 게임
        </button>
        
        <button className="flex-1 min-w-[200px] py-4 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xl font-semibold">
          다대다 오목 게임
        </button>

        <button className="flex-1 min-w-[200px] py-4 px-6 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xl font-semibold">
          로그인
        </button>

        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="flex-1 min-w-[200px] py-4 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xl font-semibold flex items-center justify-center gap-2"
        >
          {isMuted ? (
            <>
              <FaVolumeMute />
              <span>BGM 켜기</span>
            </>
          ) : (
            <>
              <FaVolumeUp />
              <span>BGM 끄기</span>
            </>
          )}
        </button>
      </div>
    </main>
  );
}
