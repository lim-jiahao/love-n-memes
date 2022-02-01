import React from 'react';
import { ArrowNarrowLeftIcon } from '@heroicons/react/outline';
import ProgressBar from './ProgessBar.jsx';

const Part3 = ({
  interestsChecked, handleInterestCheck, interestMsg, purposesChecked,
  handlePurposeCheck, purposeMsg,
  ageMin, setAgeMin, ageMax, setAgeMax, swipeEverywhere, setSwipeEverywhere, setCurPart,
}) => {
  const purposes = ['Love', 'Friendship'];
  const genders = ['Male', 'Female'];

  return (
    <>
      <div className="relative">
        <ArrowNarrowLeftIcon className="absolute h-5 w-5 opacity-80 hover:opacity-100 cursor-pointer" onClick={() => setCurPart((cur) => cur - 1)} />
        <p className="text-center font-bold text-sm">Almost done! Tell us your preferences...</p>
      </div>
      <ProgressBar step={3} />

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
        <label className="block mb-2 text-indigo-500" htmlFor="age">
          Show Ages:
          <br />
          <input className="w-1/4 p-2 mb-4 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="number" name="age" value={ageMin} min={18} max={ageMax} onChange={(e) => setAgeMin(e.target.value)} required />
          {' - '}
          <input className="w-1/4 p-2 mb-4 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="number" name="age" value={ageMax} min={ageMin} max={100} onChange={(e) => setAgeMax(e.target.value)} required />
        </label>
      </div>

      <div>
        <span className="block text-indigo-500">Swipe In:</span>
        <label htmlFor="user-location" className="mr-2">
          <input className="mb-4 mr-1" type="radio" checked={!swipeEverywhere} onChange={() => setSwipeEverywhere(!swipeEverywhere)} />
          Your Location
        </label>
        <label htmlFor="everywhere" className="mr-2">
          <input className="mb-4 mr-1" type="radio" checked={swipeEverywhere} onChange={() => setSwipeEverywhere(!swipeEverywhere)} />
          Everywhere
        </label>
      </div>
    </>
  );
};

export default Part3;
