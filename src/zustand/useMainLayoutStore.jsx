import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const useMainLayoutStore = create(
  persist(
    (set) => ({
      tabList: [],
      targetKey: '',
      clickType: '',
      setTabList: (value) => set({ tabList: value }),
      setTargetKey: (value) => set({ targetKey: value }),
      setClickType: (value) => set({ clickType: value }),
      resetAll: () => {
        localStorage.removeItem('mainLayout-storage');
        set({
          tabList: [],
          targetKey: '',
          clickType: '',
        });
      },
    }),
    {
      name: 'mainLayout-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useMainLayoutStore;
