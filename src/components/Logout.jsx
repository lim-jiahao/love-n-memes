import React from 'react';
import { LogoutIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuth(false);
    navigate('/login');
  };

  return (
    <button className="flex items-center w-48 bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full" type="button" onClick={handleLogout}>
      <LogoutIcon className="h-5 w-5 mr-1" />
      <span className="flex-1">Log Out</span>
    </button>
  );
};
export default Logout;
