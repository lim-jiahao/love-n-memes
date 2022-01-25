import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ChatMessages from './ChatMessages.jsx';

const ChatsList = ({ user }) => {
  const [matches, setMatches] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [roomId, setRoomId] = useState(null);

  useEffect(async () => {
    try {
      const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };
      const resp = await axios.get('/api/match/all', headers);
      setMatches(resp.data.matches);
    } catch (err) {
      console.error(err.response);
    }
  }, []);

  const handleUserClick = (i, room) => {
    setSelectedUserId(i);
    setRoomId(room);
  };

  return (
    <div className="flex justify-evenly">
      {matches.length > 0 ? (
        <div className="flex flex-col">
          {matches.map((match, index) => (
            <button className={selectedUserId === index ? 'opacity-100' : 'opacity-50'} type="button" onClick={() => handleUserClick(index, match.roomId)}>{match.match.name}</button>
          ))}
        </div>
      ) : <p>No matches yet :(</p>}
      {roomId !== null && <ChatMessages id={roomId} user={user} />}
    </div>
  );
};

export default ChatsList;
