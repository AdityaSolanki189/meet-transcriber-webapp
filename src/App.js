import "./App.css";
import SignUp from "./Signup";
import Login from "./Login";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";

function App() {
  return (
    <div className="App">
      {
        <Routes>
          <Route path="/" element={<LandingPage></LandingPage>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
        </Routes>
      }
    </div>
  );
}

export default App;
