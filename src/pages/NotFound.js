import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>Oops!</h1>
            <h3>That page cannot be found.</h3>
            <p style={{fontWeight:"bolder"}}><Link to='/home'>Back to Home.</Link></p>
        </div>
    );
}
 
export default NotFound;