import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { motion, useAnimation } from 'framer-motion';

import ProfileCard from './Card/ProfileCard.jsx';
import MatchAnimation from './Card/MatchAnimation.jsx';
import TestAnimation from './Card/testAnimation.jsx';

const ProfileDeck = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [message, setMessage] = useState('');
  const [match, setMatch] = useState(false);

  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/user/unswiped', headers);
        const receivedUsers = response.data.users;
        console.log(receivedUsers);
        setUsers(receivedUsers);
        setCurrentUser(receivedUsers[receivedUsers.length - 1]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const swipe = async (swipedRight) => {
    // defo better logic can be used here just wanna get it working for now
    try {
      const tempUser = [...users];
      // const response = await axios.post('/api/swipe/create', { swipeeId: currentUser.id, swipedRight }, headers);
      // console.log(response.data);
      // setMessage(response.data.message);
      setCurrentUser(tempUser[tempUser.indexOf(currentUser) - 1]);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const controls = useAnimation();

  const handleClick = () => {
    setMatch(!match);
  };

  return (
    <div className="w-full ">
      <div
        className="w-full relative"
      >
        {users.length > 0 && users.map((user) => (
          <ProfileCard
            key={user.name}
            swipe={swipe}
            user={user}
          />
        ))}
      </div>

      <MatchAnimation match={match} />

      <button onClick={handleClick}> match</button>
    </div>
  );
};

export default ProfileDeck;
