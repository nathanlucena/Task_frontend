import React from 'react';
import { Link } from 'react-router-dom'

import './style.css';

const Header: React.FC = () => {
    return (
        <div>
            <div className="navDiv">
                <Link to="/">    <img className="logo" alt="TASKS" src={process.env.PUBLIC_URL + "/media/logoWhite.svg"} /></Link>
                <Link to="/tasks" className="linkTasks">Yours Tasks</Link>
            </div>
        </div>
    )
}

export default Header;