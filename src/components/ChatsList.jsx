import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ChatMessages from './ChatMessages.jsx';

const ChatsList = () => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    if (!selectedMatch) {
      (async () => {
        try {
          const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };
          const resp = await axios.get('/api/match/all', headers);
          console.log(resp);
          setMatches(resp.data.matches);
        } catch (err) {
          console.error(err.response);
        }
      })();
    }
  }, [selectedMatch]);

  const handleUserClick = (match) => {
    setSelectedMatch(match);
  };

  const handleKeyPress = (e, match) => {
    if (e.key === 'Enter') setSelectedMatch(match);
  };

  const getFormattedDate = (date) => {
    const dayStart = moment().startOf('day');
    const weekStart = moment().subtract(1, 'w');
    const momentDate = moment(date);

    if (momentDate >= dayStart) return momentDate.format('HH:mm');
    if (momentDate >= weekStart) return momentDate.format('ddd');

    return momentDate.format('DD/MM/YYYY');
  };

  const getFormattedPreview = (msg, matchedUser) => {
    let sender = '';

    if (msg.senderId === matchedUser.id) sender = `${matchedUser.name.split(' ')[0]}`;
    else sender = 'You';

    if (msg.body.length <= 45) return `${sender}: ${msg.body}`;

    return `${sender}: ${msg.body.slice(0, 46)}...`;
  };

  return (
    <>
      {selectedMatch === null && (
        matches.length > 0 ? (
          <div className="flex flex-col items-center">
            {matches.map((match) => (
              <div role="button" tabIndex={0} className="flex items-center w-1/2 mb-2 border-b-2 p-2 opacity-60 hover:opacity-100" onClick={() => handleUserClick(match)} onKeyDown={(e) => handleKeyPress(e, match)}>
                <img className="w-14 h-14 mr-2 rounded-full border-2 border-black" src={match.match.pictures.length > 0 ? match.match.pictures[0].filename : '/default.jpg'} alt="meme" />
                <div className="flex-1">
                  <p className="font-bold text-sm">{match.match.name}</p>
                  <p>{match.message.length > 0 ? getFormattedPreview(match.message[0], match.match) : 'No messages yet'}</p>
                </div>
                <div>
                  {match.message.length > 0
                && getFormattedDate(match.message[0].createdAt)}
                </div>
              </div>
            ))}
          </div>
        ) : <p>No matches yet :(</p>
      )}
      {selectedMatch !== null
      && <ChatMessages match={selectedMatch} setSelectedMatch={setSelectedMatch} />}
    </>
  );
};

export default ChatsList;
