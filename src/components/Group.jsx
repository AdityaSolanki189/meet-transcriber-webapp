import React from 'react';
import SideMenu from './SideMenu';
import './Group.css';

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { Checkbox } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import editLogo from '../resources/edit.png';
import calendar from '../resources/calendar-logo.png';
import clock from '../resources/clock-logo.png';

export default function Group() {

    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { modeStyle, theme, setTheme } = useContext(AuthContext);


    const timestamp = 'Mon, 10/25 - 11:08 AM'
    const meetLength = '2.01';
    const speakersList = ['Anurag Patil', 'Aditya Solanki', 'Aditya Nair'];
    var html = '';
    for (var i = 0; i < speakersList.length; i++) {
        if(i !== speakersList.length - 1)
            html += speakersList[i] + ', ';
        else
            html += speakersList[i];
    }

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
                        <div id="meet-name">
                            <p>Google Meet - Mon,  Oct 25,  2021 at 11:08 am</p>
                        </div>
                        <div id="edit-image">
                            <img src={editLogo} />
                        </div>
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
                    
                </div>

            </div>
        </div>
    )
}
