# 🔐 EVID-DGC - Blockchain Evidence Management System

**Secure admin-controlled evidence management system with role-based access control.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![Supabase](https://img.shields.io/badge/Database-Supabase-green)](https://supabase.com/)
[![Deployment](https://img.shields.io/badge/Deploy-Render-blue)](https://render.com/)

**📊 Project Insights**

<table align="center">
    <thead align="center">
        <tr>
            <td><b>🌟 Stars</b></td>
            <td><b>🍴 Forks</b></td>
            <td><b>🐛 Issues</b></td>
            <td><b>🔔 Open PRs</b></td>
            <td><b>🛠️ Languages</b></td>
            <td><b>👥 Contributors</b></td>
        </tr>
     </thead>
    <tbody>
         <tr>
            <td><img alt="Stars" src="https://img.shields.io/github/stars/Gooichand/blockchain-evidence?style=flat&logo=github"/></td>
            <td><img alt="Forks" src="https://img.shields.io/github/forks/Gooichand/blockchain-evidence?style=flat&logo=github"/></td>
            <td><img alt="Issues" src="https://img.shields.io/github/issues/Gooichand/blockchain-evidence?style=flat&logo=github"/></td>
            <td><img alt="Open PRs" src="https://img.shields.io/github/issues-pr/Gooichand/blockchain-evidence?style=flat&logo=github"/></td>
            <td><img alt="Languages Count" src="https://img.shields.io/github/languages/count/Gooichand/blockchain-evidence?style=flat&color=green&logo=github"/></td>
            <td><img alt="Contributors Count" src="https://img.shields.io/github/contributors/Gooichand/blockchain-evidence?style=flat&color=blue&logo=github"/></td>
        </tr>
    </tbody>
</table>

<div align="center">
  <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">
</div>

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=25&pause=1000&color=36BCF7&center=true&vCenter=true&width=600&lines=Welcome+to+EVID-DGC;Secure+Blockchain+Evidence+Management;Role-Based+Access+Control;Immutable+Audit+Logs" alt="Typing SVG" />
</div>

<p align="center">
  <a href="https://evid-dgc.onrender.com"><strong>🌐 Live Website</strong></a>
</p>

---

## ❓ Problem & Solution

### Problem Statement
Digital evidence management often faces challenges like data tampering, lack of a verifiable chain of custody, and inconsistent access control. Traditional systems can be opaque, making it difficult for judicial and investigative bodies to trust the integrity of digital artifacts.

### Solution Overview
**EVID-DGC** addresses these issues by leveraging blockchain-inspired principles and robust role-based access control. By utilizing a secure Supabase backend and providing immutable audit logs, the system ensures that every action—from evidence upload to court review—is tracked and verifiable, maintaining the highest standards of digital forensic integrity.

---

## ✨ Features

- 🔒 **Admin-Only User Management** - Secure user creation by administrators
- 👥 **8 User Roles** - Complete role-based access control system
- 🧪 **Test User System** - Create and login as test users for development
- 📊 **Admin Dashboard** - Comprehensive system oversight and management
- 💾 **Database Storage** - Supabase PostgreSQL backend with RLS
- 📱 **Modern UI** - Professional responsive design with accessibility
- 🔐 **Wallet Integration** - MetaMask blockchain authentication
- 📧 **Email Authentication** - Traditional email/password login option
- 🔍 **Audit Logging** - Complete activity tracking and compliance
- 🌐 **Multi-Platform** - Deploy on Render, Vercel, or Netlify

## 👥 Team Information

### Project Admin
**Gooichand**  
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Gooichand)

### Mentors
| Name | Role | Social Links |
|------|------|--------------|
| **Charu Awasthi** | Lead Mentor | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/Charu19awasthi) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/charu-awasthi-6312b6293/) |
| **Pragati Gaykwad** | Technical Mentor | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/PG-bit997) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pragati-gaykwad/) |

---

## 🛠️ Technical Info

### Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Socket.IO Client
- **Backend**: Node.js, Express.js, Socket.IO
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Tools**: Sharp (Image processing), PDF-Lib (Watermarking), Lucide Icons
- **Deployment**: Render

### User Roles
The system implements 8 distinct roles to ensure strict access control:
1. **Public Viewer**: Browse public case information.
2. **Investigator**: Handle case creation and evidence uploads.
3. **Forensic Analyst**: Perform technical analysis and generate reports.
4. **Legal Professional**: Conduct legal reviews of cases and evidence.
5. **Court Official**: Manage judicial proceedings and scheduling.
6. **Evidence Manager**: Maintain the chain of custody and storage integrity.
7. **Auditor**: Oversee system compliance and review audit logs.
8. **Administrator**: Full system oversight, user management, and configuration.

---

## 📁 Folder Structure

```text
├── build/                    # Compiled contracts and build artifacts
├── contracts/               # Solidity smart contracts
├── docs/                    # Detailed project documentation
├── public/                  # Frontend assets (HTML, JS, CSS)
│   ├── dashboard-*.html    # Role-specific dashboard views
│   ├── app.js              # Core frontend logic
│   └── styles.css          # Global styling
├── server.js                # Express backend server with Socket.IO
├── complete-database-setup.sql # Complete core database structure
├── evidence-tagging-schema.sql # Tags system database schema
├── evidence-export-schema.sql  # Export system database schema
├── REAL_TIME_NOTIFICATIONS.md # Notifications implementation details
├── render.yaml              # Deployment configuration for Render
├── package.json             # Node.js dependencies and scripts
├── SECURITY.md              # Security policy and reporting
└── README.md                # Project documentation
```

---

## 📚 Documentation

### Quick Links
- 🚀 [Quick Start](#-how-to-run-locally)
- 📖 [Complete Documentation](#-complete-documentation)
- 🔧 [API Reference](docs/API_DOCUMENTATION.md)
- 👥 [User Roles Guide](docs/USER_ROLES.md)
- 🚨 [Troubleshooting](docs/TROUBLESHOOTING.md)
- 🤝 [Contributing](Contributing.md)

### Complete Documentation

| Topic | Description | Link |
|-------|-------------|------|
| **Environment Setup** | Configure .env variables and Supabase | [📄 Environment Setup](docs/ENVIRONMENT_SETUP.md) |
| **Blockchain Config** | Network setup and MetaMask configuration | [⛓️ Blockchain Setup](docs/BLOCKCHAIN_SETUP.md) |
| **Local Development** | Development environment and workflow | [💻 Local Development](docs/LOCAL_DEVELOPMENT.md) |
| **Deployment Guide** | Deploy to Render, Vercel, or Netlify | [🚀 Deployment](docs/DEPLOYMENT.md) |
| **API Documentation** | Complete API reference and examples | [📡 API Docs](docs/API_DOCUMENTATION.md) |
| **User Roles** | Roles, permissions, and access control | [👤 User Roles](docs/USER_ROLES.md) |
| **Troubleshooting** | Common issues and solutions | [🔧 Troubleshooting](docs/TROUBLESHOOTING.md) |
| **Contributing** | How to contribute to the project | [🤝 Contributing](Contributing.md) |

---

## 🚀 How to Run Locally

### Prerequisites
- **Node.js** (v16 or higher)
- **MetaMask** browser extension
- **Supabase** account

### 1. Environment Setup
```bash
# Clone repository
git clone https://github.com/Gooichand/blockchain-evidence.git
cd blockchain-evidence

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your Supabase credentials
```

### 2. Database Setup
```sql
-- Run in Supabase SQL Editor:
-- 1. Execute complete-database-setup.sql
-- 2. Note: You can edit the initial admin wallet address at the end of the file before running.
```

### 3. Start Application
```bash
# Full system (API + Frontend)
npm start

# Frontend only (development)
cd public && python -m http.server 8080
```

---

## ⭐ Support & Star
If you find this project helpful, please consider giving it a **Star**! It helps others discover the project and keeps the maintainers motivated.

---

## 💬 Suggestions & Feedback
We value your feedback! If you have suggestions for new features or have found a bug, please:
- Open an [Issue](https://github.com/Gooichand/blockchain-evidence/issues)
- Join the discussion in [Discussions](https://github.com/Gooichand/blockchain-evidence/discussions)

---

## 🤝 Contribution Guidelines
Contributions are welcome! Please read our [Contributing.md](Contributing.md) for details on our code of conduct and the process for submitting pull requests.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📜 Code of Conduct
We are committed to providing a friendly, safe, and welcoming environment. Please review our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

<p align="right"><a href="#-evid-dgc---blockchain-evidence-management-system">Back to Top ↑</a></p>
