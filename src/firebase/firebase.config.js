// firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9D41cPMVfsk3nkvAl4L9eWlqwcxK-vZo",
  authDomain: "simple-firebase-auth-f61c5.firebaseapp.com",
  projectId: "simple-firebase-auth-f61c5",
  storageBucket: "simple-firebase-auth-f61c5.firebasestorage.app",
  messagingSenderId: "538500696563",
  appId: "1:538500696563:web:003abddcb96b9fffcf6a86",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default auth;
