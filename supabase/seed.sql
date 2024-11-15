-- seed.sql

-- First, insert into auth.users
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, role, user_type) VALUES
-- Developers
('d1111111-1111-1111-1111-111111111111', 'john.dev@example.com', crypt('password123', gen_salt('bf')), NOW(), 'authenticated', 'developer'),
('d2222222-2222-2222-2222-222222222222', 'sarah.dev@example.com', crypt('password123', gen_salt('bf')), NOW(), 'authenticated', 'developer'),
('d3333333-3333-3333-3333-333333333333', 'mike.dev@example.com', crypt('password123', gen_salt('bf')), NOW(), 'authenticated', 'developer'),
-- Employers
('e1111111-1111-1111-1111-111111111111', 'tech.corp@example.com', crypt('password123', gen_salt('bf')), NOW(), 'authenticated', 'employer'),
('e2222222-2222-2222-2222-222222222222', 'startup.io@example.com', crypt('password123', gen_salt('bf')), NOW(), 'authenticated', 'employer'),
('e3333333-3333-3333-3333-333333333333', 'digital.agency@example.com', crypt('password123', gen_salt('bf')), NOW(), 'authenticated', 'employer');

-- Then proceed with developer profiles
INSERT INTO developer_profiles (user_id, name, experience_level, hourly_rate, is_available, github_profile) VALUES
('d1111111-1111-1111-1111-111111111111', 'John Developer', 'senior', 85.00, true, 'github.com/johndev'),
('d2222222-2222-2222-2222-222222222222', 'Sarah Coder', 'mid', 65.00, true, 'github.com/sarahcoder'),
('d3333333-3333-3333-3333-333333333333', 'Mike Frontend', 'junior', 45.00, true, 'github.com/mikefront');

-- Seed Developer Skills
INSERT INTO developer_skills (developer_id, name, proficiency) VALUES
-- John's skills
((SELECT id FROM developer_profiles WHERE name = 'John Developer'), 'React', 5),
((SELECT id FROM developer_profiles WHERE name = 'John Developer'), 'Node.js', 4),
((SELECT id FROM developer_profiles WHERE name = 'John Developer'), 'TypeScript', 5),
-- Sarah's skills
((SELECT id FROM developer_profiles WHERE name = 'Sarah Coder'), 'Python', 5),
((SELECT id FROM developer_profiles WHERE name = 'Sarah Coder'), 'Django', 4),
((SELECT id FROM developer_profiles WHERE name = 'Sarah Coder'), 'PostgreSQL', 4),
-- Mike's skills
((SELECT id FROM developer_profiles WHERE name = 'Mike Frontend'), 'React', 3),
((SELECT id FROM developer_profiles WHERE name = 'Mike Frontend'), 'CSS', 4),
((SELECT id FROM developer_profiles WHERE name = 'Mike Frontend'), 'JavaScript', 3);

-- Seed Developer Portfolio Links
INSERT INTO developer_portfolio_links (developer_id, url) VALUES
('d1111111-1111-1111-1111-111111111111', 'https://john-portfolio.dev'),
('d2222222-2222-2222-2222-222222222222', 'https://sarah-portfolio.dev'),
('d3333333-3333-3333-3333-333333333333', 'https://mike-portfolio.dev');

-- Seed Employer Profiles
INSERT INTO employer_profiles (id, user_id, company_name, industry, contact_email, contact_phone, company_size, website) VALUES
('ep111111-1111-1111-1111-111111111111', 'e1111111-1111-1111-1111-111111111111', 'Tech Corp', 'Technology', 'hr@techcorp.com', '+1234567890', '50-100', 'https://techcorp.com'),
('ep222222-2222-2222-2222-222222222222', 'e2222222-2222-2222-2222-222222222222', 'StartupIO', 'Software', 'team@startupio.com', '+1234567891', '10-50', 'https://startupio.com'),
('ep333333-3333-3333-3333-333333333333', 'e3333333-3333-3333-3333-333333333333', 'Digital Agency', 'Marketing', 'projects@digitalagency.com', '+1234567892', '10-50', 'https://digitalagency.com');

-- Seed Projects
INSERT INTO projects (id, employer_id, title, description, budget_min, budget_max, estimated_duration, status) VALUES
('p1111111-1111-1111-1111-111111111111', 'ep111111-1111-1111-1111-111111111111', 'E-commerce Platform', 'Build a modern e-commerce platform with React and Node.js', 15000.00, 25000.00, '3 months', 'active'),
('p2222222-2222-2222-2222-222222222222', 'ep222222-2222-2222-2222-222222222222', 'Mobile App MVP', 'Develop MVP for iOS fitness tracking app', 10000.00, 20000.00, '2 months', 'draft'),
('p3333333-3333-3333-3333-333333333333', 'ep333333-3333-3333-3333-333333333333', 'Website Redesign', 'Redesign company website with modern UI/UX', 8000.00, 15000.00, '1 month', 'active');

-- Seed Project Tech Stack
INSERT INTO project_tech_stack (project_id, tech_name) VALUES
-- E-commerce Platform
('p1111111-1111-1111-1111-111111111111', 'React'),
('p1111111-1111-1111-1111-111111111111', 'Node.js'),
('p1111111-1111-1111-1111-111111111111', 'PostgreSQL'),
-- Mobile App MVP
('p2222222-2222-2222-2222-222222222222', 'Swift'),
('p2222222-2222-2222-2222-222222222222', 'Firebase'),
-- Website Redesign
('p3333333-3333-3333-3333-333333333333', 'React'),
('p3333333-3333-3333-3333-333333333333', 'Tailwind CSS');

-- Seed Project Tasks
INSERT INTO project_tasks (project_id, title, description, estimate, task_type, status, order_index) VALUES
-- E-commerce Platform Tasks
('p1111111-1111-1111-1111-111111111111', 'Setup Project', 'Initialize React project and configure build tools', '2 days', 'setup', 'done', 1),
('p1111111-1111-1111-1111-111111111111', 'User Authentication', 'Implement user authentication system', '1 week', 'backend', 'inProgress', 2),
('p1111111-1111-1111-1111-111111111111', 'Product Catalog', 'Create product listing and detail pages', '2 weeks', 'frontend', 'todo', 3),
-- Mobile App MVP Tasks
('p2222222-2222-2222-2222-222222222222', 'UI Design', 'Create app wireframes and UI design', '1 week', 'design', 'todo', 1),
('p2222222-2222-2222-2222-222222222222', 'Core Features', 'Implement core fitness tracking features', '3 weeks', 'development', 'todo', 2),
-- Website Redesign Tasks
('p3333333-3333-3333-3333-333333333333', 'Homepage', 'Redesign homepage layout', '1 week', 'frontend', 'inProgress', 1),
('p3333333-3333-3333-3333-333333333333', 'Responsive Design', 'Ensure mobile responsiveness', '1 week', 'frontend', 'todo', 2);

-- Seed Matches
INSERT INTO matches (developer_id, employer_id, project_id, status) VALUES
('d1111111-1111-1111-1111-111111111111', 'ep111111-1111-1111-1111-111111111111', 'p1111111-1111-1111-1111-111111111111', 'accepted'),
('d2222222-2222-2222-2222-222222222222', 'ep222222-2222-2222-2222-222222222222', 'p2222222-2222-2222-2222-222222222222', 'pending'),
('d3333333-3333-3333-3333-333333333333', 'ep333333-3333-3333-3333-333333333333', 'p3333333-3333-3333-3333-333333333333', 'pending');

-- Create test admin user function
CREATE OR REPLACE FUNCTION create_test_admin_user()
RETURNS void AS $$
BEGIN
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, role)
  VALUES (
    'd0000000-0000-0000-0000-000000000000',
    'admin@example.com',
    crypt('admin123', gen_salt('bf')),
    NOW(),
    'authenticated'
  ) ON CONFLICT (id) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- Execute the function
SELECT create_test_admin_user();