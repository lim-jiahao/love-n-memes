import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = ({ setAuth }) => {
  // this should prob be queried from db by right but its def not changing so just hard code lol
  const purposes = ['Love', 'Friendship'];
  const genders = ['Male', 'Female'];

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(18);
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [selectedGender, setSelectedGender] = useState(0); // selected index
  const [purposesChecked, setPurposesChecked] = useState(new Array(purposes.length).fill(false));
  const [purposeMsg, setPurposeMsg] = useState('');
  const [interestsChecked, setInterestsChecked] = useState(new Array(genders.length).fill(false));
  const [interestMsg, setInterestMsg] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (interestsChecked.every((check) => !check)) {
      setInterestMsg('Please select at least 1');
      return;
    }

    if (purposesChecked.every((check) => !check)) {
      setPurposeMsg('Please select at least 1');
      return;
    }
    const data = {
      name: username,
      email,
      password,
      age,
      location,
      bio,
      selectedGender,
      purposesChecked,
      interestsChecked,
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

  const handleInterestCheck = (index) => {
    const updatedInterestsChecked = interestsChecked.map((item, i) => (index === i ? !item : item));
    setInterestsChecked(updatedInterestsChecked);
    if (interestMsg) setInterestMsg('');
  };

  const handlePurposeCheck = (index) => {
    const updatedPurposesChecked = purposesChecked.map((item, i) => (index === i ? !item : item));
    setPurposesChecked(updatedPurposesChecked);
    if (purposeMsg) setPurposeMsg('');
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

        <span>Gender: </span>
        {genders.map((gender, index) => (
          <label htmlFor={gender}>
            <input type="radio" value={gender} checked={genders[selectedGender] === gender} onChange={() => setSelectedGender(index)} />
            {gender}
          </label>
        ))}
        <br />

        <span>Interested in: </span>
        {genders.map((gender, index) => (
          <label htmlFor={gender}>
            <input type="checkbox" value={gender} checked={interestsChecked[index]} onChange={() => handleInterestCheck(index)} />
            {gender}
          </label>
        ))}
        <p>{interestMsg}</p>
        <br />

        <span>Looking for: </span>
        {purposes.map((purpose, index) => (
          <label htmlFor={purpose}>
            <input type="checkbox" value={purpose} checked={purposesChecked[index]} onChange={() => handlePurposeCheck(index)} />
            {purpose}
          </label>
        ))}
        <p>{purposeMsg}</p>
        <br />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default Signup;
