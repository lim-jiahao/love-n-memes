import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { motion, useAnimation } from 'framer-motion';

import ProfileCard from './Card/ProfileCard.jsx';

const ProfileDeck = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [match, setMatch] = useState(false);
  const [expandedProfile, setExpandedProfile] = useState();

  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/user/unswiped', headers);
        const receivedUsers = response.data.users;
        setUsers(receivedUsers);
        setCurrentUser(receivedUsers[receivedUsers.length - 1].id);
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
      setMatch(!match);
      setTimeout(() => setMatch(false), 2000);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  console.log(expandedProfile, 'expanded');
  return (
    <div className="w-full ">
      <div
        className="w-full relative"
      >
        {users.length > 0 && users.map((user) => {
          const disabled = expandedProfile !== user.id && expandedProfile !== undefined;
          return (
            <ProfileCard
              key={user.name}
              swipe={swipe}
              user={user}
              disabled={disabled}
              onExpand={() => setExpandedProfile(user.id)}
              onCollapse={() => setExpandedProfile()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProfileDeck;
