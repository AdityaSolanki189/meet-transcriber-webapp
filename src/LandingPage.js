import landingPageLogo from "./landingPageLogo.svg";
import { colours } from "./theme/colors";
import LoginCard from "./components/LoginCard";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Checkbox } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

export default function LandingPage() {
  const { modeStyle, theme, setTheme } = useContext(AuthContext);
  return (
    <div
      className="landingPage-wrapper"
      style={{ backgroundColor: modeStyle.backgroundColor }}
    >
      <Checkbox
        icon={<DarkModeOutlinedIcon />}
        checkedIcon={<DarkModeIcon />}
        onChange={() => {
          theme === "LIGHT" ? setTheme("DARK") : setTheme("LIGHT");
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <div style={{ width: "50vw", height: "100vh" }}>
          <img
            src={landingPageLogo}
            style={{ width: "100%", height: "100%" }}
            alt="Landing Page Logo"
          ></img>
        </div>
        <div
          style={{
            width: "50vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              color: colours.blue,
              fontFamily: "Scheherazade",
            }}
          >
            Your Transciptor
          </h1>

          <LoginCard cardWidthLG="60%" cardWidthXS="80%"></LoginCard>
        </div>
      </div>
    </div>
  );
}
