import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../config/Firebase";
import "../App.css";
// import GroupIcon from "@mui/icons-material/Group";
// import GroupAddIcon from "@mui/icons-material/GroupAdd";
// import { colours } from "../theme/colors";
import { Checkbox } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import { BorderBottom } from "@mui/icons-material";
// import { borderColor } from "@mui/system";
import SideMenu from "../components/SideMenu";

export default function Home() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const { modeStyle, theme, setTheme } = useContext(AuthContext);

    return (
        <div className="Page-wrapper">
            {/* <div
                className="homePage-nav"
                style={{ backgroundColor: modeStyle.backgroundColor }}
            >
                <div style={{ gridArea: "b" }}>
                    <h1 style={{ color: colours.blue }}>Your Transciptor</h1>
                </div>

                <div    
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gridArea: "m",
                    }}
                >
                    <Link to="/create">
                        <button
                            style={{
                            backgroundColor: modeStyle.elementBackgroundColor,
                            width: "100%",
                            margin: "1rem 0rem",
                            borderTop: "none",
                            borderLeft: "none",
                            borderRight: "none",
                            borderBottom: `0.5px ${colours.blue} solid`,
                        }}>
                        <h2
                            style={{
                                color: colours.blue,
                                backgroundColor: modeStyle.elementBackgroundColor,
                            }}
                        >

                            Create Group {" "}

                            <GroupAddIcon
                                fontSize="large"
                                style={{ position: "relative", left: "0rem", top: "0.5rem" }}
                            ></GroupAddIcon>
                        </h2>
                        </button>
                    </Link>
                    
                    <button
                        style={{
                        backgroundColor: modeStyle.elementBackgroundColor,
                        width: "100%",
                        margin: "1rem 0rem",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        borderBottom: `0.5px ${colours.blue} solid`,
                        }}
                    >
                        <h2
                        style={{
                            color: colours.blue,
                            backgroundColor: modeStyle.elementBackgroundColor,
                        }}
                        >
                        Groups{" "}
                        <GroupIcon
                            fontSize="large"
                            style={{ position: "relative", left: "0rem", top: "0.5rem" }}
                        ></GroupIcon>
                        </h2>
                    </button>
                </div>

                <div style={{ gridArea: "l" }}>
                    {" "}
                    <button
                        style={{
                        backgroundColor: modeStyle.elementBackgroundColor,
                        width: "100%",
                        margin: "1rem 0rem",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        borderBottom: `0.5px ${colours.blue} solid`,
                        }}
                        onClick={() => {
                            logout();
                            localStorage.clear();
                        }}
                    >
                    <h2
                        style={{
                            color: colours.blue,
                            backgroundColor: modeStyle.elementBackgroundColor,
                        }}
                    >
                        Logout
                    </h2>
                    </button>
                </div>
            </div> */}

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
                {currentUser ? (
                    <h1>Hello, {currentUser.email}!</h1>
                ) : (
                <div>Heya Stranger, please login.</div>
                )}
            </div>
        </div>
    );
}
