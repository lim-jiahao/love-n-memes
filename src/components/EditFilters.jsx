import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditFilters = () => {
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(100);
  const [location, setLocation] = useState('');
  const [swipeEverywhere, setSwipeEverywhere] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };

        const currentUser = await axios.get('/api/user/self', headers);
        const userInfo = currentUser.data.user;

        setAgeMin(userInfo.ageMin);
        setAgeMax(userInfo.ageMax);
        setLocation(userInfo.location);
        setSwipeEverywhere(userInfo.swipeEverywhere);
      } catch (err) {
        console.error(err.response);
      }
    })();
  }, []);

  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };

      const data = { ageMin, ageMax, swipeEverywhere };
      const resp = await axios.put('/api/user/filters', data, headers);
      navigate('/profile');
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <>
      <div className="max-w-md w-full m-auto bg-indigo-100 rounded p-5">
        <form onSubmit={handleUpdate}>

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
              {location}
            </label>
            <label htmlFor="everywhere" className="mr-2">
              <input className="mb-4 mr-1" type="radio" checked={swipeEverywhere} onChange={() => setSwipeEverywhere(!swipeEverywhere)} />
              Everywhere
            </label>
          </div>

          <div>
            <input className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" type="submit" value="Update" />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditFilters;
