import { create } from 'zustand';
import { DeveloperProfile, EmployerProfile } from '@/types';

interface ProfileState {
  developerProfile: DeveloperProfile | null;
  employerProfile: EmployerProfile | null;
  isLoading: boolean;
  error: string | null;
  setDeveloperProfile: (profile: DeveloperProfile | null) => void;
  setEmployerProfile: (profile: EmployerProfile | null) => void;
  updateDeveloperProfile: (updates: Partial<DeveloperProfile>) => void;
  updateEmployerProfile: (updates: Partial<EmployerProfile>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  developerProfile: null,
  employerProfile: null,
  isLoading: false,
  error: null,
  setDeveloperProfile: (profile) => set({ developerProfile: profile }),
  setEmployerProfile: (profile) => set({ employerProfile: profile }),
  updateDeveloperProfile: (updates) =>
    set((state) => ({
      developerProfile: state.developerProfile
        ? { ...state.developerProfile, ...updates }
        : null,
    })),
  updateEmployerProfile: (updates) =>
    set((state) => ({
      employerProfile: state.employerProfile
        ? { ...state.employerProfile, ...updates }
        : null,
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
})); 