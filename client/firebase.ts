// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ai-flashcards1.firebaseapp.com",
  projectId: "ai-flashcards1",
  storageBucket: "ai-flashcards1.appspot.com",
  messagingSenderId: "188810493733",
  appId: "1:188810493733:web:6b2b77fd1974dcf6e6e4cc",
  measurementId: "G-B8DB42X9T6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
