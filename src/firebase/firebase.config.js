// firebase.config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6VVcApgdGrTzQd8SzLhJdflMHvl9AJAo",
  authDomain: "my-scholarship-app-c504e.firebaseapp.com",
  projectId: "my-scholarship-app-c504e",
  storageBucket: "my-scholarship-app-c504e.firebasestorage.app",
  messagingSenderId: "201491846628",
  appId: "1:201491846628:web:8d8dfccdf2bc2ae6cde3f1",
  measurementId: "G-RP3FBCMZ5N",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getAnalytics(app);

export default app;
