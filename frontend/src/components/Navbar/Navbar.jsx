import './Navbar.css';
import { jwtDecode } from "jwt-decode";

function Navbar({isLoggedIn, setIsLoggedIn, onSignupClick, onLoginClick}){

    const token = localStorage.getItem("token");

    let username = "";

    if (token){
    const decoded = jwtDecode(token);

        if (decoded.email){
            username = decoded.email.split("@")[0];
        }
    }

    function handleLogout(){
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    return (
        <>
            <nav className="navbar">
                <h2 className="logo">TaskMaster</h2>

                <div className="nav-right">
                    {isLoggedIn ? (
                    <>
                        <span className="welcome">
                            Welcome, {username}
                        </span>

                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                    ) : (
                    <>
                        <button
                            className="login-btn"
                            onClick={onLoginClick}
                        >
                            Login
                        </button>

                        <button
                            className="signup-btn"
                            onClick={onSignupClick}
                        >
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