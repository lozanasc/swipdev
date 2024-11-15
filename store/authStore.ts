import { create } from 'zustand';
import { User } from '@/types';
import { getBrowserSupabaseClient } from '@/lib/supabase/browser-client';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: async () => {
    const supabase = getBrowserSupabaseClient();
    await supabase.auth.signOut();
    set({ user: null });
    window.location.href = '/login'; // Force a full page reload to /login
  }
})); 