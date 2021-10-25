import "./App.css";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div className="App">
      {
        <Routes>
          <Route path="/" element={<LandingPage></LandingPage>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <PrivateRoute path="/home" element={<Home></Home>}></PrivateRoute>
        </Routes>
      }
    </div>
  );
}

export default App;
