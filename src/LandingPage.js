import landingPageLogo from "./landingPageLogo.svg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Alert } from "@mui/material";
import { colours } from "./theme/colors";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";

export default function LandingPage() {
  const { logIn, error, loading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onChangeHandler(event, type) {
    if (type === "email") {
      setEmail(event.target.value);
    } else if (type === "password") {
      setPassword(event.target.value);
    }
  }

  function logInHandler() {
    logIn(email, password);
  }
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
        <h1 style={{ color: colours.lightBlue }}>Log In</h1>

        {error ? (
          <Alert severity="error" sx={{ width: "30%", margin: "2rem auto" }}>
            {error}
          </Alert>
        ) : (
          <div></div>
        )}

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
                onChangeHandler(event, "email");
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
                onChangeHandler(event, "password");
              }}
            />
          </div>

          <Button
            onClick={() => {
              logInHandler();
            }}
            sx={{ margin: "1rem", backgroundColor: colours.lightBlue }}
            variant="contained"
            disabled={loading}
          >
            Log In
          </Button>
        </Card>
        <h2 style={{ color: colours.lightBlue }}>
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{ textDecoration: "none", color: colours.lightBlue }}
          >
            <em>Sign up!</em>
          </Link>
        </h2>
      </div>
    </div>
  );
}
