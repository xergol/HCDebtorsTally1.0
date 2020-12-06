import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {

    const [selectedTab, setSelectedTab] = useState('');

    const handleClick = event => {
        setSelectedTab(event.target.name)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand">Navbar</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${selectedTab === 'registration' && 'active'}`}
                            to="/"
                            name="registration"
                            onClick={handleClick}
                        >Registration
                                <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${selectedTab === 'admin' && 'active'}`}
                            to="/search"
                            name="admin"
                            onClick={handleClick}
                        >Search</Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${selectedTab === 'reports' && 'active'}`}
                            to="/reports"
                            name="reports"
                            onClick={handleClick}
                        >Reports</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar