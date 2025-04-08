'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { useEffect } from 'react';
import { useScreenStore } from '@/store/useScreenStore';

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const checkScreenSize = useScreenStore((state) => state.checkScreenSize);

  useEffect(() => {
    // 초기 화면 크기 체크
    checkScreenSize();

    // 화면 크기 변경 시 체크
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [checkScreenSize]);

  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
} 