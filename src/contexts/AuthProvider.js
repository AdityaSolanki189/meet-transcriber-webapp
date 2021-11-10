import {createContext, useEffect, useState} from "react";

import {auth, onAuthStateChanged, db} from "../config/Firebase";
import {collection, addDoc, setDoc} from "@firebase/firestore";
import {doc, getDoc} from "firebase/firestore";
import firebase from "@firebase/app-compat";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
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

    async function postUserToDb(email, UID, username) {
        try {
            const docRef = await setDoc(doc(db, "users", email), {
                name: username,
                email: email,
                UID: UID
            });
            console.log("user added with docID", docRef.id);
        } catch (err) {
            console.error("Error adding document: ", err);
        }
    }
    async function getUserFromDb() {
        try {
            const docRef = collection(db, "users");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        } catch (err) {
            console.log(err)
        }
    }
    async function updateUserMeetsDB(email, groupName) {

        try {

            const docRef = await setDoc(doc(db, "/users/" + email + "/mygroups/", groupName), {active: true});

            console.log(docRef)

            // console.log("user added with docID", docRef.id);
        } catch (err) {
            console.error("Error adding document: ", err);
        }

    }

    async function addGroupMembersDB(email, name, groupName) {
        try {

            const docRef = await setDoc(doc(db, "/groups/" + groupName + "/members/", email), {
                name: name,
                email: email
            });

            navigate('/user-groups/')

            // console.log("user added with docID", docRef.id);
        } catch (err) {
            console.error("Error adding document: ", err);
        }
    }

    async function postGroupToDb(members, meetLink, meetId, groupName, meetTitle) {
        try {
            //Update each user group
            const docRef = await setDoc(doc(db, "/groups/" + groupName + "/meetings/", meetId), {
                name: "speaker",
                shithespoke: "",
                link: meetLink,
                title: meetTitle
            });
            //Update groups collection
            members.map(user => {
                updateUserMeetsDB(user.email, groupName);
                addGroupMembersDB(user.email, user.name, groupName);
            });

            // console.log("Updated Users Collection!", docRef.id);
        } catch (err) {
            console.error("Error adding document: ", err);
        }
    }
    

    async function postNewMeetDB(meetLink, meetTitle, groupID, meetId) {
        try {

            const docRef = await setDoc(doc(db, "/groups/" + groupID + "/meetings/", meetId), {
                name: "speaker",
                shithespoke: "",
                title: meetTitle,
                link: meetLink
            });

            console.log("Meet Added with docID", docRef.id);
        } catch (err) {
            console.error("Error adding document: ", err);
        }
    }

    async function signUp(email, password, username) {
        try {
            setError("");
            setLoading(true);
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const setDisplayName = await updateProfile(auth.currentUser, {displayName: username});
            postUserToDb(email, response.user.uid, username);
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
            console.log(response.user);
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
            setTheme,
            getUserFromDb,
            postGroupToDb,
            postNewMeetDB
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
