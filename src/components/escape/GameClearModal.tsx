'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface GameClearModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GameClearModal({ isOpen, onClose }: GameClearModalProps) {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 confetti 효과 등을 추가할 수 있습니다
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleMainMenu = () => {
    router.push('/');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center transform transition-all duration-300 scale-100 opacity-100">
        <div className="mb-6">
          <Image
            src="/images/door_opened.png"
            alt="Door"
            width={64}
            height={64}
            className="mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-blue-600 mb-2">
            탈출 성공!
          </h2>
          <p className="text-gray-600 text-lg mb-4">
            축하합니다! 성공적으로 방을 탈출했습니다!
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 font-medium">
              여러분의 협동심과 눈치 덕분에 <br /> 무사히 탈출할 수 있었습니다!
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleMainMenu}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              메인 메뉴로
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              계속하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 