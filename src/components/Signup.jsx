import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(18);
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = {
      name: username, email, password, age, location, bio,
    };
    try {
      const resp = await axios.post('/signup', data);
      const { token } = resp.data;
      if (token) {
        localStorage.setItem('authToken', token);
        setAuth(true);
        navigate('/');
      }
    } catch (err) {
      setAuth(false);
      console.log(err.response);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Name" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <br />

        <input type="number" value={age} min={18} onChange={(e) => setAge(e.target.value)} required />
        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
        <br />

        <textarea cols={50} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Say something about yourself!" required />
        <br />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default Signup;
