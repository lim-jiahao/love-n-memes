import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (message) setMessage('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (message) setMessage('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const resp = await axios.post('/api/user/login', data);
      const { token } = resp.data;
      if (token) {
        localStorage.setItem('authToken', token);
        setAuth(true);
        setMessage('');
        navigate('/');
      }
    } catch (err) {
      setAuth(false);
      setMessage('Invalid login! Please check your details and try again.');
      console.error(err.response);
    }
  };

  return (
    <div className="max-w-md w-full m-auto bg-indigo-100 rounded p-5">
      <header className="flex flex-col items-center justify-center">
        <img className="w-40" src="logo.png" alt="logo" />
        <p className='font-["Ma_Shan_Zheng"] text-8xl'>Memeus</p>
      </header>

      <form onSubmit={handleLogin}>
        <div>
          <label className="block mb-2 text-indigo-500" htmlFor="email">
            Email
            <input className="w-full p-2 mb-4 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="email" name="email" value={email} onChange={handleEmailChange} required />
          </label>
        </div>

        <div>
          <label className="block mb-2 text-indigo-500" htmlFor="password">
            Password
            <input className="w-full p-2 mb-4 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="password" name="password" value={password} onChange={handlePasswordChange} required />
          </label>
        </div>

        <p className="text-sm text-red-500 font-bold mb-4">{message}</p>

        <div>
          <input className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-4 rounded" type="submit" value="Log In" />
        </div>
      </form>

      <footer className="mb-4">
        <Link to="/#" className="text-indigo-700 hover:text-pink-700 text-sm float-left">Forgot Password?</Link>
        <Link to="/signup" className="text-indigo-700 hover:text-pink-700 text-sm float-right">Create Account</Link>
      </footer>
    </div>
  );
};

export default Login;
