// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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