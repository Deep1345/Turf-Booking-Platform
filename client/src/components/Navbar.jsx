import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">
                    Turf<span>Booker</span>
                </Link>
                <div className="nav-links">
                    {user ? (
                        <>
                            <span style={{ color: 'var(--text-muted)' }}>Hello, {user.name}</span>
                            <Link to="/dashboard" className="btn btn-secondary">Dashboard</Link>
                            <button onClick={handleLogout} className="btn">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-secondary">Login</Link>
                            <Link to="/register" className="btn">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
