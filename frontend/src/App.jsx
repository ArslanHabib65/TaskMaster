import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import TaskForm from './components/TaskForm/TaskForm.jsx';
import TaskList from './components/TaskList/TaskList.jsx';
import SignupForm from './components/Auth/SignupForm.jsx';
import Footer from './components/Footer/Footer.jsx';
import LoginForm from './components/Auth/LoginForm.jsx';

function App() {
    const [tasks, setTasks] = useState([]); 
    const [showSignup, setShowSignup] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    
    useEffect(() => {

        const token = localStorage.getItem('token');

        if (token){
            setIsLoggedIn(true);
        }

    }, []);



    return (
        <>
        <div className="app-container">

            <Navbar 
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}

                onSignupClick={() => {
                    setShowLogin(false);
                    setShowSignup(true);
                }}

                onLoginClick={() => {
                    setShowSignup(false);
                    setShowLogin(true);
                }}
            />

            {!showSignup && !showLogin && !isLoggedIn && (
                <>
                    <TaskForm
                        setTasks={setTasks}
                        disabled={true}
                    />

                    <TaskList
                        tasks={tasks}
                        setTasks={setTasks}
                    />
                </>
            )}
            
        
            {showSignup && <SignupForm
                setShowSignup={setShowSignup}
                setIsLoggedIn = {setIsLoggedIn}
            />}
            {showLogin && <LoginForm
                setShowLogin={setShowLogin}
                setIsLoggedIn={setIsLoggedIn}
            />}

            {isLoggedIn && (
                <>
                    <TaskForm
                        setTasks={setTasks}
                        disabled={false}
                    />
                    <TaskList
                        tasks={tasks}
                        setTasks={setTasks}
                    />
                </>
            )}
            </div>

            <Footer />
        </>
    );
}

export default App;

