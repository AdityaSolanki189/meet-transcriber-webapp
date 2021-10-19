import { createContext, useEffect, useState } from "react";

import { auth, onAuthStateChanged } from "./config/Firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setErorr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function signUp(email, password) {
    try {
      setErorr("");
      setLoading(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/login");

      console.log(response);
    } catch (err) {
      console.log(err);
      setErorr(err.message);
    }
    setLoading(false);
  }

  async function logIn(email, password) {
    try {
      setLoading(true);
      setErorr("");
      const response = await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
      console.log(response);
    } catch (err) {
      console.log(err);
      setErorr(err.message);
    }
    setLoading(false);
  }

  async function logout() {
    try {
      setLoading(true);
      setErorr("");
      const response = signOut(auth);
      navigate("/");
      console.log(response);
    } catch (err) {
      console.log(err);
      setErorr(err.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUp,
        error,
        loading,
        setErorr,
        setLoading,
        logIn,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
