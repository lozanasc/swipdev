import { create } from 'zustand';
import { Match, DeveloperProfile } from '@/types';
import { mockDevelopers } from '@/lib/mock/developers';

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
  loadInitialDevelopers: () => Promise<void>;
}

export const useMatchStore = create<MatchState>((set, get) => ({
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
  swipeLeft: (developerId) => {
    const { potentialDevelopers } = get();
    set({
      potentialDevelopers: potentialDevelopers.filter(
        (d) => d.id !== developerId
      ),
    });
    console.log('Swiped left on developer:', developerId);
  },
  swipeRight: (developerId) => {
    const { potentialDevelopers } = get();
    const newMatch: Match = {
      id: `match-${Date.now()}`,
      developerId,
      employerId: 'current-employer-id',
      status: 'pending',
      createdAt: new Date()
    };
    set((state) => ({
      matches: [...state.matches, newMatch],
      potentialDevelopers: potentialDevelopers.filter(
        (d) => d.id !== developerId
      ),
    }));
    console.log('Swiped right on developer:', developerId);
  },
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  loadInitialDevelopers: async () => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      set({
        potentialDevelopers: mockDevelopers,
        currentDeveloper: mockDevelopers[0],
        isLoading: false
      });
    } catch (error) {
      set({
        error: 'Failed to load developers',
        isLoading: false
      });
    }
  }
})); 