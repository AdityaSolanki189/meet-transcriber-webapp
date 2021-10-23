import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import onChangeHandler from "../utils/onChangeHandler";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { colours } from "../theme/colors.js";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";

export default function LoginCard({ cardWidthLG, cardWidthXS }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { logIn, error, loading } = useContext(AuthContext);

  return (
    <div>
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
          width: { lg: cardWidthLG, xs: cardWidthXS },
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
              onChangeHandler(event, "email", setEmail, setPassword, null);
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
              onChangeHandler(event, "password", setEmail, setPassword, null);
            }}
          />
        </div>

        <Button
          onClick={() => {
            logIn(email, password);
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
  );
}
