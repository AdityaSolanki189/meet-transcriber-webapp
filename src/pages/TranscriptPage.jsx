import React, { useState } from 'react';
import SideMenu from '../components/SideMenu';
import './TranscriptPage.css';

import { useContext } from "react";
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

export default function TranscriptPage() {

    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { modeStyle, theme, setTheme } = useContext(AuthContext);


    const timestamp = 'Mon, 10/25 - 11:08 AM'
    const meetLength = '2.01';
    const speakersList = ['Anurag Patil', 'Aditya Solanki', 'Aditya Nair'];
    const meetingTitle = "Google Meet - Mon,  Oct 25,  2021 at 11:08 am";
    var html = '';
    for (var i = 0; i < speakersList.length; i++) {
        if (i !== speakersList.length - 1)
            html += speakersList[i] + ', ';
        else
            html += speakersList[i];
    }

    const [PlaynPause, setPlay] = useState(true);
    const [TitleBox, setBox] = useState(false);
    const [meetTitle, setTitle] = useState(meetingTitle);


    return (
        <div className="Page-wrapper">
            <div className="Page-nav">
                <SideMenu />
            </div>
            <div className="Page-main">
                {" "}
                <div style={{ textAlign: "right" }}>
                    {" "}
                    <Checkbox
                        icon={<DarkModeOutlinedIcon />}
                        checkedIcon={<DarkModeIcon />}
                        onChange={() => {
                            theme === "LIGHT" ? setTheme("DARK") : setTheme("LIGHT");
                        }}
                        sx={{ margin: "1rem" }}
                    />
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
                                    : <p>{meetTitle}</p>
                                
                            }
                        </div>
                        <div id="edit-image">
                            <img src={editLogo} />
                        </div>
                        <Fab color="primary" id="play-n-pause" onClick={() => {
                            PlaynPause ? setPlay(false) : setPlay(true);
                        }}>
                            {PlaynPause ? <PlayArrowIcon /> : <StopIcon />}
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
                        <p>{html}</p>
                    </div>
                </div>

                <div className="recycler-view">
                    <Transcript />
                </div>
                <div className="card-view">
                    <TranscriptCard />
                </div>
            </div>
        </div>
    )
}
