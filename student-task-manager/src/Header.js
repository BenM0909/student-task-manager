import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue-500 text-white p-4">
            <h1 className="text-xl">Student Task Manager</h1>
            <nav>
                <Link to="/" className="mr-4">Home</Link>
                <Link to="/login" className="mr-4">Login</Link>
                <Link to="/signup" className="mr-4">Sign Up</Link>
                <Link to="/tasks">Tasks</Link>
            </nav>
        </header>
    );
};

export default Header;
