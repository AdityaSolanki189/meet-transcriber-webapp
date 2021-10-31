import React from 'react';
import SideMenu from '../components/SideMenu';

import {useContext, useEffect,useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AuthContext} from "../contexts/AuthProvider";
import {Checkbox} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import {collection, getDocs} from "firebase/firestore";
import {auth, onAuthStateChanged, db} from "../config/Firebase";
import { Link } from "react-router-dom";

export default function Meetings() {

    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const {modeStyle, theme, setTheme} = useContext(AuthContext);

    const {groupID} = useParams()

    const [meetings,setMeetings]=useState([])

    async function getMeetings(groupID) {
        try {
            const docsSnapShot = await getDocs(collection(db, "/groups/" + groupID + "/meetings"));

            docsSnapShot.forEach(doc => {

                setMeetings(meetings => [
                    ...meetings,
                    doc.id
                ])

            });
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getMeetings(groupID)
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
                <h1>Your Meetings</h1>
                
                {meetings.length > 0
                    ? meetings.map(meeting => {
                        
                        return <Link
                            to={`/user-groups/${meeting}`}
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
                            }}>{meeting}</h2>
                        </Link>
                    })
                    : <div>Loading Meetings..</div>
                }
             
            </div>
        </div>
    )
}
