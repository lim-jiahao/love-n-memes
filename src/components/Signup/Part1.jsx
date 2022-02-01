import axios from 'axios';
import React, { useState } from 'react';
import ProgressBar from './ProgessBar.jsx';

const Part1 = ({
  username, setUsername, email, setEmail, password, setPassword, setCurPart,
}) => {
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (message) setMessage('');
  };

  const handleNext = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.get(`api/user/email-check?email=${email}`);
      if (resp.data.valid) setCurPart((prev) => prev + 1);
      else setMessage('A user with this email already exists.');
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <form onSubmit={handleNext}>
      <p className="text-center font-bold text-sm">
        We're excited to have you at Memeus!
        <br />
        First, set up your account information...
        <ProgressBar step={1} />
      </p>
      <div>
        <label className="block mb-2 text-indigo-500" htmlFor="name">
          Name
          <input className="w-full p-2 mb-4 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" name="name" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
      </div>

      <div>
        <label className="block mb-2 text-indigo-500" htmlFor="email">
          Email
          <input className="w-full p-2 mb-2 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="email" name="email" value={email} onChange={handleEmailChange} required />
        </label>
        <p className="text-sm text-red-500 font-bold mb-4">{message}</p>
      </div>

      <div>
        <label className="block mb-2 text-indigo-500" htmlFor="password">
          Password
          <input className="w-full p-2 mb-4 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
      </div>

      <div>
        <input className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-4 rounded" type="submit" value="Next" />
      </div>
    </form>
  );
};

export default Part1;
