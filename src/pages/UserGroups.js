import React from 'react'
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { Checkbox } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SideMenu from '../components/SideMenu'

export default function UserGroups() {

    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const { modeStyle, theme, setTheme } = useContext(AuthContext);

    return (
        <div className="Page-wrapper">
            <div className="Page-nav">
                <SideMenu/>
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
                <h1>Hola Que Pasa</h1> 
                <h2>Here are your Groups: </h2>
            </div>
            
        </div>
    )
}