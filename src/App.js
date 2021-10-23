import "./App.css";
import SignUp from "./Signup";
import Login from "./Login";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      {
        <Routes>
          <Route path="/" element={<LandingPage></LandingPage>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <PrivateRoute path="home" element={<Home></Home>}></PrivateRoute>
        </Routes>
      }
    </div>
  );
}

export default App;
