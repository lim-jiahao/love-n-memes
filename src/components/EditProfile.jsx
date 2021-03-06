import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfile = () => {
  // this should prob be queried from db by right but its def not changing so just hard code lol
  const purposes = ['Love', 'Friendship'];
  const genders = ['Male', 'Female'];

  const [username, setUsername] = useState('');
  const [age, setAge] = useState(18);
  const [location, setLocation] = useState('');
  const [occupation, setOccupation] = useState('');
  const [bio, setBio] = useState('');
  const [selectedGender, setSelectedGender] = useState(0); // selected index
  const [purposesChecked, setPurposesChecked] = useState(new Array(purposes.length).fill(false));
  const [purposeMsg, setPurposeMsg] = useState('');
  const [interestsChecked, setInterestsChecked] = useState(new Array(genders.length).fill(false));
  const [interestMsg, setInterestMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };

        const currentUser = await axios.get('/api/user/self', headers);
        const userInfo = currentUser.data.user;
        const purposesTemp = [false, false];
        userInfo.purposes.forEach((p) => { purposesTemp[p.id - 1] = true; });
        const interestsTemp = [false, false];
        userInfo.interests.forEach((i) => { interestsTemp[i.id - 1] = true; });

        setUsername(userInfo.name);
        setAge(userInfo.age);
        setLocation(userInfo.location);
        setOccupation(userInfo.occupation);
        setBio(userInfo.bio);
        setSelectedGender(userInfo.genderId - 1);
        setPurposesChecked(purposesTemp);
        setInterestsChecked(interestsTemp);
      } catch (err) {
        console.error(err.response);
      }
    })();
  }, []);

  const navigate = useNavigate();

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
      age,
      location,
      occupation,
      bio,
      selectedGender,
      purposesChecked,
      interestsChecked,
    };

    try {
      const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };
      const resp = await axios.put('/api/user/self', data, headers);
      navigate('/profile');
    } catch (err) {
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
    <>
      <div className="max-w-md w-full m-auto bg-indigo-100 rounded p-5">
        <form onSubmit={handleSignup}>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="name">
              Name
              <input className="w-full p-2 mb-4 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" name="name" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
          </div>

          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="age">
              Age
              <input className="w-full p-2 mb-4 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="number" name="age" value={age} min={18} onChange={(e) => setAge(e.target.value)} required />
            </label>
          </div>

          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="occupation">
              Occupation
              <input className="w-full p-2 mb-4 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" name="occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} required />
            </label>
          </div>

          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="location">
              Location
              <input className="w-full p-2 mb-4 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" name="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </label>
          </div>

          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="bio">
              Bio
              <textarea style={{ resize: 'none' }} className="w-full p-2 mb-2 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" name="bio" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Say something about yourself!" required />
            </label>
          </div>

          <div>
            <span className="block text-indigo-500">Gender</span>
            {genders.map((gender, index) => (
              <label htmlFor={gender} className="mr-2">
                <input className="mb-4 mr-1" type="radio" value={gender} checked={genders[selectedGender] === gender} onChange={() => setSelectedGender(index)} />
                {gender}
              </label>
            ))}
          </div>

          <div>
            <span className="block text-indigo-500">Interested In</span>
            {genders.map((gender, index) => (
              <label htmlFor={gender} className="mr-2">
                <input className="mb-4 mr-1" type="checkbox" value={gender} checked={interestsChecked[index]} onChange={() => handleInterestCheck(index)} />
                {gender}
              </label>
            ))}
            <span className="text-red-500 font-bold">{interestMsg}</span>
          </div>

          <div>
            <span className="block text-indigo-500">Looking For</span>
            {purposes.map((purpose, index) => (
              <label htmlFor={purpose} className="mr-2">
                <input className="mb-4 mr-1" type="checkbox" value={purpose} checked={purposesChecked[index]} onChange={() => handlePurposeCheck(index)} />
                {purpose}
              </label>
            ))}
            <span className="text-red-500 font-bold">{purposeMsg}</span>
          </div>

          <div>
            <input className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" type="submit" value="Update" />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
