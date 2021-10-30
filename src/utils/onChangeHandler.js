export default function onChangeHandler(
  event,
  type,
  setUsername,
  setEmail,
  setPassword,
  setConfirmPassword
) {
  if (type === "username") {
    setUsername(event.target.value);
  } else if (type === "email") {
    setEmail(event.target.value);
  } else if (type === "password") {
    setPassword(event.target.value);
  } else if (type === "confirmPassword") {
    setConfirmPassword(event.target.value);
  }
}
