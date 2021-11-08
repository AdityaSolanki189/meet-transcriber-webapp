import React, {useContext} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../config/Firebase";
import { colours } from "../theme/colors";
import logo from "../resources/logo.png";
import userlogo from "../resources/user-logo.png";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Home from "@mui/icons-material/Home";
import "./SideMenu.css"

function SideMenu() {

    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate();
    
    const { modeStyle} = useContext(AuthContext);

    async function logout() {
        try {
            const response = signOut(auth);
            navigate("/");
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    } 

    return (
        <div className="side-menu" style={{ backgroundColor: modeStyle.backgroundColor }}>
            <div className="collapse">
                {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-left-square-fill"
                    viewBox="0 0 16 16">
                    <path
                        d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"/>
                </svg> */}
            </div>

            <div className="top-section">
                <h1 className="app-name" style={{ color: colours.blue }}>MeetScript</h1>
                <img src={logo} alt="sq" width="40px" height="40px"/>
            </div>

            <hr/>

            <div className="mid-section" >
                <div className="direct-home" >
                    <Link to="/home">
                        <button style={{ color: colours.blue, backgroundColor: modeStyle.backgroundColor}}>
                            <p>
                                Home {""}
                                <Home
                                fontSize="large"
                                style={{ position: "relative", left: "0rem", top: "0.5rem" }}
                                ></Home>
                            </p>
                        </button>
                    </Link>
                </div>
                <div className="create-groups" >
                    <Link to="/create">
                        <button style={{ color: colours.blue, backgroundColor: modeStyle.backgroundColor}}>
                            <p>
                                Create Group {""}
                                <GroupAddIcon
                                fontSize="large"
                                style={{ position: "relative", left: "0rem", top: "0.5rem" }}
                                ></GroupAddIcon>
                            </p>
                        </button>
                    </Link>
                </div>
                <div className="groups" >
                    <Link to="/user-groups">
                        <button style={{ color: colours.blue, backgroundColor: modeStyle.backgroundColor}}>
                            <p>
                                Groups {""}
                                <GroupIcon
                                    fontSize="large"
                                    style={{ position: "relative", left: "0rem", top: "0.5rem" }}
                                ></GroupIcon>
                            </p>
                        </button>
                    </Link>
                </div>
            </div>

            <div className="footer" style={{ color: modeStyle.subTextColor, backgroundColor: modeStyle.backgroundColor }}>
                <div className="about-user">
                    <img src={userlogo} alt="sq" width="40px" height="40px"/>
                    <div className="user-info">
                        <h3>{currentUser.displayName}</h3>
                        <h3>{currentUser.email}</h3>
                    </div>
                </div>
                
                <div className="user-btns">
                        <Link to="/edit-profile"> 
                            <button style={{ color: colours.blue, backgroundColor: modeStyle.backgroundColor, border:"none"}}>
                            <h3>Edit Profile</h3>
                            </button>
                        </Link>
                        {/* <button>
                            holafdf  ddf
                        </button> */}

                        <button style={{ color: colours.blue, backgroundColor: modeStyle.backgroundColor, border:"none"}} 
                        onClick={() => {
                            logout();
                            localStorage.clear();
                        }}>
                            <h3>Logout</h3>
                        </button>
                </div>
                
            </div>

        </div>
    )
}

export default SideMenu
