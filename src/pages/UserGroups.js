import React from 'react'
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/AuthProvider";
import {Checkbox} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SideMenu from '../components/SideMenu'
import {Link} from "react-router-dom";
import {auth, onAuthStateChanged, db} from "../config/Firebase";
import {doc, getDoc} from "firebase/firestore";
import {collection, getDocs} from "firebase/firestore";

export default function UserGroups() {

    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const {modeStyle, theme, setTheme} = useContext(AuthContext);

    const [myGroups,
        setMyGroups] = useState([]);

    async function getMyGroups(email) {
        try {
            const docsSnapShot = await getDocs(collection(db, "/users/" + email + "/mygroups"));

            console.log(docsSnapShot)

            docsSnapShot.forEach(doc => {

                setMyGroups(myGroups => [
                    ...myGroups,
                    doc.id
                ])

            });

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getMyGroups(localStorage.getItem("userEmail"))

    }, [])

    return (
        <div className="Page-wrapper">
            <div className="Page-nav">
                <SideMenu/>
            </div>
            <div className="Page-main">
                {" "}
                <div style={{
                    textAlign: "right"
                }}>
                    {" "}
                    <Checkbox
                        icon={< DarkModeOutlinedIcon />}
                        checkedIcon={< DarkModeIcon />}
                        onChange={() => {
                        theme === "LIGHT"
                            ? setTheme("DARK")
                            : setTheme("LIGHT");
                    }}
                        sx={{
                        margin: "1rem"
                    }}/>
                </div>

                <h1>Here are your Groups:</h1>

                {console.log(myGroups)}

                {myGroups.length > 0
                    ? myGroups.map(group => {
                        console.log(group, "at 75")
                        return <Link
                            to={`/user-groups/${group}`}
                            style={{
                            textDecoration: "none",
                            color: "black"
                        }}>
                            <h2
                                style={{
                                margin: "1rem auto",
                                cursor: "pointer",
                                border: "1px grey solid",
                                padding: "1rem",
                                width: "50%",
                                boxShadow: "#dccaca 5px 5px 5px",
                                borderRadius: "10px"
                            }}>{group}</h2>
                        </Link>
                    })
                    : myGroups.length === 0
                        ? <h2 style={{position:"fixed",top:"50%",left:"50%"}}>There are no groups yet :(</h2>
                        : <div>Loading groups..</div>
}

            </div>

        </div>
    )
}