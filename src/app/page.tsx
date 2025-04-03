'use client';

import { useState } from 'react';
import Image from 'next/image';
import BGMController from '@/components/BGMController';
import LoginModal from '@/components/LoginModal';

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative">
      <div className="absolute top-2 right-4 text-sm text-gray-400">
        @madeBy : DangerousLittleBear
      </div>
      
      <div className="w-150 h-150 relative mb-8">
        <Image
          src="/images/logo.png"
          alt="Online Nunchi Logo"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-5xl px-4">
        <button className="flex-1 min-w-[200px] py-4 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xl font-semibold">
          방탈출 게임
        </button>
        
        <button className="flex-1 min-w-[200px] py-4 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xl font-semibold">
          다대다 오목 게임
        </button>

        <button 
          onClick={() => setIsLoginModalOpen(true)}
          className="flex-1 min-w-[200px] py-4 px-6 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xl font-semibold"
        >
          로그인
        </button>

        <BGMController />
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </main>
  );
}
