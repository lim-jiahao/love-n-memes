import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ChatMessages from './ChatMessages.jsx';

const ChatsList = ({ user }) => {
  const [matches, setMatches] = useState([]);
  const [selectedMatchId, setSelectedMatchId] = useState(null);

  useEffect(async () => {
    try {
      const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };
      const resp = await axios.get('/api/match/all', headers);
      setMatches(resp.data.matches);
    } catch (err) {
      console.error(err.response);
    }
  }, []);

  const handleUserClick = (i) => {
    setSelectedMatchId(i);
  };

  return (
    <div className="flex justify-evenly">
      {matches.length > 0 ? (
        <div className="flex flex-col">
          {matches.map((match) => (
            <button className={selectedMatchId === match.id ? 'opacity-100' : 'opacity-50'} type="button" onClick={() => handleUserClick(match.id)}>{match.match.name}</button>
          ))}
        </div>
      ) : <p>No matches yet :(</p>}
      {selectedMatchId !== null && <ChatMessages matchId={selectedMatchId} user={user} />}
    </div>
  );
};

export default ChatsList;
