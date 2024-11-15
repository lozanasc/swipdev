export interface User {
  id: string;
  email: string;
  type: 'developer' | 'employer';
  createdAt: Date;
}

export interface DeveloperProfile {
  id: string;
  userId: string;
  name: string;
  skills: { name: string; proficiency: number }[];
  portfolioLinks: string[];
  githubProfile?: string;
  experienceLevel: 'junior' | 'mid' | 'senior';
  hourlyRate: number;
  isAvailable: boolean;
  imageUrl?: string;
}

export interface EmployerProfile {
  id: string;
  userId: string;
  companyName: string;
  industry: string;
  contactInfo: {
    email: string;
    phone?: string;
  };
  companySize?: string;
  website?: string;
  linkedIn?: string;
  imageUrl?: string;
}

export interface Project {
  id: string;
  employerId: string;
  title: string;
  description: string;
  techStack: string[];
  budget: {
    min: number;
    max: number;
  };
  estimatedDuration: string;
  tasks: ProjectTask[];
  status: 'draft' | 'active' | 'completed';
}

export interface ProjectTask {
  id: string;
  title: string;
  description?: string;
  estimate?: string;
  task_type: 'setup' | 'frontend' | 'backend' | 'design' | 'testing';
  status: 'todo' | 'inProgress' | 'review' | 'done';
  order_index: number;
}

export interface Match {
  id: string;
  developerId: string;
  employerId: string;
  projectId?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
} 