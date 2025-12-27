-- Minimal Migration Script - Run this in Supabase SQL Editor
-- REPLACE '0x29bb7718d5c6da6e787deae8fd6bb3459e8539f2' with your actual MetaMask wallet address

-- Step 1: Create users table
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    wallet_address TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL,
    department TEXT,
    jurisdiction TEXT,
    badge_number TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    account_type TEXT DEFAULT 'real',
    created_by TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2: Create admin_actions table
DROP TABLE IF EXISTS admin_actions CASCADE;
CREATE TABLE admin_actions (
    id SERIAL PRIMARY KEY,
    admin_wallet TEXT NOT NULL,
    action_type TEXT NOT NULL,
    target_wallet TEXT,
    details JSONB,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Step 3: Enable RLS and create policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_actions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all operations" ON users;
DROP POLICY IF EXISTS "Allow all operations" ON admin_actions;

CREATE POLICY "Allow all operations" ON users FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON admin_actions FOR ALL USING (true);

-- Step 4: Create indexes
CREATE INDEX idx_users_wallet ON users(wallet_address);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_admin_actions_admin ON admin_actions(admin_wallet);

-- Step 5: Insert first admin (REPLACE WITH YOUR WALLET)
INSERT INTO users (wallet_address, full_name, role, department, jurisdiction, account_type, created_by) 
VALUES ('0x29bb7718d5c6da6e787deae8fd6bb3459e8539f2', 'System Administrator', 'admin', 'IT Department', 'System', 'real', 'system');