import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ProfileDeck from './ProfileDeck.jsx';

const MatchArea = () => {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const token = localStorage.getItem('authToken');
    const response = await axios.get('/api/user/unswiped', { headers: { Authorization: `Bearer ${token}` } });
    setUsers(response.data.users);
    console.log(response.data.users, response.data.length);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 flex justify-center items-center h-full overflow-hidden">

      {users ? (
        <ProfileDeck
          users={users}
          setUsers={setUsers}
        />
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
