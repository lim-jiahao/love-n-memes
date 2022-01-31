import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditFilters = () => {
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(100);

  useEffect(() => {
    (async () => {
      try {
        const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };

        const currentUser = await axios.get('/api/user/self', headers);
        const userInfo = currentUser.data.user;

        setAgeMin(userInfo.ageMin);
        setAgeMax(userInfo.ageMax);
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

      const data = { ageMin, ageMax };
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
            <input className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" type="submit" value="Update" />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditFilters;
