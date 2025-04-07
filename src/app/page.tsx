'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import BGMController from '@/components/BGMController';
import LoginModal from '@/components/LoginModal';
import SignupModal from '@/components/SignupModal';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [showFullscreenAlert, setShowFullscreenAlert] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkFullscreen = () => {
      const isFullscreen = document.fullscreenElement !== null;
      setShowFullscreenAlert(!isFullscreen);
    };

    // 초기 체크
    checkFullscreen();

    // fullscreenchange 이벤트 리스너 추가
    document.addEventListener('fullscreenchange', checkFullscreen);

    // 클린업
    return () => {
      document.removeEventListener('fullscreenchange', checkFullscreen);
    };
  }, []);

  const enterFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.error('Failed to enter fullscreen:', err);
    }
  };

  const handleCloseModals = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
  };

  const switchToSignup = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const switchToLogin = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleEscapeGameClick = () => {
    router.push('/escape');
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative">
      {showFullscreenAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-lg z-50">
          <div className="flex items-center">
            <div className="py-1">
              <svg className="h-6 w-6 text-yellow-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex items-center gap-4">
              <span>원활한 게임을 위해 전체화면으로 진행해주세요 <br /> (테스트 버전이라 16:9 비율로 제작되었습니다.)</span>
              <button
                onClick={enterFullscreen}
                className="px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition-colors text-sm"
              >
                전체화면으로 전환
              </button>
            </div>
          </div>
        </div>
      )}

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
        <button 
          onClick={handleEscapeGameClick}
          className="flex-1 min-w-[200px] py-4 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xl font-semibold"
        >
          방탈출 게임
        </button>
        
        <button  
          onClick={() => alert("준비중입니다.")}
          className="flex-1 min-w-[200px] py-4 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xl font-semibold">
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
        onClose={handleCloseModals}
        onSwitchToSignup={switchToSignup}
      />

      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={handleCloseModals}
        onSwitchToLogin={switchToLogin}
      />
    </main>
  );
}
