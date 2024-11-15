import { create} from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  activeModal: string | null;
  theme: 'light' | 'dark';
  setSidebarOpen: (isOpen: boolean) => void;
  setActiveModal: (modalId: string | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  activeModal: null,
  theme: 'light',
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  setActiveModal: (modalId) => set({ activeModal: modalId }),
  setTheme: (theme) => set({ theme }),
})); 