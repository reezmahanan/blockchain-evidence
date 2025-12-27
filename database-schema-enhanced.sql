-- Enhanced Database Schema for User & Admin Management
-- Run this in Supabase SQL Editor

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS admin_actions CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table with enhanced fields
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
    created_by TEXT, -- wallet address of admin who created this user
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin actions log table
CREATE TABLE admin_actions (
    id SERIAL PRIMARY KEY,
    admin_wallet TEXT NOT NULL,
    action_type TEXT NOT NULL,
    target_wallet TEXT,
    details JSONB,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Evidence table (keep existing structure)
CREATE TABLE IF NOT EXISTS evidence (
    id SERIAL PRIMARY KEY,
    case_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    file_data TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    hash TEXT NOT NULL,
    submitted_by TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'pending'
);

-- Cases table (keep existing structure)
CREATE TABLE IF NOT EXISTS cases (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT DEFAULT 'medium',
    created_by TEXT NOT NULL,
    status TEXT DEFAULT 'open',
    created_date TIMESTAMPTZ DEFAULT NOW()
);

-- Activity logs table (keep existing structure)
CREATE TABLE IF NOT EXISTS activity_logs (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    ip_address TEXT
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for demo - in production, implement proper RLS)
CREATE POLICY "Allow all operations" ON users FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON admin_actions FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON evidence FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON cases FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON activity_logs FOR ALL USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_wallet ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active);
CREATE INDEX IF NOT EXISTS idx_users_account_type ON users(account_type);
CREATE INDEX IF NOT EXISTS idx_admin_actions_admin ON admin_actions(admin_wallet);
CREATE INDEX IF NOT EXISTS idx_admin_actions_timestamp ON admin_actions(timestamp);

-- Insert first admin (replace with YOUR actual wallet address)
INSERT INTO users (wallet_address, full_name, role, department, jurisdiction, account_type, created_by) 
VALUES ('YOUR_METAMASK_WALLET_ADDRESS_HERE', 'System Administrator', 'admin', 'IT Department', 'System', 'real', 'system')
ON CONFLICT (wallet_address) DO NOTHING;

-- Function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update timestamp
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();