// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-next-e5030.firebaseapp.com",
  projectId: "x-next-e5030",
  storageBucket: "x-next-e5030.appspot.com",
  messagingSenderId: "757029402036",
  appId: "1:757029402036:web:e001f85493a16ec642aee1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);