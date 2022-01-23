import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = ({ setAuth }) => {
  const purposes = ['Love', 'Friendship'];

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(18);
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [checkedState, setCheckedState] = useState(new Array(purposes.length).fill(false));
  const [checkMsg, setCheckMsg] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (checkedState.every((check) => !check)) {
      setCheckMsg('Please select at least 1');
      return;
    }
    const data = {
      name: username, email, password, age, location, bio, checkedState,
    };
    try {
      const resp = await axios.post('/api/user/signup', data);
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

  const handleOnCheck = (index) => {
    const updatedCheckedState = checkedState.map((item, i) => (index === i ? !item : item));
    setCheckedState(updatedCheckedState);
    if (checkMsg) setCheckMsg('');
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

        <span>Looking for: </span>
        {purposes.map((purpose, index) => (
          <label htmlFor={purpose}>
            <input type="checkbox" id={purpose} name={purpose} value={purpose} checked={checkedState[index]} onChange={() => handleOnCheck(index)} />
            {purpose}
          </label>
        ))}
        <p>{checkMsg}</p>
        <br />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default Signup;
