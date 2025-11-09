import React, { createContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile , 
  GoogleAuthProvider , signInWithEmailAndPassword, onAuthStateChanged ,  sendPasswordResetEmail , signOut , signInWithPopup} from "firebase/auth";
import app from '../Firebase/firebase.config';

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
         setLoading(false);
      });
       return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const updateUser=(updatedData)=> {
        return updateProfile(auth.currentUser , updatedData);
     }

    const resetPassword = (email) => {
       setLoading(true);
       return sendPasswordResetEmail(auth, email).finally(() => setLoading(false));
    };

     const logOut = () => {
       return signOut(auth);
     }

    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
          .finally(() => setLoading(false));
    };

  const authData = {
      user,
      loading,
      setUser,
      createUser,
      signIn,
      resetPassword,
      logOut,
      updateUser,
      signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;