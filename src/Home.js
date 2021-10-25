import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "./config/Firebase";
import { useNavigate } from "react-router-dom";
import "./App.css";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { colours } from "./theme/colors";
import { Checkbox } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { BorderBottom } from "@mui/icons-material";
import { borderColor } from "@mui/system";

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { modeStyle, theme, setTheme } = useContext(AuthContext);

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
    <div className="homePage-wrapper">
      <div
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
              Create Group{" "}
              <GroupAddIcon
                fontSize="large"
                style={{ position: "relative", left: "0rem", top: "0.5rem" }}
              ></GroupAddIcon>
            </h2>
          </button>

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
      </div>

      <div className="homePage-main">
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
          <h1>Hello {currentUser.email}</h1>
        ) : (
          <div>Heya Stranger, pls login</div>
        )}
      </div>
    </div>
  );
}
