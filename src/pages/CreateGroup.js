import React, {useState} from 'react';
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/AuthProvider";
import {Multiselect} from 'multiselect-react-dropdown';
import {Link} from "react-router-dom";
import SideMenu from "../components/SideMenu";
import {Checkbox, InputLabel} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import "./CreateGroup.css";

function CreateGroup() {

    const {currentUser, postGroupToDb} = useContext(AuthContext);
    const navigate = useNavigate();

    const {modeStyle, theme, setTheme} = useContext(AuthContext);

    const [inputText,
        setInputText] = useState('');
    const [meetId,
        setMeetId] = useState('');
    const [meetTitle,
        setMeetTitle] = useState('');
    const [groupName,
        setGroupName] = useState('');
    const [meetLink,
        setMeetLink] = useState('');
    const [onSubmit,
        setOnSubmit] = useState(false);
    const [errorMsg,
        setErrorMsg] = useState('');
    const [members,
        setMembers] = useState([]);

    const data = [
        {
            email: 'aditya2ss567@gmail.com',
            name: 'Aditya Solanki',
            id: 1
        }, {
            email: 'anuraggp2001@gmail.com',
            name: 'Anurag Patil',
            id: 2
        }, {
            email: 'sharma420@gmail.com',
            name: 'Abhishek Sharma',
            id: 3
        }, {
            email: 'adityanair102001@gmail.com',
            name: 'Aditya Nair',
            id: 4
        }
        // {name: "Aditya Solanki", id: '1', email: 'aditya2ss567@gmail.com'}, {name:
        // 'Anurag Patil', id: '2', email: 'anuraggp2001@gmail.com'}, {name: 'Abhishek
        // Sharma', id: '3', email: 'sharma420@gmail.com'}, {name: 'Aditya Nair', id:
        // '4', email: 'adityanair102001@gmail.com'}
    ]
    const [options] = useState(data);

    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    };

    const groupNameHandler = (e) => {
        setGroupName(e.target.value);
    };

    const meetTitleHandler = (e) => {
        setMeetTitle(e.target.value);
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
        console.log("Meeting Title : ", groupName);
        console.log("Meeting Members : ", members);
        console.log('The Group is Created! with id : ', meetId);
        console.log('====================================');

        postGroupToDb(members, meetLink, meetId, groupName, meetTitle);
    }

    const onSelectCall = (selectedList, selectedItem) => {
        console.log(selectedItem);
        setMembers([
            ...members,
            selectedItem
        ]);
    }

    const onRemoveCall = (selectedList, removedItem) => {
        console.log(removedItem);
        setMembers(members.filter((el) => el.id !== removedItem.id));
    }

    return (
        <div className="Page-wrapper">
            <div className="Page-nav">
                <SideMenu/>
            </div>
            <div className="Page-main">
                {" "}
                <div style={{
                    textAlign: "right"
                }}>
                    {" "}
                    <Checkbox
                        icon={< DarkModeOutlinedIcon />}
                        checkedIcon={< DarkModeIcon />}
                        onChange={() => {
                        theme === "LIGHT"
                            ? setTheme("DARK")
                            : setTheme("LIGHT");
                    }}
                        sx={{
                        margin: "1rem"
                    }}/>
                </div>
                <div className="create">
                    <form onSubmit={submitMeetHandler}>
                        <h2>Creating Meet-Groups</h2>

                        <input
                            required
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
                        Yay! Your Meeting is Ready.
                        <br/>
                        <span
                            style={{
                            fontWeight: "bold"
                        }}>{meetLink}</span>

                        <br/>
                        <br/>

                        <InputLabel>Your Group Name</InputLabel>
                        <input
                            required
                            value={groupName}
                            onChange={groupNameHandler}
                            type="text"
                            placeholder="Set Group Name..."
                            className="meet-input"/>
                        <br/>
                        <InputLabel>Meeting Title</InputLabel>
                        <input
                            required
                            value={meetTitle}
                            onChange={meetTitleHandler}
                            type="text"
                            placeholder="Set Meet Title..."
                            className="meet-input"/>
                        <br/>
                        <InputLabel>Select Members</InputLabel>
                        <Multiselect
                            options={options}
                            displayValue="email"
                            onSelect={onSelectCall}
                            onRemove={onRemoveCall}/>



                        <button style={{
                            backgroundColor: "var(--primary-color)",
                            color:"white",
                            border: "1px solid var(--primary-color)",
                            borderRadius: "8px"}} 
                            onClick={()=>{createGroupHandler()}}>
                                 Create Group
                        </button>


                    </div>}
                </div>
            </div>
        </div>
    );
}

export default CreateGroup;
