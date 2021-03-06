import { Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../config/Firebase";

export default function PrivateRoute({ path, ...props }) {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    
    });
    // return unsubscribe;
  }, []);

  

  return currentUser ? (
    // console.log(currentUser)
    <Route to={path} {...props}></Route>
  ) : (
    <Navigate to="/login" state={{ from: path }} replace={true}></Navigate>
  );
}
