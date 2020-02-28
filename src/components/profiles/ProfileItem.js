import React from 'react'
import { Link } from "react-router-dom";


function ProfileItem(props) {
    const {login, avatar_url, html_url} = props.profile;

    return (
    <span  className="card">
            <span>
                <img src={avatar_url} alt="GitHub avatar" className="sideCard"/>
            </span>
            <span style={loginStyle}>{login}</span>
            <div>
                <Link to={`/profile/${login}`} className="profileBtn">Se profil</Link>
            </div>  
    </span>
    )
}

const loginStyle = {

    position: 'absolute',
    top: '6%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    // position: 'relative',
    // top: '0',
    textShadow: '2px 2px 10px #D7DBDD',
    color: 'black', 
    fontSize: '2rem', 
}



export default ProfileItem
