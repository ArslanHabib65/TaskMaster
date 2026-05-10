import { useState } from "react";


function LoginForm({setShowLogin, setIsLoggedIn}){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('http://localhost:5000/auth/login',
        {
          method: 'POST', 
          headers:  {'Content-Type': 'application/json'}, 
          body: JSON.stringify({email, password})
        }
      );

      const data = await response.json();

      if (!response.ok){
          setMessage(data.message);
          return;
      }

      localStorage.setItem('token', data.token);

      setIsLoggedIn(true);

      setShowLogin(false);

    } catch (error){
      setMessage('Server error');
    } finally {
      setLoading(false);
    }
  }



  return (
   <>
    <div>

        <button onClick={() => setShowLogin(false)}>
            x
        </button>

        <h1>Login Form</h1>

        <form onSubmit={handleLogin}>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
                {loading ? 'Logging in...' : 'Login'}
            </button>

        </form>

        <p>{message}</p>

    </div>
</>
  );
}

export default LoginForm;