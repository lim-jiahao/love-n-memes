import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard.jsx';

const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };

const ProfileDeck = ({ onVote }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [message, setMessage] = useState('');

  useEffect(async () => {
    try {
      const response = await axios.get('/api/user/unswiped', headers);
      const receivedUsers = response.data.users;
      console.log(receivedUsers);
      setUsers(receivedUsers);
      setCurrentUser(receivedUsers[receivedUsers.length - 1]);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const swipe = async (swipedRight) => {
    // defo better logic can be used here just wanna get it working for now
    console.log(swipedRight);
    console.log(currentUser);
    const tempUsers = [...users];
    tempUsers.pop();
    setUsers(tempUsers);
    setCurrentUser(tempUsers[tempUsers.length - 1]);
    const response = await axios.post('/api/swipe/create', { swipeeId: currentUser.id, swipedRight }, headers);
    console.log(response.data);
    setMessage(response.data.message);
  };

  return (
    <div className="overflow-hidden pt-40 w-full">

      {users.length > 1 && users.map((user, i) => {
        const isTop = i === users.length - 1;
        return (
          <ProfileCard key={user.name} isTop={isTop} swipe={swipe} user={user} />
        );
      })}
    </div>
  );
};

export default ProfileDeck;
