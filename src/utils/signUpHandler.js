export default function signUpHandler(
  signUp,
  password,
  confirmPassword,
  email,
  username,
  setError,
  setLoading
) {
  if (password === confirmPassword) {
    signUp(username, email, password);
  } else {
    setError("Passwords do not match");
    setLoading(false);
    return;
  }
}
