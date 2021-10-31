import "./App.css";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Create from "./pages/CreateGroup";
import EditProfile from "./pages/EditProfile";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PrivateRoute from "./routes/PrivateRoute";
import UserGroups from "./pages/UserGroups";
import Meetings from "./pages/Meetings";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <div className="App">
        {<Routes>
            <Route 
                exact path="/" 
                element={<LandingPage/>}>
            </Route>
            <Route 
                path="/signup" 
                element={<SignUp/>}>    
            </Route>
            <Route 
                path="/login" 
                element={<Login/>}>
            </Route>
            <PrivateRoute 
                path="/home" 
                element={<Home/>}>
            </PrivateRoute>
            <PrivateRoute 
                path="/create" 
                element={<Create/>}>
            </PrivateRoute>
            <PrivateRoute 
                path="/user-groups" 
                element={<UserGroups/>}>
            </PrivateRoute>           
            <PrivateRoute 
                path="/user-groups/:groupID" 
                element={<Meetings/>}>
            </PrivateRoute>
            {/* <PrivateRoute 
                path="/user-groups/:groupID/:meetingID" 
                element={<Transcript/>}>
            </PrivateRoute> */}
            <PrivateRoute 
                path="/edit-profile" 
                element={<EditProfile/>}>
            </PrivateRoute>
            <Route 
                path="*" 
                element={<NotFound/>}>
            </Route>
        </Routes>}
    </div>
  );
}

export default App;


