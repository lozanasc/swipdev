-- migration_name: create_initial_schema
-- description: Creates the initial database schema for the swipdev application
-- up.sql

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_type AS ENUM ('developer', 'employer');
CREATE TYPE project_status AS ENUM ('draft', 'active', 'completed');
CREATE TYPE task_status AS ENUM ('todo', 'inProgress', 'done');
CREATE TYPE match_status AS ENUM ('pending', 'accepted', 'rejected');
CREATE TYPE experience_level AS ENUM ('junior', 'mid', 'senior');

-- Add custom fields to auth.users
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS user_type user_type;
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS raw_user_meta_data JSONB;

-- Create developer_profiles table
CREATE TABLE developer_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    experience_level experience_level NOT NULL,
    hourly_rate DECIMAL(10,2) NOT NULL,
    is_available BOOLEAN DEFAULT true,
    image_url TEXT,
    github_profile TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

-- Create developer_skills table
CREATE TABLE developer_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    developer_id UUID REFERENCES developer_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    proficiency INTEGER CHECK (proficiency BETWEEN 1 AND 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(developer_id, name)
);

-- Create developer_portfolio_links table
CREATE TABLE developer_portfolio_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    developer_id UUID REFERENCES developer_profiles(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create employer_profiles table
CREATE TABLE employer_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    industry TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    company_size TEXT,
    website TEXT,
    linkedin_url TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

-- Create projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employer_id UUID REFERENCES employer_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    budget_min DECIMAL(10,2) NOT NULL,
    budget_max DECIMAL(10,2) NOT NULL,
    estimated_duration TEXT NOT NULL,
    status project_status DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create project_tech_stack table
CREATE TABLE project_tech_stack (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    tech_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(project_id, tech_name)
);

-- Create project_tasks table
CREATE TABLE project_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    estimate TEXT,
    task_type TEXT NOT NULL,
    status task_status DEFAULT 'todo',
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create matches table
CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    developer_id UUID REFERENCES developer_profiles(id) ON DELETE CASCADE,
    employer_id UUID REFERENCES employer_profiles(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    status match_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(developer_id, employer_id, project_id)
);

-- Create necessary indexes
CREATE INDEX idx_developer_profiles_user_id ON developer_profiles(user_id);
CREATE INDEX idx_employer_profiles_user_id ON employer_profiles(user_id);
CREATE INDEX idx_projects_employer_id ON projects(employer_id);
CREATE INDEX idx_project_tasks_project_id ON project_tasks(project_id);
CREATE INDEX idx_matches_developer_id ON matches(developer_id);
CREATE INDEX idx_matches_employer_id ON matches(employer_id);
CREATE INDEX idx_matches_project_id ON matches(project_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_developer_profiles_updated_at
    BEFORE UPDATE ON developer_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employer_profiles_updated_at
    BEFORE UPDATE ON employer_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_tasks_updated_at
    BEFORE UPDATE ON project_tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_matches_updated_at
    BEFORE UPDATE ON matches
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add RLS policies
ALTER TABLE developer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE developer_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE developer_portfolio_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE employer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (you may want to customize these further)
CREATE POLICY "Developers can view their own profile"
    ON developer_profiles FOR ALL
    USING (auth.uid() = user_id);

CREATE POLICY "Employers can view all developer profiles"
    ON developer_profiles FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.user_type = 'employer'
    ));

