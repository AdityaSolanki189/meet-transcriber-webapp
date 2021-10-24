import { createContext, useEffect, useState } from "react";

import { auth, onAuthStateChanged } from "./config/Firebase";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "./config/Firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { colours } from "./theme/colors";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [theme, setTheme] = useState("LIGHT");

  const modeStyle =
    theme === "LIGHT"
      ? {
          backgroundColor: "white",
          elementBackgroundColor: "white",
          placeholderColor: colours.grey,
          textColor: "black",
        }
      : {
          backgroundColor: "black",
          elementBackgroundColor: "black",
          placeholderColor: colours.blue,
          textColor: "white",
        };

  const navigate = useNavigate();

  async function postUserToDb(email, UID) {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        email: email,
        UID: UID,
      });
      console.log("user added with docID", docRef.id);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  }

  async function signUp(email, password) {
    try {
      setError("");
      setLoading(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      postUserToDb(email, response.user.uid);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
    setLoading(false);
  }

  async function logIn(email, password) {
    try {
      setLoading(true);
      setError("");
      const response = await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
      console.log(response);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
    setLoading(false);
  }

  async function logout() {
    try {
      setLoading(true);
      setError("");
      const response = signOut(auth);
      navigate("/");
      console.log(response);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
        setError,
        setLoading,
        logIn,
        logout,
        modeStyle,
        theme,
        setTheme,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
