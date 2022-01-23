import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MatchArea = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(async () => {
    const token = localStorage.getItem('authToken');
    const response = await axios.get('/api/user/unswiped', { headers: { Authorization: `Bearer ${token}` } });
    setUsers(response.data.users);
    setCurrentUser(response.data.users[0]);
    console.log(response.data.users);
  }, []);

  const swipeRight = () => {
    // defo better logic can be used here just wanna get it working for now
    console.log('clicked?');
    const tempUsers = [...users];
    tempUsers.shift();
    setUsers(tempUsers);
    setCurrentUser(tempUsers[0]);
  };

  const swipeLeft = () => {
    // currently not much logic for this as we dont have a table that stores users
    // that have been swiped left
  };

  return (

    <div className="max-w-7xl mx-auto px-4 flex justify-center items-center">
      <div className="max-w-3xl mx-auto">
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl ">
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              {/* <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" /> */}
            </div>
            <div className="mt-3 text-center">
              {/* <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                Payment successful
              </Dialog.Title> */}
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {currentUser.name}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 flex">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={swipeLeft}
            >
              No
            </button>
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={swipeRight}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchArea;
