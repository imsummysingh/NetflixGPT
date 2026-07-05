// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjEdWVZraeKIal3nGjjU8v-MIwz7MdiJg",
  authDomain: "netflixgpt-28055.firebaseapp.com",
  projectId: "netflixgpt-28055",
  storageBucket: "netflixgpt-28055.firebasestorage.app",
  messagingSenderId: "418185455767",
  appId: "1:418185455767:web:f3fc8f68559fd4d5dca1d2",
  measurementId: "G-HWLQEEL0FQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();