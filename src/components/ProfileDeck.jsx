import React, { useState } from 'react';
import ProfileCard from './ProfileCard.jsx';

const ProfileDeck = ({ users, setUsers, onVote }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [message, setMessage] = useState('');

  const swipe = async (swipedRight) => {
    // defo better logic can be used here just wanna get it working for now
    const tempUsers = [...users];
    tempUsers.shift();
    setUsers(tempUsers);
    setCurrentUser(tempUsers[0]);
    // const response = await axios.post('/api/swipe/create', { swipeeId: currentUser.id, swipedRight }, { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } });
    // console.log(response.data);
    // setMessage(response.data.message);
  };

  const handleVote = (user, vote) => {
    const tempUsers = [...users];
    tempUsers.pop();
    setUsers(tempUsers);

    onVote(user, vote);
  };

  return (
    <div className="overflow-hidden pt-40 w-full">
      {users.map((user, i) => {
        const isTop = i === users.length - 1;
        return (
          <ProfileCard key={user.name} drag={isTop} onVote={(result) => handleVote(user, result)} />
        );
      })}
    </div>
  );
};

export default ProfileDeck;
