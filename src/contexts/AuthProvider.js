import {createContext, useEffect, useState} from "react";

import {auth, onAuthStateChanged, db} from "../config/Firebase";
import {collection, addDoc} from "@firebase/firestore";

import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {colours} from "../theme/colors";

export const AuthContext = createContext();

export default function AuthContextProvider({children}) {
    const [currentUser,
        setCurrentUser] = useState(localStorage.getItem("userEmail"));
    const [error,
        setError] = useState("");
    const [loading,
        setLoading] = useState(false);
    const [theme,
        setTheme] = useState("LIGHT");

    const modeStyle = theme === "LIGHT"
        ? {
            backgroundColor: "white",
            elementBackgroundColor: "white",
            placeholderColor: colours.grey,
            textColor: "black"
        }
        : {
            backgroundColor: "black",
            elementBackgroundColor: "black",
            placeholderColor: colours.blue,
            textColor: "white",
            subTextColor: colours.lightGray
        };

    const navigate = useNavigate();

    async function postUserToDb(username, email, UID) {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                name: username,
                email: email,
                UID: UID
            });
            console.log("user added with docID", docRef.id);
        } catch (err) {
            console.error("Error adding document: ", err);
        }
    }

    async function signUp(username, email, password) {
        try {
            setError("");
            setLoading(true);
            const response = await createUserWithEmailAndPassword(auth, email, password);
            postUserToDb(username, email, response.user.uid);
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
            localStorage.setItem("userEmail", response.user.email);
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
            console.log(response);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log(" at authProvider use Effect", user);
        });
        //return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider
            value={{
            currentUser,
            setCurrentUser,
            signUp,
            error,
            loading,
            setError,
            setLoading,
            logIn,
            logout,
            modeStyle,
            theme,
            setTheme
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
