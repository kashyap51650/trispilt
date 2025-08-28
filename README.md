# 💰 TriSpilt - Group Finance Management PWA

<div align="center">
  <img src="./public/3dicons-wallet.png" alt="TriSpilt Logo" width="120" height="120" />
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Firebase](https://img.shields.io/badge/Firebase-10.0-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
  [![PWA](https://img.shields.io/badge/PWA-Ready-purple?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)
</div>

---

## 🎯 Problem Statement

**Current Situation:**

- 🤝 You and your friends (Yash, Chirag, and you) contribute **₹2000 each monthly** to a shared bank account
- 💳 All shared expenses and incomes are managed via this account
- 📈 Monthly mutual fund investments are made from this account
- 📊 Everything is tracked in **Excel** - which is manual and limited
- 🔄 Need to replace Excel with a **PWA** for better money management

---

## 🚀 High-Level Solution

A **shared finance tracker PWA** that provides:

🔹 **Cross-Platform Access** - Mobile & Desktop (installable like an app)  
🔹 **Multi-User Support** - Track contributions from all 3 friends  
🔹 **Comprehensive Tracking** - Expenses, incomes, investments, and balances  
🔹 **Rich Reporting** - Visual reports and history  
🔹 **Lightweight & Private** - Not a big SaaS tool, just what you need

---

## ✨ Core Features

### 👥 1. User & Account Management

- 🔐 **Simple Authentication** - Google/Email login
- 👤 **Member Dashboard** - Each member can see contribution status
- 🏠 **Shared Account View** - Unified financial overview

### 💸 2. Monthly Contributions

- 📅 **Contribution Tracking** - Record ₹2000 from each member
- ✅ **Status Monitoring** - Who paid, who is pending
- 🧮 **Auto Calculation** - Total monthly pool computation

### 🛒 3. Expenses Tracking

- ➕ **Add Expenses** - Title, category, amount, paid by account
- 📋 **Expense History** - Complete transaction records
- 🏷️ **Categorization** - Food, project, travel, utilities, etc.
- 👥 **Group vs Personal** - Tag expenses appropriately

### 💰 4. Income Tracking

- 📈 **Income Recording** - Website earnings, side projects
- 🏢 **Source Tracking** - Freelance, investment returns, etc.
- 📅 **Date & Category** - Organized income management

### 📊 5. Investments Tracking

- 🎯 **Mutual Fund SIPs** - Track monthly investments
- 💹 **Returns Monitoring** - Manual return updates
- 📋 **Portfolio Summary** - Overall investment overview

### 📈 6. Balance & Reports

- 💳 **Current Balance** - Real-time account status (inflow - outflow)
- 📊 **Balance Breakdown**:
  - 💵 Available Cash
  - 📈 Invested Amount
- 📉 **Detailed Reports**:
  - 📅 Monthly contributions vs expenses
  - 📈 Savings trendline
  - 🥧 Expense categories pie chart
  - 📊 Investment performance

### 🔔 7. Notifications & Reminders

- ⏰ **Contribution Reminders** - Notify pending contributions
- 📱 **SIP Notifications** - Mutual fund deduction alerts
- 📈 **Balance Updates** - Real-time financial status

---

## 🛠️ Tech Stack

### Frontend

- ⚛️ **Next.js 15.4.6** - React framework with App Router
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📱 **PWA** - Progressive Web App capabilities
- 🎭 **Framer Motion** - Smooth animations
- 📊 **Recharts** - Data visualization

### Backend & Database

- 🔥 **Firebase** - Authentication & Firestore database
- 🔐 **Firebase Auth** - Secure user authentication
- 📦 **Firestore** - NoSQL database for real-time data

### Development Tools

- 🔷 **TypeScript** - Type-safe development
- 🎯 **ESLint** - Code linting
- 🔍 **React Query** - Data fetching & state management
- 📝 **React Hook Form** - Form management
- ✅ **Zod** - Schema validation

---

## 🎨 Features Showcase

### 💳 Dashboard Overview

```
┌─────────────────────────────────────┐
│  💰 Current Balance: ₹45,230       │
│  📊 Monthly Pool: ₹6,000           │
│  📈 Invested: ₹25,000              │
│  💸 This Month Expenses: ₹12,450   │
└─────────────────────────────────────┘
```

### 📊 Contribution Status

```
┌─────────────────────────┐
│  ✅ You: ₹2,000 (Paid)  │
│  ✅ Yash: ₹2,000 (Paid) │
│  ⏳ Chirag: Pending     │
└─────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- 📦 **Node.js** 18+
- 📱 **npm/yarn/pnpm**
- 🔥 **Firebase Project**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/kashyap51650/trispilt.git
cd group-finance-management
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Environment Setup**

```bash
cp .env.example .env.local
# Add your Firebase configuration
```

4. **Run development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open in browser**

```
http://localhost:3000
```

---

## 📱 PWA Installation

### On Mobile (Android/iOS)

1. 📱 Open the app in your mobile browser
2. 🔽 Tap the "Add to Home Screen" option
3. 📲 Install as a native-like app

### On Desktop

1. 💻 Open in Chrome/Edge
2. ⬇️ Click the install button in the address bar
3. 🖥️ Use like a desktop application

---

## 🎯 Project Structure

```
📦 group-finance-management/
├── 📱 app/                    # Next.js App Router
│   ├── 🔒 (private-routes)/   # Protected routes
│   │   ├── 📊 dashboard/      # Main dashboard
│   │   ├── 💸 transactions/   # Transaction management
│   │   ├── 🤝 contributions/  # Contribution tracking
│   │   ├── 📈 investments/    # Investment portfolio
│   │   └── 👤 profile/       # User profile
│   └── 🌐 (public-routes)/    # Public routes
├── 🧩 components/             # Reusable UI components
├── 🎣 hooks/                  # Custom React hooks
├── 🔧 lib/                    # Utility libraries
├── 📝 types/                  # TypeScript type definitions
├── 🎨 public/                 # Static assets
└── 📊 schema/                 # Data validation schemas
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 **Push** to the branch (`git push origin feature/AmazingFeature`)
5. 🔄 **Open** a Pull Request

---

## 📋 Roadmap

### Phase 1 - Core Functionality ✅

- [x] 👥 User authentication
- [x] 💸 Basic expense tracking
- [x] 🤝 Contribution management
- [x] 📱 PWA setup

### Phase 2 - Enhanced Features 🚧

- [ ] 📊 Advanced reporting
- [ ] 📈 Investment tracking
- [ ] 🔔 Push notifications
- [ ] 💹 Real-time sync

### Phase 3 - Advanced Features 🔮

- [ ] 🤖 AI expense categorization
- [ ] 📸 Receipt scanning
- [ ] 💱 Multi-currency support
- [ ] 🔗 Bank integration

---

## 📞 Support

If you encounter any issues or have questions:

- 🐛 **Report Bugs**: [Create an issue](https://github.com/kashyap51650/trispilt/issues)
- 💡 **Feature Requests**: [Submit a feature request](https://github.com/kashyap51650/trispilt/issues)
- 📧 **Contact**: kashyap51650@gmail.com

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- 👥 **Team Members**: You, Yash, and Chirag
- ⚛️ **Next.js Team** - Amazing React framework
- 🔥 **Firebase** - Reliable backend services
- 🎨 **Tailwind CSS** - Beautiful styling framework

---

<div align="center">
  <img src="./public/3dicons-rupee.png" alt="Rupee Icon" width="60" height="60" />
  
  **Made with ❤️ for better financial management**
  
  ⭐ **Star this repo if you find it helpful!**
</div>
