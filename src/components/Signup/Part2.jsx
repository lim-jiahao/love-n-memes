import React from 'react';
import { ArrowNarrowLeftIcon } from '@heroicons/react/outline';
import ProgressBar from './ProgessBar.jsx';

const Part2 = ({
  age, setAge, occupation, setOccupation, location, setLocation,
  bio, setBio, selectedGender, setSelectedGender, setCurPart,
}) => {
  const genders = ['Male', 'Female'];

  const handleNext = async (e) => {
    e.preventDefault();
    setCurPart((prev) => prev + 1);
  };

  return (
    <form onSubmit={handleNext}>
      <div className="relative">
        <ArrowNarrowLeftIcon className="absolute h-5 w-5 opacity-80 hover:opacity-100 cursor-pointer" onClick={() => setCurPart((cur) => cur - 1)} />
        <p className="text-center font-bold text-sm">Now some basic info about yourself...</p>
      </div>
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
        <input className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-4 rounded" type="submit" value="Next" />
      </div>
    </form>
  );
};

export default Part2;
