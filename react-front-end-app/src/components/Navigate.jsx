import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navigate = () => {
    const [hasUser, setHasUser] = useState(false);

    useEffect(() => {
        const checkUser = () => {
            const userId = localStorage.getItem('userId');
            setHasUser(!!userId);
        };

        checkUser();
        
        /*This code checks perid for user. Need it in case there are multiple tabs */
        const interval = setInterval(checkUser, 1000);
        
        /* This checks local storage for user */
        window.addEventListener('storage', checkUser);

        return () => {
            clearInterval(interval);
            window.removeEventListener('storage', checkUser);
        };
    }, []);

    return (
        <header id="main-header">
            <h1 id="logo">
                <Link to="/">Calling Card</Link>
            </h1>
            <nav>
                <ul id="nav">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/create">Create</Link></li>
                    {hasUser && (
                        <li><Link to="/wallet">My Wallet</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navigate;