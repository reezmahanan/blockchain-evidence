# Secure Admin Provisioning for Production

To provision an Administrator account securely, follow one of these approaches:

## 1. Manual Database Insertion (Recommended for Initial Setup)
- Only a trusted operator (e.g., system owner) should perform this step.
- Insert an admin user directly into the `users` table in Supabase with the desired credentials and role set to `admin`.
- Example SQL (replace values as needed):

```sql
INSERT INTO users (email, password_hash, full_name, role, department, jurisdiction, auth_type, account_type, created_by, is_active, email_verified)
VALUES (
  'admin@example.com',
  '<hashed_password>',
  'System Administrator',
  'admin',
  'IT',
  'Global',
  'email',
  'real',
  'manual_provision',
  true,
  true
);
```
- Use the same password hashing function as the app (or register as a lower role, then update the role to 'admin' in the DB).

## 2. Admin Invite Workflow (Optional for Advanced Security)
- Build an invite-only system where only existing admins can invite new admins.
- Store pending invites in a table, and only allow registration with a valid invite token.

## 3. Approval Workflow (Optional)
- Store admin registration requests as 'pending' and require approval by an existing admin before activation.

---
**Never allow public registration of the admin role.**

For more details, see the security section in your project documentation.
