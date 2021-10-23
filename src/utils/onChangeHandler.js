export default function onChangeHandler(
  event,
  type,
  setEmail,
  setPassword,
  setConfirmPassword
) {
  if (type === "email") {
    setEmail(event.target.value);
  } else if (type === "password") {
    setPassword(event.target.value);
  } else if (type === "confirmPassword") {
    setConfirmPassword(event.target.value);
  }
}
