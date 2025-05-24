import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBKZr9oyLLFNZrcv3cfT6svWdqN6jtbEeQ",
  authDomain: "banking-project-d6cb2.firebaseapp.com",
  projectId: "banking-project-d6cb2",
  storageBucket: "banking-project-d6cb2.appspot.com",
  messagingSenderId: "602805236928",
  appId: "1:602805236928:web:6fcb60ce4b3b8747956925",
  measurementId: "G-TKD80S2QPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export default app; 