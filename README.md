# Gambling Tracker (React + Firebase)

This is a simple, beginner-friendly web app to track your gambling stats.  
Built with **React** and **Firebase** (Firestore + Auth), it's secure, mobile-friendly, and accessible from any device.

---

## 🚀 How to use this project

### 1. Prerequisites

- [Node.js & npm](https://nodejs.org/) (LTS version recommended)
- A free [Firebase](https://firebase.google.com/) account

---

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Go to **Build → Authentication** and enable **Email/Password**.
3. Go to **Build → Firestore Database**, click **Create database**, and start in test mode (for now).
4. Go to **Project Settings** (gear icon) → **Your apps** → click web icon (`</>`) and register your app.
5. Copy your **Firebase config**.  
   You will paste this into `src/firebase.js`.

---

### 3. Local Setup

```bash
git clone https://github.com/MasterOrc/TrackerG.git
cd TrackerG
npm install
```

---

### 4. Add Your Firebase Credentials

- Open `src/firebase.js` and **replace the config object** with your own from Firebase Console.

---

### 5. Start the app

```bash
npm start
```

---

### 6. Deploy (Optional)

- You can deploy for free with [Firebase Hosting](https://firebase.google.com/docs/hosting).

---

## 📝 Features

- User Sign Up / Login
- Add new gambling record (date, type, amount, odds, result, notes)
- See all bets in a table
- Dashboard with stats (total bets, net profit/loss)
- Mobile-friendly
- All code is commented for learning

---

## 📁 File Structure

```
TrackerG/
├── public/
├── src/
│   ├── components/
│   ├── firebase.js
│   ├── App.js
│   ├── index.js
│   └── styles.css
├── package.json
└── README.md
```

---

Enjoy! If you need help or want to add features, open an issue or ask!