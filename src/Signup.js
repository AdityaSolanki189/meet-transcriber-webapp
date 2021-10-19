import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Alert } from "@mui/material";
import { colours } from "./theme/colors";
import { useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signUp, error, loading, setErorr, setLoading } =
    useContext(AuthContext);

  function onChangeHandler(event, type) {
    if (type === "email") {
      setEmail(event.target.value);
    } else if (type === "password") {
      setPassword(event.target.value);
    } else if (type === "confirmPassword") {
      setConfirmPassword(event.target.value);
    }
  }

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
              onChangeHandler(event, "confirmPassword");
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
    </div>
  );
}
