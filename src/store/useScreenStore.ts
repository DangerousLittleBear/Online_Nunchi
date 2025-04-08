import { create } from 'zustand';

interface ScreenState {
  isPortable: boolean;
  checkScreenSize: () => void;
}

export const useScreenStore = create<ScreenState>((set) => ({
  isPortable: false,
  
  checkScreenSize: () => {
    // 맥북 에어 13인치 기준으로 1500px 이하를 휴대용 기기로 간주
    const isPortableDevice = window.innerWidth <= 1500;
    set({ isPortable: isPortableDevice });
  },
})); 