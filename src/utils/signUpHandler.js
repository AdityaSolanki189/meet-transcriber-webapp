export default function signUpHandler(
  signUp,
  password,
  confirmPassword,
  email,
  setError,
  setLoading
) {
  if (password === confirmPassword) {
    signUp(email, password);
  } else {
    setError("Passwords do not match");
    setLoading(false);
    return;
  }
}
