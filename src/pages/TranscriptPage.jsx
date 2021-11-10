import React, { useState } from 'react';
import SideMenu from '../components/SideMenu';
import './TranscriptPage.css';

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { Checkbox } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Fab from '@mui/material/Fab';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import editLogo from '../resources/edit.png';
import calendar from '../resources/calendar-logo.png';
import clock from '../resources/clock-logo.png';
import Transcript from '../components/Transcript';
import TranscriptCard from '../components/TranscriptCard';
import { db } from '../config/Firebase';
import { collection, addDoc, setDoc } from "@firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import { query, where, onSnapshot, orderBy, limit , getDocs} from "firebase/firestore";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
// mic.interimResults = true;
mic.lang = "en-US";

export default function TranscriptPage() {

    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { modeStyle, theme, setTheme } = useContext(AuthContext);

    const { meetingID, groupID } = useParams();

    console.log(meetingID, groupID)

    const timestamp = 'Monday, 11:08 AM';
    const meetLength = '2.01';
    const [speakersList, setSpeakers] = useState(['Loading...']);
    
    async function getSpeakers(){
        try{
            const docsSnapShot = await getDocs(collection(db, "/groups/" + groupID + "/members"));

            console.log(docsSnapShot);
            setSpeakers([]);

            docsSnapShot.forEach(doc => {

                setSpeakers(speakersList => [
                    ...speakersList,
                    doc.data().name
                ])

            });
        }
        catch(error){
            console.log(error);
        }
    }


    const [meetingTitle, setMeetingTitle] = useState("Google Meet - Mon,  Oct 25,  2021 at 11:08 am");
    async function getMeetingTitle(){
        try{
            const docSnap = await getDoc(doc(db, "/groups/" + groupID + "/meetings/" + meetingID));
            console.log(docSnap);
            setMeetingTitle(docSnap.data().title);
        }
        catch(err){
            console.log(err);
        }
    }
    

    const [listen,
        setListen] = useState(false);

    const [transcripts,
        setTranscripts] = useState([
        {
            text: "Transcript",
            speaker: "speaker",
            timeStamp: "00.00"
        }
    ]);

    
    const [meetTitle, setBox] = useState(meetingTitle);
    const [TitleBox, setTitle] = useState(false);

    console.log(currentUser,"63")

    async function postTranscriptToDb(text, speaker, timeStamp) {
        try {
            const docRef = await setDoc(doc(db, "groups/" + groupID + "/meetings/" + meetingID + "/transcript", timeStamp), {
                text: text,
                speaker: speaker,
                timeStamp: timeStamp
            });
            console.log(docRef.data());
        } catch (error) {
            console.log(error)
        }
    }

    var html = '';
    for (var i = 0; i < speakersList.length; i++) {
        if (i !== speakersList.length - 1) 
            html += speakersList[i] + ', ';
        else 
            html += speakersList[i];
        }
    useEffect(() => {
        getSpeakers();
        getMeetingTitle();
        

        // (async ()=>{
        //     try{
        //         const activeState=await getDocs(collection(db, "/users/" + currentUser.email + "/mygroups/"+groupID+));
        //     }catch(err){
        //         console.log(err)
        //     }
        // })()

        const handleListen = () => {
            if (listen) {
                setListen(true);
                mic.start();
                mic.onspeechend = () => {
                    console.log("Continue...");
                    try {
                        mic.start();
                    } catch (e) {
                        console.log(e);
                    }
                };
            } else {
                mic.stop();
                setListen(false);
                mic.onend = () => {
                    console.log("Stopped on Click");
                };
            }

            mic.onstart = () => {
                console.log("Mics ON!");
            };

            mic.onresult = (event) => {
                console.log("result incoming")

                const transcriptArray = Array
                    .from(event.results)
                    .map((result) => result[0])
                    .map((result) => result.transcript)

                console.log(transcriptArray[transcriptArray.length - 1]);

                postTranscriptToDb(transcriptArray[transcriptArray.length - 1], currentUser.displayName, new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: "2-digit",
                    second: "2-digit"
                }))

                mic.onerror = (event) => {
                    console.log(event.error);
                };
            };
        };

        handleListen();

        const q = query(collection(db, "groups/" + groupID + "/meetings/" + meetingID + "/transcript"), orderBy('timeStamp', 'desc'), limit(1));




        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            querySnapshot.forEach((doc) => {
                console.log(doc.id, " ", doc.data(), "...hmm")

                if (transcripts[transcripts.length - 1].timeStamp !== doc.data().timeStamp) {
                    setTranscripts(transcripts => [
                        ...transcripts, {
                            text: doc
                                .data()
                                .text,
                            speaker: doc
                                .data()
                                .speaker,
                            timeStamp: doc
                                .data()
                                .timeStamp
                        }
                    ])
                }

            });

        });

        return (() => {
            unsubscribe();

        })
    }, [listen]);

    return (
        <div className="Page-wrapper">
            <div className="Page-nav">
                <SideMenu />
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
                        }} />
                </div>
                <div className="header">
                    <div className="heading">
                        <div id="meet-name" onClick={() => {
                            setBox(true);
                        }}>
                            {
                                TitleBox ?
                                    <div className="edit-title">
                                        <input type="text" onChange={event => setTitle(event.target.value)} />
                                    </div>
                                    : <p>{ meetingTitle }</p>

                            }
                        </div>
                        <div id="edit-image">
                            <img src={editLogo} />
                        </div>
                        <Fab
                            color="primary"
                            id="play-n-pause"
                            onClick={() => {
                                setListen(listen => !listen)
                            }}>
                            {listen
                                ? <PauseIcon />
                                : <PlayArrowIcon />}
                        </Fab>

                        <Fab
                            color="alert"
                            id="stop"
                            onClick={() => {
                                setListen(false)
                            }}>
                            <StopIcon></StopIcon>
                        </Fab>

                    </div>
                    <div className="date-n-time">
                        <img src={calendar} />
                        <p>{timestamp}</p>
                        <img src={clock} />
                        <p>{meetLength}</p>
                    </div>
                    <p id="speaker">SPEAKERS</p>
                    <div className="speakers-list">
                        <p>{ html }</p>
                    </div>
                </div>

                <div className="recycler-view">
                    <Transcript />
                    {console.log(transcripts)}

                    {transcripts.length>1
                        ? (transcripts.map((transcript) => {
                            return (
                                <Transcript
                                    name={transcript.speaker}
                                    timeStamp={transcript.timeStamp}
                                    text={transcript.text}></Transcript>
                            ) 
                        }))
                        : (
                            <div>No transcript yet</div>
                        )
                    }
                </div>
                {/* <div className="card-view">
                    <TranscriptCard />
                </div> */}
            </div>
        </div>
    )
}
