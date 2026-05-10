import './SignupForm.css'
import { useState } from 'react';


function SignupForm({setShowSignup, setIsLoggedIn}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleSignup() {
    try{
      const response = await fetch('http://localhost:5000/auth/signup', 
        {
          method: 'POST', 
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();
      setMessage(data.message);
      if (response.ok) {
        setIsLoggedIn(true);
        setShowSignup(false)
      }
    } catch (error){
      console.log(error);
    }
  }
  return (
    <>
        <div>
            <button onClick={() => setShowSignup(false)}>x</button>
            <h1>Signup Form</h1>
            <input 
              type="email" 
              placeholder='Email' 
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
            />
            <input 
              type="password" 
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
                type='button'
                onClick={handleSignup}>Sign up</button>

            <p>{message}</p>
        </div>
    </>
  );
}

export default SignupForm;

