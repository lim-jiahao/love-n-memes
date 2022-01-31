import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  LocationMarkerIcon, BriefcaseIcon, PhotographIcon, PencilAltIcon, FilterIcon,
} from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout.jsx';

const Profile = ({ setAuth }) => {
  const [memes, setMemes] = useState([]);
  const [curUser, setCurUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };

        const resp = await axios.get('/api/profile/picture', headers);
        setMemes(resp.data.pictures);

        const currentUser = await axios.get('/api/user/self', headers);
        setCurUser(currentUser.data.user);
      } catch (err) {
        console.error(err.response);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <img className="w-36 h-36 rounded-full border-4 border-black" src={memes.length > 0 ? memes[0].filename : '/default.jpg'} alt="meme" />
      <div className="text-black mb-3 text-center">
        <div className="mb-1">
          <h1 className="text-4xl inline-block font-bold tracking-wider">
            {curUser.name?.split(' ')[0]}
          </h1>
          <p className="inline-block ml-4 font-light text-3xl">{curUser.age}</p>
        </div>
        <div className="flex items-center justify-center">
          <BriefcaseIcon className="h-4 w-4 mr-2" />
          <p className="font-light text-lg">{curUser.occupation}</p>
        </div>
        <div className="flex items-center justify-center">
          <LocationMarkerIcon className="h-4 w-4 mr-2" />
          <p className="font-light text-lg">{curUser.location}</p>
        </div>
      </div>

      <button className="flex items-center w-48 bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-4 rounded-full" onClick={() => navigate('/profile/upload')} type="button">
        <PhotographIcon className="h-5 w-5 mr-1" />
        <span className="flex-1">Upload Memes</span>
      </button>
      <button className="flex items-center w-48 bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-4 rounded-full" onClick={() => navigate('/profile/edit')} type="button">
        <PencilAltIcon className="h-5 w-5 mr-1" />
        <span className="flex-1">Edit Info</span>
      </button>
      <button className="flex items-center w-48 bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-4 rounded-full" onClick={() => navigate('/profile/filter')} type="button">
        <FilterIcon className="h-5 w-5 mr-1" />
        <span className="flex-1">Edit Filters</span>
      </button>
      <Logout setAuth={setAuth} />

    </div>
  );
};
export default Profile;
