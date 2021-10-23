import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Alert } from "@mui/material";
import { colours } from "./theme/colors";
import { useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Link } from "react-router-dom";
import signupPageLogo from "./signupPageLogo.svg";
import onChangeHandler from "./utils/onChangeHandler";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signUp, error, loading, setErorr, setLoading } =
    useContext(AuthContext);

  function signUpHandler() {
    if (password === confirmPassword) {
      signUp(email, password);
    } else {
      setErorr("Passwords do not match");
      setLoading(false);
      return;
    }
  }

  return (
    <div>
      <div style={{ width: "50vw", height: "50vh", margin: "auto" }}>
        <img
          src={signupPageLogo}
          style={{ width: "100%", height: "100%" }}
          alt="Landing Page Logo"
        ></img>
      </div>

      <h1 style={{ color: colours.blue }}>Sign up</h1>

      {error ? (
        <Alert severity="error" sx={{ width: "30%", margin: "2rem auto" }}>
          {error}
        </Alert>
      ) : (
        <div></div>
      )}

      <Card
        sx={{
          width: { lg: "30%", xs: "80%" },
          margin: "auto",
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
              onChangeHandler(
                event,
                "email",
                setEmail,
                setPassword,
                setConfirmPassword
              );
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
              onChangeHandler(
                event,
                "password",
                setEmail,
                setPassword,
                setConfirmPassword
              );
            }}
          />
        </div>

        <div style={{ width: "60%", margin: "auto" }}>
          {" "}
          <TextField
            fullWidth
            id="standard-basic"
            label="Confirm Password"
            variant="standard"
            type="password"
            margin="normal"
            required
            onChange={(event) => {
              onChangeHandler(
                event,
                "confirmPassword",
                setEmail,
                setPassword,
                setConfirmPassword
              );
            }}
          />
        </div>
        <Button
          onClick={() => {
            signUpHandler();
          }}
          sx={{ margin: "1rem" }}
          variant="contained"
          disabled={loading}
        >
          Sign Up
        </Button>
      </Card>
      <h2 style={{ color: colours.lightBlue }}>
        Have an account?{" "}
        <Link
          to="/"
          style={{ textDecoration: "none", color: colours.lightBlue }}
        >
          <em>Sign In!</em>
        </Link>
      </h2>
    </div>
  );
}
