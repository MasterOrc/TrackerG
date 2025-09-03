# TrackerG Roadmap

## ✅ Completed Tasks
- Project bootstrapped with Create React App
- Firebase integration (Firestore & Authentication)
- Basic user authentication (register, login, logout)
- User registration and login UI
- Add new bet via form (GamblingForm)
- Store bets in Firestore, associated with user
- Basic dashboard (shows total bets, amount wagered, net result)
- Table view of all bets (GamblingTable component)
- Project organized into modular components
- Basic error handling for form submissions

---

## 🚧 Tasks To Be Done

### Core Functionality
- [ ] Fetch and display only the currently logged-in user’s bets
- [ ] Edit existing bets
- [ ] Delete existing bets
- [ ] Add loading indicators during async actions (fetching, submitting, etc.)
- [ ] Better error handling and user feedback for all async processes

### UI/UX Improvements
- [ ] Improve page and component styling (consider Material UI, Bootstrap, or custom CSS)
- [ ] Ensure mobile responsiveness
- [ ] Add navigation (dashboard, bets list, add bet, login/logout) with React Router
- [ ] Clearer feedback on successful actions (e.g., "Bet added!" notification)

### Code Quality & Structure
- [ ] Move to Context API or Redux for global user and bet state management
- [ ] Add PropTypes or migrate to TypeScript for type safety
- [ ] Restructure components for better separation of logic/presentation if needed
- [ ] Write unit and integration tests for key components and flows

### Security & Data Integrity
- [ ] Set up Firebase Firestore security rules to ensure users can only access their own bets
- [ ] Validate and sanitize all input fields
- [ ] Add password reset and email verification options

---

## 🌟 Optional / Future Enhancements

- [ ] Advanced stats: charts, win/loss streaks, breakdown by bet type, etc.
- [ ] Add bet categories/types with dropdowns or tags
- [ ] Allow users to export their bets (CSV/JSON)
- [ ] Import bets from other sources
- [ ] Dark mode toggle
- [ ] Social features: share stats, leaderboards, etc.
- [ ] Enable deployment (Vercel, Netlify, Firebase Hosting)
- [ ] Enable PWA support for installable/mobile app feel
- [ ] Multi-language support
- [ ] Accessibility improvements
- [ ] In-app notifications (toast/snackbar/popups for actions)
- [ ] Add a demo mode or seed data for new users

---

_Last updated: 2025-09-03_