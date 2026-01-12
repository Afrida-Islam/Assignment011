import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config.js";
import { AuthContext } from "./AuthContext";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    }
    return Promise.reject(
      new Error("No user is currently signed in to update profile.")
    );
  };

  // Monitor Auth State Change
 // Monitor Auth State Change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("CurrentUser-->", currentUser?.email);
      
      if (currentUser) {
        // ১. Firebase থেকে বর্তমান ইউজারের টোকেনটি নিন
        const token = await currentUser.getIdToken();
        
        // ২. টোকেনটি localStorage-এ সেভ করুন
        localStorage.setItem("access-token", token);
        
        setUser(currentUser);
      } else {
        // ৩. ইউজার লগআউট করলে টোকেনটি রিমুভ করে দিন
        localStorage.removeItem("access-token");
        setUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Loading indicator
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px", fontSize: "20px" }}>
        Checking Authentication...
      </div>
    );
  }

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
