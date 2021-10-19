import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Alert } from "@mui/material";
import { colours } from "./theme/colors";
import { useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, error, loading, setErorr, setLoading } =
    useContext(AuthContext);

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
    <div>
      <h1 style={{ color: colours.blue }}>Log In</h1>

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

        <Button
          onClick={() => {
            logInHandler();
          }}
          sx={{ margin: "1rem" }}
          variant="contained"
          disabled={loading}
        >
          Log In
        </Button>
      </Card>
    </div>
  );
}
