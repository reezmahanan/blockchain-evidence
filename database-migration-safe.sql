-- Safe Migration Script for Existing Database
-- Run this in Supabase SQL Editor

-- Drop existing policies first
DROP POLICY IF EXISTS "Allow all operations" ON users;
DROP POLICY IF EXISTS "Allow all operations" ON admin_actions;
DROP POLICY IF EXISTS "Allow all operations" ON evidence;
DROP POLICY IF EXISTS "Allow all operations" ON cases;
DROP POLICY IF EXISTS "Allow all operations" ON activity_logs;

-- Drop and recreate users table (this will lose existing user data)
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS admin_actions CASCADE;

-- Create new users table with enhanced fields
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    wallet_address TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('public_viewer', 'investigator', 'forensic_analyst', 'legal_professional', 'court_official', 'evidence_manager', 'auditor', 'admin')),
    department TEXT,
    jurisdiction TEXT,
    badge_number TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    account_type TEXT DEFAULT 'real' CHECK (account_type IN ('real', 'test')),
    created_by TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create admin actions table
CREATE TABLE admin_actions (
    id SERIAL PRIMARY KEY,
    admin_wallet TEXT NOT NULL,
    action_type TEXT NOT NULL,
    target_wallet TEXT,
    details JSONB,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on new tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_actions ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Allow all operations" ON users FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON admin_actions FOR ALL USING (true);

-- Re-enable RLS on existing tables if needed
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'evidence') THEN
        ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow all operations" ON evidence FOR ALL USING (true);
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'cases') THEN
        ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow all operations" ON cases FOR ALL USING (true);
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'activity_logs') THEN
        ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow all operations" ON activity_logs FOR ALL USING (true);
    END IF;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_wallet ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active);
CREATE INDEX IF NOT EXISTS idx_users_account_type ON users(account_type);
CREATE INDEX IF NOT EXISTS idx_admin_actions_admin ON admin_actions(admin_wallet);

-- Insert first admin (REPLACE WITH YOUR ACTUAL WALLET ADDRESS)
INSERT INTO users (wallet_address, full_name, role, department, jurisdiction, account_type, created_by) 
VALUES ('YOUR_METAMASK_WALLET_ADDRESS_HERE', 'System Administrator', 'admin', 'IT Department', 'System', 'real', 'system');

-- Create update function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();