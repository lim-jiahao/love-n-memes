import React from 'react';
import ProgressBar from './ProgessBar.jsx';

const Part2 = ({
  age, setAge, occupation, setOccupation, location, setLocation,
  bio, setBio, selectedGender, setSelectedGender, interestsChecked,
  handleInterestCheck, interestMsg, purposesChecked,
  handlePurposeCheck, purposeMsg,
}) => {
  // this should prob be queried from db by right but its def not changing so just hard code lol
  const purposes = ['Love', 'Friendship'];
  const genders = ['Male', 'Female'];

  return (
    <>
      <ProgressBar step={2} />
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
    </>
  );
};

export default Part2;
