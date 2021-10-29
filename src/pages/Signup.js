import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Alert, Checkbox } from "@mui/material";
import { colours } from "../theme/colors";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import signupPageLogo from "../resources/signupPageLogo.svg";
import onChangeHandler from "../utils/onChangeHandler";
import signUpHandler from "../utils/signUpHandler";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

export default function SignUp() {
  //const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    signUp,
    error,
    loading,
    setError,
    setLoading,
    theme,
    setTheme,
    modeStyle,
  } = useContext(AuthContext);

  return (
    <div
      style={{
        backgroundColor: modeStyle.backgroundColor,
        position: "fixed",
        top: "0rem",
        bottom: "0rem",
        left: "0rem",
        right: "0rem",
        overflowY: "scroll",
      }}
    >
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
          backgroundColor: modeStyle.elementBackgroundColor,
        }}
      >
        <div style={{ width: "60%", margin: "auto" }}>
          <FormControl
            variant="standard"
            fullWidth={true}
            required
            margin="normal"
          >
            <InputLabel
              htmlFor="component-simple"
              sx={{ color: modeStyle.placeholderColor }}
            >
              Email
            </InputLabel>
            <Input
              id="component-simple"
              sx={{ color: modeStyle.textColor }}
              type="email"
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
          </FormControl>
        </div>

        <div style={{ width: "60%", margin: "auto" }}>
          <FormControl
            variant="standard"
            fullWidth={true}
            required
            margin="normal"
          >
            <InputLabel
              htmlFor="component-simple"
              sx={{ color: modeStyle.placeholderColor }}
            >
              Password
            </InputLabel>
            <Input
              id="component-simple"
              sx={{ color: modeStyle.textColor }}
              type="password"
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
          </FormControl>
        </div>

        <div style={{ width: "60%", margin: "auto" }}>
          <FormControl
            variant="standard"
            fullWidth={true}
            required
            margin="normal"
          >
            <InputLabel
              htmlFor="component-simple"
              sx={{ color: modeStyle.placeholderColor }}
            >
              Confirm Password
            </InputLabel>
            <Input
              id="component-simple"
              sx={{ color: modeStyle.textColor }}
              type="password"
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
          </FormControl>
        </div>

        <Button
          onClick={() => {
            signUpHandler(
              signUp,
              password,
              confirmPassword,
              email,
              setError,
              setLoading
            );
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
