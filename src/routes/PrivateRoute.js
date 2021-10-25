import { Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../config/Firebase";

export default function PrivateRoute({ path, ...props }) {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(" at Private ROuet use Effect", user);
    });
    return unsubscribe;
  }, []);

  console.log(currentUser, "at Privatetoute");

  return currentUser ? (
    // console.log(currentUser)
    <Route to={path} {...props}></Route>
  ) : (
    <Navigate to="/login" state={{ from: path }} replace={true}></Navigate>
  );
}
