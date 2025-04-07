'use client';

import { useState } from 'react';

interface UsernameModalProps {
  isOpen: boolean;
  onSubmit: (username: string) => void;
}

export default function UsernameModal({ isOpen, onSubmit }: UsernameModalProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!username.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }
    
    if (username.length < 2 || username.length > 10) {
      setError('닉네임은 2-10자 사이여야 합니다.');
      return;
    }

    // 특수문자 검사 (한글, 영문, 숫자만 허용)
    if (!/^[가-힣a-zA-Z0-9]+$/.test(username)) {
      setError('닉네임은 한글, 영문, 숫자만 사용 가능합니다.');
      return;
    }

    onSubmit(username);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-lg p-8 w-full max-w-md relative shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          닉네임 설정
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              게임에서 사용할 닉네임을 입력해주세요
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(''); // 입력 시 에러 메시지 초기화
              }}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="2-10자 이내"
              maxLength={10}
              required
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          <div className="text-sm text-gray-500">
            <ul className="list-disc list-inside space-y-1">
              <li>한글, 영문, 숫자만 사용 가능합니다.</li>
              <li>2-10자 이내로 입력해주세요.</li>
              <li>입력한 닉네임은 게임에서 표시됩니다.</li>
            </ul>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            확인
          </button>
        </form>
      </div>
    </div>
  );
} 