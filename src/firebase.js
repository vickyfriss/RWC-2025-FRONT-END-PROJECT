// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // <-- Import auth
import { getAnalytics } from "firebase/analytics";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDuUGRiTrEx_BrUKR7AaIOqpknuCGM6Rr8",
  authDomain: "rwc2025-vfk.firebaseapp.com",
  projectId: "rwc2025-vfk",
  storageBucket: "rwc2025-vfk.firebasestorage.app",
  messagingSenderId: "928797726445",
  appId: "1:928797726445:web:6254a86411d4eba18bdee4",
  measurementId: "G-LZ6RTJN2Z7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
