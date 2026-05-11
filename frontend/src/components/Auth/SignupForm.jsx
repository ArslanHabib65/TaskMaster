import './SignupAndLoginForm.css';
import { useState } from 'react';

function SignupForm({ setShowSignup, setIsLoggedIn }) {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleSignup() {

    try {

      const response = await fetch(
        'http://localhost:5000/auth/signup',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

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
        setShowSignup(false);
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (

    <div className="signup-overlay">

      <div className="signup-form">

        <button
          className="close-btn"
          onClick={() => setShowSignup(false)}
        >
          ×
        </button>

        <h1>Create Account</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-container">

          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="show-password-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>

        </div>

        <button
          className="signup-btn"
          type="button"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        <p className="message">
          {message}
        </p>

      </div>

    </div>
  );
}

export default SignupForm;