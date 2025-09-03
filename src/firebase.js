// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Done: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAcH_RgzrHZOqlPXdYUA-ZvvIZs1Ir6EBc",
  authDomain: "gambling-tracker-fa015.firebaseapp.com",
  projectId: "gambling-tracker-fa015",
  storageBucket: "gambling-tracker-fa015.firebasestorage.app",
  messagingSenderId: "779567983860",
  appId: "1:779567983860:web:4e450cb4dc5b3a7b7702a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore instances for use in the app
export const auth = getAuth(app);
export const db = getFirestore(app);