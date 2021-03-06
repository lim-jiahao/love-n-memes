import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Part1 from './Signup/Part1.jsx';
import Part2 from './Signup/Part2.jsx';
import Part3 from './Signup/Part3.jsx';
import Success from './Signup/Success.jsx';

const Signup = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(18);
  const [location, setLocation] = useState('');
  const [occupation, setOccupation] = useState('');
  const [bio, setBio] = useState('');
  const [selectedGender, setSelectedGender] = useState(0); // selected index
  const [purposesChecked, setPurposesChecked] = useState(new Array(2).fill(false));
  const [purposeMsg, setPurposeMsg] = useState('');
  const [interestsChecked, setInterestsChecked] = useState(new Array(2).fill(false));
  const [interestMsg, setInterestMsg] = useState('');
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(100);
  const [swipeEverywhere, setSwipeEverywhere] = useState(false);
  const [curPart, setCurPart] = useState(1);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (interestsChecked.every((check) => !check)) {
      setInterestMsg('Please select at least 1!');
      return;
    }

    if (purposesChecked.every((check) => !check)) {
      setPurposeMsg('Please select at least 1!');
      return;
    }
    const data = {
      name: username,
      email,
      password,
      age,
      location,
      occupation,
      bio,
      selectedGender,
      purposesChecked,
      interestsChecked,
      ageMin,
      ageMax,
      swipeEverywhere,
    };

    try {
      const resp = await axios.post('/api/user/signup', data);
      const { token } = resp.data;
      if (token) {
        localStorage.setItem('authToken', token);
        // setAuth(true);
        setCurPart((prev) => prev + 1);
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
    <div className="max-w-md w-full m-auto bg-indigo-100 rounded p-5">
      <header className="flex flex-col items-center justify-center">
        <img className="w-40" src="logo.png" alt="logo" />
        <p className='font-["Ma_Shan_Zheng"] text-8xl'>Memeus</p>
      </header>

      {curPart === 1 && (
      <Part1
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        setCurPart={setCurPart}
      />
      )}

      {curPart === 2 && (
      <Part2
        age={age}
        setAge={setAge}
        occupation={occupation}
        setOccupation={setOccupation}
        location={location}
        setLocation={setLocation}
        bio={bio}
        setBio={setBio}
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
        setCurPart={setCurPart}
      />
      )}

      {curPart === 3 && (
        <form onSubmit={handleSignup}>
          <div>
            <Part3
              interestsChecked={interestsChecked}
              handleInterestCheck={handleInterestCheck}
              interestMsg={interestMsg}
              purposesChecked={purposesChecked}
              handlePurposeCheck={handlePurposeCheck}
              purposeMsg={purposeMsg}
              ageMin={ageMin}
              setAgeMin={setAgeMin}
              ageMax={ageMax}
              setAgeMax={setAgeMax}
              swipeEverywhere={swipeEverywhere}
              setSwipeEverywhere={setSwipeEverywhere}
              setCurPart={setCurPart}
            />
            <input className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-4 rounded" type="submit" value="Sign Up" />
          </div>
        </form>
      )}

      {curPart === 4 && (
        <Success setAuth={setAuth} />
      )}

      {curPart !== 4 && (
      <footer className="text-center">
        <span className="text-sm">
          Already have an account?
          <Link to="/login" className="text-indigo-700 hover:text-pink-700"> Log in!</Link>
        </span>
      </footer>
      )}
    </div>
  );
};

export default Signup;
