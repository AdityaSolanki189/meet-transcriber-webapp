import landingPageLogo from "./landingPageLogo.svg";
import { colours } from "./theme/colors";
import LoginCard from "./components/LoginCard";

export default function LandingPage() {
  return (
    <div className="landingPage-wrapper">
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
  );
}
