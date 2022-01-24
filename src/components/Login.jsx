import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const resp = await axios.post('/api/user/login', data);
      const { token } = resp.data;
      if (token) {
        localStorage.setItem('authToken', token);
        setAuth(true);
        navigate('/');
      }
    } catch (err) {
      setAuth(false);
      console.error(err.response);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="max-w-md w-full m-auto bg-indigo-100 rounded p-5">
        <header>
          <img className="w-20 mx-auto mb-5" src="https://img.icons8.com/fluent/344/year-of-tiger.png" alt="logo" />
        </header>

        <form onSubmit={handleLogin}>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="email">
              Email
              <input className="w-full p-2 mb-4 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
          </div>

          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="password">
              Password
              <input className="w-full p-2 mb-4 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
          </div>

          <div>
            <input className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-4 rounded" type="submit" value="Log In" />
          </div>
        </form>

        <footer>
          <Link to="/#" className="text-indigo-700 hover:text-pink-700 text-sm float-left">Forgot Password?</Link>
          <Link to="/signup" className="text-indigo-700 hover:text-pink-700 text-sm float-right">Create Account</Link>
        </footer>
      </div>
    </div>
  );
};

export default Login;
