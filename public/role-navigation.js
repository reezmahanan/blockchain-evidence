/**
 * Role-Based Navigation System
 * @fileoverview Dynamic navigation based on user roles
 * @author EVID-DGC Team
 * @version 1.0.0
 */

/**
 * Navigation configurations for each role
 */
const ROLE_NAVIGATIONS = {
    // Public Viewer - Limited Access
    1: {
        name: 'Public Viewer',
        icon: 'eye',
        items: [
            { label: 'Dashboard', icon: 'home', href: 'dashboard-public.html' },
            { label: 'Cases', icon: 'folder', href: 'cases-public.html' },
            { label: 'Evidence', icon: 'file-text', href: 'evidence-public.html', badge: 'View Only' },
            { label: 'Search', icon: 'search', href: 'search-public.html' },
            { label: 'Help', icon: 'help-circle', href: 'help.html' }
        ]
    },
    
    // Investigator - Investigation-Focused
    2: {
        name: 'Investigator',
        icon: 'search',
        items: [
            { label: 'Dashboard', icon: 'home', href: 'dashboard-investigator.html' },
            { label: 'My Cases', icon: 'folder-open', href: 'my-cases.html' },
            { label: 'Evidence', icon: 'upload', href: 'evidence-manager.html' },
            { label: 'Chain of Custody', icon: 'link', href: 'chain-custody.html' },
            { label: 'Reports', icon: 'file-text', href: 'reports.html' },
            { label: 'Search', icon: 'search', href: 'search.html' },
            { label: 'Help', icon: 'help-circle', href: 'help.html' }
        ]
    },
    
    // Forensic Analyst - Analysis-Focused
    3: {
        name: 'Forensic Analyst',
        icon: 'microscope',
        items: [
            { label: 'Dashboard', icon: 'home', href: 'dashboard-analyst.html' },
            { label: 'Evidence', icon: 'file-search', href: 'evidence-analysis.html' },
            { label: 'Analysis Tools', icon: 'cpu', href: 'analysis-tools.html' },
            { label: 'Cases', icon: 'folder', href: 'assigned-cases.html' },
            { label: 'Reports', icon: 'file-text', href: 'forensic-reports.html' },
            { label: 'Blockchain Verification', icon: 'shield-check', href: 'blockchain-verify.html' },
            { label: 'Help', icon: 'help-circle', href: 'help.html' }
        ]
    },
    
    // Legal Professional - Legal Review
    4: {
        name: 'Legal Professional',
        icon: 'scale',
        items: [
            { label: 'Dashboard', icon: 'home', href: 'dashboard-legal.html' },
            { label: 'Cases', icon: 'briefcase', href: 'legal-cases.html' },
            { label: 'Evidence', icon: 'file-check', href: 'evidence-review.html' },
            { label: 'Legal Documents', icon: 'file-plus', href: 'legal-docs.html' },
            { label: 'Chain of Custody', icon: 'link', href: 'custody-legal.html' },
            { label: 'Reports', icon: 'file-text', href: 'legal-reports.html' },
            { label: 'Compliance', icon: 'check-circle', href: 'compliance.html' },
            { label: 'Help', icon: 'help-circle', href: 'help.html' }
        ]
    },
    
    // Court Official - Court Operations
    5: {
        name: 'Court Official',
        icon: 'building',
        items: [
            { label: 'Dashboard', icon: 'home', href: 'dashboard-court.html' },
            { label: 'Court Cases', icon: 'gavel', href: 'court-cases.html' },
            { label: 'Evidence', icon: 'file-text', href: 'court-evidence.html' },
            { label: 'Proceedings', icon: 'calendar', href: 'proceedings.html' },
            { label: 'Documents', icon: 'file-stack', href: 'court-docs.html' },
            { label: 'Scheduling', icon: 'clock', href: 'scheduling.html' },
            { label: 'Reports', icon: 'file-text', href: 'court-reports.html' },
            { label: 'Help', icon: 'help-circle', href: 'help.html' }
        ]
    },
    
    // Evidence Manager - Lifecycle Management
    6: {
        name: 'Evidence Manager',
        icon: 'clipboard-list',
        items: [
            { label: 'Dashboard', icon: 'home', href: 'dashboard-manager.html' },
            { label: 'Evidence', icon: 'package', href: 'evidence-manager.html' },
            { label: 'Cases', icon: 'folder', href: 'manager-cases.html' },
            { label: 'Inventory', icon: 'warehouse', href: 'inventory.html' },
            { label: 'Chain of Custody', icon: 'link', href: 'chain-custody.html' },
            { label: 'Requests', icon: 'inbox', href: 'evidence-requests.html' },
            { label: 'Reports', icon: 'file-text', href: 'manager-reports.html' },
            { label: 'Audit Trail', icon: 'activity', href: 'audit-trail.html' },
            { label: 'Help', icon: 'help-circle', href: 'help.html' }
        ]
    },
    
    // Auditor - Compliance & Auditing
    7: {
        name: 'Auditor',
        icon: 'audit',
        items: [
            { label: 'Dashboard', icon: 'home', href: 'dashboard-auditor.html' },
            { label: 'Audit Trail', icon: 'activity', href: 'audit-trail.html' },
            { label: 'Compliance', icon: 'check-square', href: 'compliance.html' },
            { label: 'Cases', icon: 'folder', href: 'audit-cases.html' },
            { label: 'Evidence', icon: 'file-search', href: 'audit-evidence.html' },
            { label: 'Chain of Custody', icon: 'link', href: 'custody-audit.html' },
            { label: 'Reports', icon: 'file-text', href: 'audit-reports.html' },
            { label: 'Blockchain Verification', icon: 'shield-check', href: 'blockchain-verify.html' },
            { label: 'Help', icon: 'help-circle', href: 'help.html' }
        ]
    },
    
    // Administrator - Full System Access
    8: {
        name: 'Administrator',
        icon: 'crown',
        items: [
            { label: 'Dashboard', icon: 'home', href: 'admin.html' },
            { label: 'Users & Roles', icon: 'users', href: 'user-management.html' },
            { label: 'Cases', icon: 'folder', href: 'admin-cases.html' },
            { label: 'Evidence', icon: 'database', href: 'admin-evidence.html' },
            { label: 'Settings', icon: 'settings', href: 'system-settings.html' },
            { label: 'Reports', icon: 'bar-chart', href: 'admin-reports.html' },
            { label: 'System', icon: 'server', href: 'system-admin.html' },
            { label: 'Audit', icon: 'activity', href: 'system-audit.html' },
            { label: 'Help', icon: 'help-circle', href: 'help.html' }
        ]
    }
};

/**
 * Generate role-based navigation HTML
 * @param {number|string} userRole - User's role ID or string
 * @param {string} currentUser - Current user identifier
 * @returns {string} Navigation HTML
 */
function generateRoleNavigation(userRole, currentUser = '') {
    const roleConfig = ROLE_NAVIGATIONS[userRole];
    
    if (!roleConfig) {
        return generateDefaultNavigation();
    }
    
    const navItems = roleConfig.items.map(item => {
        const badge = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
        return `
            <a href="${item.href}" class="nav-link">
                <i data-lucide="${item.icon}"></i>
                <span>${item.label}</span>
                ${badge}
            </a>
        `;
    }).join('');
    
    const userInfo = currentUser ? `
        <div class="nav-user-info">
            <div class="user-role-badge">
                <i data-lucide="${roleConfig.icon}"></i>
                <span>${roleConfig.name}</span>
            </div>
            <div class="user-id">${truncateUser(currentUser)}</div>
        </div>
    ` : '';
    
    return `
        <header class="role-nav-header">
            <div class="role-nav-container">
                <div class="nav-brand">
                    <i data-lucide="shield-check" class="brand-icon"></i>
                    <span>EVID-DGC</span>
                </div>
                
                <nav class="role-nav-menu">
                    ${navItems}
                </nav>
                
                <div class="nav-right">
                    ${userInfo}
                    <div class="profile-dropdown">
                        <button class="profile-btn" onclick="toggleProfileMenu()">
                            <i data-lucide="user"></i>
                            <span>Profile</span>
                            <i data-lucide="chevron-down"></i>
                        </button>
                        <div class="profile-menu" id="profileMenu">
                            <a href="profile.html" class="profile-item">
                                <i data-lucide="user"></i>
                                <span>My Profile</span>
                            </a>
                            <a href="settings.html" class="profile-item">
                                <i data-lucide="settings"></i>
                                <span>Settings</span>
                            </a>
                            <hr class="profile-divider">
                            <button onclick="logout()" class="profile-item logout-item">
                                <i data-lucide="log-out"></i>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    `;
}

/**
 * Generate default navigation for non-authenticated users
 */
function generateDefaultNavigation() {
    return `
        <header class="header-nav">
            <div class="navbar-container">
                <div class="nav-brand">
                    <i data-lucide="shield-check" class="brand-icon"></i>
                    <span>EVID-DGC</span>
                </div>
                <nav class="nav-menu">
                    <a href="index.html" class="nav-link">
                        <i data-lucide="home"></i>
                        <span>Home</span>
                    </a>
                    <button class="nav-login-btn" onclick="window.location.href='index.html#login-options'">
                        <i data-lucide="log-in"></i>
                        <span>Login</span>
                    </button>
                </nav>
            </div>
        </header>
    `;
}

/**
 * Truncate user identifier for display
 */
function truncateUser(user) {
    if (user.startsWith('0x')) {
        return user.slice(0, 6) + '...' + user.slice(-4);
    }
    if (user.includes('@')) {
        return user.split('@')[0];
    }
    return user.length > 12 ? user.slice(0, 12) + '...' : user;
}

/**
 * Toggle profile dropdown menu
 */
function toggleProfileMenu() {
    const menu = document.getElementById('profileMenu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

/**
 * Initialize role-based navigation
 */
function initializeRoleNavigation() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;
    
    let userRole = null;
    let userData = null;
    
    // Get user data based on login type
    if (currentUser.startsWith('email_')) {
        userData = JSON.parse(localStorage.getItem('evidUser_' + currentUser) || '{}');
    } else {
        userData = JSON.parse(localStorage.getItem('evidUser_' + currentUser) || '{}');
    }
    
    userRole = userData.role;
    
    if (userRole && ROLE_NAVIGATIONS[userRole]) {
        const navHTML = generateRoleNavigation(userRole, currentUser);
        
        // Replace existing navigation
        const existingNav = document.querySelector('.header-nav, .role-nav-header');
        if (existingNav) {
            existingNav.outerHTML = navHTML;
            
            // Re-initialize Lucide icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.RoleNavigation = {
        generateRoleNavigation,
        initializeRoleNavigation,
        toggleProfileMenu,
        ROLE_NAVIGATIONS
    };
}