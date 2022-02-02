import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ChatIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import ProfileCard from './Card/ProfileCard.jsx';
import MatchAnimation from './Card/MatchAnimation.jsx';

const ProfileDeck = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [match, setMatch] = useState(false);
  const [expandedProfile, setExpandedProfile] = useState();

  const navigate = useNavigate();

  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/user/unswiped', headers);
        const receivedUsers = response.data.users;
        setUsers(receivedUsers);
        setCurrentUser(receivedUsers.length - 1);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const swipe = async (swipedRight) => {
    // defo better logic can be used here just wanna get it working for now
    try {
      // const response = await axios.post('/api/swipe/create', { swipeeId: users[currentUser].id, swipedRight }, headers);
      setCurrentUser(currentUser - 1);

      // if match
      setMatch(!match);
      setTimeout(() => setMatch(false), 2000);
    } catch (err) {
      console.log(err.response);
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

        <MatchAnimation match={match} />
        {currentUser === -1 && (
        <div className="flex flex-col items-center">
          <p className="font-bold mb-2">Seems like you've swiped on everyone...</p>
          <button className="flex items-center w-48 bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => navigate('/chats')} type="button">
            <ChatIcon className="h-5 w-5 mr-1" />
            <span className="flex-1">See Matches</span>
          </button>
        </div>
        )}

      </div>
    </div>
  );
};

export default ProfileDeck;
