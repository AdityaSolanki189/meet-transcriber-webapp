import landingPageLogo from "./landingPageLogo.svg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Alert } from "@mui/material";
import { colours } from "./theme/colors";
import { Link } from "react-router-dom";

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
        <h1 style={{ color: "#00b0ff" }}>Log In</h1>

        {/* {error ? (
          <Alert severity="error" sx={{ width: "30%", margin: "2rem auto" }}>
            {error}
          </Alert>
        ) : (
          <div></div>
        )} */}

        <Card
          sx={{
            width: { lg: "60%", xs: "80%" },
            margin: "0rem auto",
            paddingBottom: "1rem",
          }}
        >
          <div style={{ width: "60%", margin: "auto" }}>
            {" "}
            <TextField
              fullWidth
              id="standard-basic"
              label="Email"
              variant="standard"
              type="email"
              margin="normal"
              required
              onChange={(event) => {
                // onChangeHandler(event, "email");
              }}
            />
          </div>

          <div style={{ width: "60%", margin: "auto" }}>
            {" "}
            <TextField
              fullWidth
              id="standard-basic"
              label="Password"
              variant="standard"
              type="password"
              margin="normal"
              required
              onChange={(event) => {
                // onChangeHandler(event, "password");
              }}
            />
          </div>

          <Button
            onClick={() => {
              // logInHandler();
            }}
            sx={{ margin: "1rem", backgroundColor: "#00b0ff" }}
            variant="contained"
            // disabled={loading}
          >
            Log In
          </Button>
        </Card>
        <h2 style={{ color: "#00b0ff" }}>
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{ textDecoration: "none", color: "#00b0ff" }}
          >
            <em>Sign up!</em>
          </Link>
        </h2>
      </div>
    </div>
  );
}
