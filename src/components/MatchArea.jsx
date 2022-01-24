import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ProfileDeck from './ProfileDeck.jsx';

const MatchArea = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [message, setMessage] = useState('');

  useEffect(async () => {
    const token = localStorage.getItem('authToken');
    const response = await axios.get('/api/user/unswiped', { headers: { Authorization: `Bearer ${token}` } });
    setUsers(response.data.users);
    setCurrentUser(response.data.users[0]);
    console.log(response.data.users, response.data.length);
  }, []);

  const swipe = async (swipedRight) => {
    // defo better logic can be used here just wanna get it working for now
    console.log('clicked?');
    const tempUsers = [...users];
    tempUsers.shift();
    setUsers(tempUsers);
    setCurrentUser(tempUsers[0]);
    const response = await axios.post('/api/swipe/create', { swipeeId: currentUser.id, swipedRight }, { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } });
    console.log(response.data);
    setMessage(response.data.message);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 flex justify-center items-center h-full">

      {currentUser ? (
        <ProfileDeck users={users} />
      )
        : (
          <div>
            no more users around your area
          </div>
        )}
    </div>

  );
};

export default MatchArea;
