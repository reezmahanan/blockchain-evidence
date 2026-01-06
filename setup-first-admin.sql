-- First Admin Setup Script for EVID-DGC
-- Run this ONCE in Supabase SQL Editor to create the first administrator
-- Admin Wallet: 0x29bb7718d5c6da6e787deae8fd6bb3459e8539f2
-- Admin Email: Gc67766@gmail.com

INSERT INTO users (
    wallet_address,
    full_name,
    role,
    department,
    jurisdiction,
    badge_number,
    account_type,
    created_by,
    is_active
) VALUES (
    '0x29bb7718d5c6da6e787deae8fd6bb3459e8539f2', -- Admin wallet address
    'System Administrator',                        -- Admin name
    'admin',
    'Administration',
    'System',
    'ADMIN-001',
    'real',
    'system_setup',
    true
) ON CONFLICT (wallet_address) DO NOTHING;

-- Verify the admin was created
SELECT 
    wallet_address,
    full_name,
    role,
    created_at,
    is_active
FROM users 
WHERE role = 'admin' 
ORDER BY created_at;

-- Show admin count
SELECT COUNT(*) as admin_count 
FROM users 
WHERE role = 'admin' AND is_active = true;