import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "./config/Firebase";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  async function logout() {
    try {
      const response = signOut(auth);
      navigate("/");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {currentUser ? (
        <div>
          Hello {currentUser.email}
          <button
            onClick={() => {
              logout();
            }}
          >
            log out
          </button>
        </div>
      ) : (
        <div>Heya Stranger, pls login</div>
      )}
    </div>
  );
}
