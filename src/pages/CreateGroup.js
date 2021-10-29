import React, {useState} from 'react';
import {Multiselect} from 'multiselect-react-dropdown';
import { Link } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import "./CreateGroup.css";

function CreateGroup() {

    const [inputText,
        setInputText] = useState('');
    const [meetId,
        setMeetId] = useState('');
    const [meetLink,
        setMeetLink] = useState('');
    const [onSubmit,
        setOnSubmit] = useState(false);
    const [errorMsg,
        setErrorMsg] = useState('');

    const data = [
        {name: "Aditya", id: '1', email: 'aditya2ss283@gmail.com'},
        {name: 'Anurag', id: '2', email: 'anuragg4@gmail.com'},
        {name: 'Abhishek', id: '3', email: 'abhishek423@gmail.com'},
        {name: 'Rohit', id: '4', email: 'rohitrr4@gmail.com'},
        {name: 'Pranav', id: '5', email: 'pranavmohril343@gmail.com'},
        {name: 'Atharva', id: '6', email: 'atharvaVeda232@gmail.com'},
    ]
    const [options] = useState(data);

    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    };

    const submitMeetHandler = (e) => {
        e.preventDefault();
        
        if (inputText === '') {
            setErrorMsg("Please Enter the Meet Link");
            console.log("Please Enter the Meet Link");
        } else if (inputText.indexOf('https://meet.google.com/') !== -1 && inputText.length === 36) {
            console.log("Good Link!");
            setMeetLink(inputText);
            let code = inputText.substr(-12);
            setMeetId(code);
            console.log("Submitted");
            setOnSubmit(true);
            setInputText("");
        } else {
            console.log("Wrong Format");
            setErrorMsg('Please Enter the link in this format : https://meet.google.com/xxx-yyyy-zzz');
        }
    };

    const createGroupHandler = () => {
        console.log('====================================');
        console.log('The Group is Created!', meetId);
        console.log('====================================');
    }

    return (
        <div className="Page-wrapper">
            <div className="Page-nav">
                <SideMenu/>
            </div>
            <div className="Page-main create">
                <form onSubmit={submitMeetHandler}>
                    <h2>Creating Meet-Groups</h2>

                    <input
                        value={inputText}
                        onChange={inputTextHandler}
                        type="text"
                        placeholder="Enter Meet Link..."
                        className="meet-input"/>
                    <button>
                        check link
                    </button>
                </form>

                {!onSubmit && <div className='create-error'>
                    {errorMsg}
                </div>}
                {onSubmit && <div className='create-invite'>
                    Hola! Now Lets Invite Your Friends.
                    <br />
                    Your Meet Link : <span style={{fontWeight:"bold"}}>{meetLink}</span>
                    <Multiselect options={options} displayValue="email"/>
                    
                    <Link to={`/group/${meetId}`} 
                        onClick={createGroupHandler}
                        style={{
                        color: "var(--primary-color)",
                        border: "1px solid var(--primary-color)",
                        borderRadius: "8px",
                    }}>
                        <button>
                            Create Group
                        </button>                    
                    </Link>
                </div>}
            </div>
        </div>
    );
}

export default CreateGroup;
