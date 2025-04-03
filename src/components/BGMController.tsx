'use client';

import { useState, useEffect, useRef } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

export default function BGMController() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/audio/bgm.mp3');
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleBGM = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.play().catch(error => {
        console.error('BGM 재생 실패:', error);
      });
    } else {
      audioRef.current.pause();
    }
    setIsMuted(!isMuted);
  };

  return (
    <button 
      onClick={toggleBGM}
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
  );
} 