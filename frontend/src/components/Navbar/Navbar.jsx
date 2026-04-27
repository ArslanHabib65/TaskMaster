import './Navbar.css';

function Navbar({isLoggedIn, setIsLoggedIn}){

    function handleLogin(){
        setIsLoggedIn(true); // fake login
    }

    function handleLogout(){
        setIsLoggedIn(false);
    }

    return (
        <>
            <nav className="navbar">
                <h2 className="logo">TaskMaster</h2>

                <div className="nav-right">
                    {isLoggedIn ? (
                    <>
                        <span className="welcome">Welcome, User</span>
                        <button className="logout-btn" onClick={handleLogout}>
                        Logout
                        </button>
                    </>
                    ) : (
                    <>
                        <button className="login-btn" onClick={handleLogin}>
                        Login
                        </button>
                        <button className="signup-btn">
                        Sign Up
                        </button>
                    </>
                    )}
                </div>
            </nav>
        </>
    );
}

export default Navbar;