import { create } from 'zustand';
import { Project, ProjectTask } from '@/types';
import { getBrowserSupabaseClient } from '@/lib/supabase/browser-client';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  fetchProject: (id: string) => Promise<void>;
  updateTask: (projectId: string, taskId: string, updates: Partial<ProjectTask>) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    try {
      set({ isLoading: true, error: null });
      const supabase = getBrowserSupabaseClient();
      
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          tasks:project_tasks(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ 
        projects: data as Project[],
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: (error as Error).message,
        isLoading: false 
      });
    }
  },

  fetchProject: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          tasks:project_tasks(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      set({ 
        currentProject: data as Project,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: (error as Error).message,
        isLoading: false 
      });
    }
  },

  updateTask: async (projectId: string, taskId: string, updates: Partial<ProjectTask>) => {
    try {
      set({ error: null });
      const supabase = createClient();
      
      const { error } = await supabase
        .from('project_tasks')
        .update(updates)
        .eq('id', taskId)
        .eq('project_id', projectId);

      if (error) throw error;

      // Update local state
      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === projectId
            ? {
                ...p,
                tasks: p.tasks.map((t) =>
                  t.id === taskId ? { ...t, ...updates } : t
                ),
              }
            : p
        ),
        currentProject: state.currentProject?.id === projectId
          ? {
              ...state.currentProject,
              tasks: state.currentProject.tasks.map((t) =>
                t.id === taskId ? { ...t, ...updates } : t
              ),
            }
          : state.currentProject
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
})); 