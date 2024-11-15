-- Enable RLS
ALTER TABLE developer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE employer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE developer_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE developer_portfolio_links ENABLE ROW LEVEL SECURITY;

-- Developer Profiles Policies
CREATE POLICY "Users can create their own developer profile"
ON developer_profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own developer profile"
ON developer_profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Developer Skills Policies
CREATE POLICY "Users can add skills to their profile"
ON developer_skills FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM developer_profiles
    WHERE id = developer_skills.developer_id
    AND user_id = auth.uid()
  )
);

-- Portfolio Links Policies
CREATE POLICY "Users can add portfolio links to their profile"
ON developer_portfolio_links FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM developer_profiles
    WHERE id = developer_portfolio_links.developer_id
    AND user_id = auth.uid()
  )
);

-- Employer Profiles Policies
CREATE POLICY "Users can create their own employer profile"
ON employer_profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own employer profile"
ON employer_profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);