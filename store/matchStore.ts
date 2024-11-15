import { create } from 'zustand';
import { Match, DeveloperProfile } from '@/types';

interface MatchState {
  matches: Match[];
  potentialDevelopers: DeveloperProfile[];
  currentDeveloper: DeveloperProfile | null;
  isLoading: boolean;
  error: string | null;
  setMatches: (matches: Match[]) => void;
  setPotentialDevelopers: (developers: DeveloperProfile[]) => void;
  setCurrentDeveloper: (developer: DeveloperProfile | null) => void;
  addMatch: (match: Match) => void;
  updateMatch: (matchId: string, updates: Partial<Match>) => void;
  removeMatch: (matchId: string) => void;
  swipeLeft: (developerId: string) => void;
  swipeRight: (developerId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMatchStore = create<MatchState>((set) => ({
  matches: [],
  potentialDevelopers: [],
  currentDeveloper: null,
  isLoading: false,
  error: null,
  setMatches: (matches) => set({ matches }),
  setPotentialDevelopers: (developers) => set({ potentialDevelopers: developers }),
  setCurrentDeveloper: (developer) => set({ currentDeveloper: developer }),
  addMatch: (match) =>
    set((state) => ({ matches: [...state.matches, match] })),
  updateMatch: (matchId, updates) =>
    set((state) => ({
      matches: state.matches.map((m) =>
        m.id === matchId ? { ...m, ...updates } : m
      ),
    })),
  removeMatch: (matchId) =>
    set((state) => ({
      matches: state.matches.filter((m) => m.id !== matchId),
    })),
  swipeLeft: (developerId) =>
    set((state) => ({
      potentialDevelopers: state.potentialDevelopers.filter(
        (d) => d.id !== developerId
      ),
    })),
  swipeRight: (developerId) =>
    set((state) => ({
      potentialDevelopers: state.potentialDevelopers.filter(
        (d) => d.id !== developerId
      ),
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
})); 