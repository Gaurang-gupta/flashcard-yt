// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAdkWomiDU-UYp_jqMA8AtXFtUVmyKZ3iQ",
  authDomain: "flashcard-yt.firebaseapp.com",
  projectId: "flashcard-yt",
  storageBucket: "flashcard-yt.firebasestorage.app",
  messagingSenderId: "87903329571",
  appId: "1:87903329571:web:7aee0179586fe11e090096"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }