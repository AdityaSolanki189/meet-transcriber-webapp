import React from 'react';
import SideMenu from '../components/SideMenu';
import AddIcon from '@mui/icons-material/Add';
import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AuthContext} from "../contexts/AuthProvider";
import {Checkbox, InputLabel} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import {collection, getDocs} from "firebase/firestore";
import {auth, onAuthStateChanged, db} from "../config/Firebase";
import {Link} from "react-router-dom";
import Fab from '@mui/material/Fab';

export default function Meetings() {

    const {currentUser, postNewMeetDB} = useContext(AuthContext);
    const navigate = useNavigate();
    const {modeStyle, theme, setTheme} = useContext(AuthContext);
    const {groupID} = useParams()
    const [meetings,
        setMeetings] = useState([])
    const [meetId,
        setMeetId] = useState('');
    const [errorMsg,
        setErrorMsg] = useState('');
    const [addIcon,
        setAddIcon] = useState(false);
    const [onSubmit,
        setOnSubmit] = useState(false);
    const [inputText,
        setInputText] = useState("");
    const [meetLink,
        setMeetLink] = useState("");
    const [meetTitle,
        setMeetTitle] = useState("");

    async function getMeetings(groupID) {
        try {
            const docsSnapShot = await getDocs(collection(db, "/groups/" + groupID + "/meetings"));

            docsSnapShot.forEach(doc => {

                setMeetings(meetings => [
                    ...meetings,
                    doc.data().title
                ])

            });
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getMeetings(groupID)
    }, [])

    const submitMeetHandler = (e) => {
        //e.preventDefault();
        if (inputText === '') {
            setErrorMsg("Please Enter the Meet Link");
            console.log("Please Enter the Meet Link");
        } else if (inputText.indexOf('https://meet.google.com/') !== -1 && inputText.length === 36) {
            console.log("Good Link!");
            //setMeetLink(inputText);
            let link1 = inputText;
            let code = inputText.substr(-12);
            //setMeetId(code);
            console.log("Submitted ", code);

            setOnSubmit(true);
            postNewMeetDB(link1, meetTitle, groupID, code);

            //navigate(`/user-groups/${groupID}`);
        } else {
            console.log("Wrong Format");
            setErrorMsg('Please Enter the link in this format : https://meet.google.com/xxx-yyyy-zzz');
        }
    }

    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    };

    const meetTitleHandler = (e) => {
        setMeetTitle(e.target.value);
    };

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
                            to={`/user-groups/${groupID}/${meeting}`}
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
                <Fab
                    color="primary"
                    id="add-group"
                    onClick={() => {
                    addIcon
                        ? setAddIcon(false)
                        : setAddIcon(true);
                }}>
                    <AddIcon/>
                </Fab>

                <div className="createMeeting">
                    {addIcon ?
                        <div className="create">
                            <form onSubmit={submitMeetHandler}>
                                <h2>Adding a New Meeting</h2>

                                <InputLabel>Meeting Link</InputLabel>
                                <input
                                    required
                                    value={inputText}
                                    onChange={inputTextHandler}
                                    type="text"
                                    placeholder="Enter Meet Link..."
                                    className="meet-input"/>

                                <InputLabel>Meeting Title</InputLabel>
                                <input
                                    required
                                    value={meetTitle}
                                    onChange={meetTitleHandler}
                                    type="text"
                                    placeholder="Enter Meet Title..."
                                    className="meet-input"/>

                                
                                <button >
                                    Create New Meeting
                                </button>
                                <br />
                                {errorMsg}
                            </form>
                        </div> : 
                        <div className="onHide"></div>}
                </div>
            </div>
        </div>
    )
}
