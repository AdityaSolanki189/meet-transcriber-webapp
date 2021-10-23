import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
export default function PrivateRoute({ path, ...props }) {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? (
    <Route to={path} {...props}></Route>
  ) : (
    <Navigate to="/login" state={{ from: path }} replace={true}></Navigate>
  );
}
