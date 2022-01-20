import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuth(false);
    navigate('/login');
  };

  return (<button type="button" onClick={handleLogout}>Log Out</button>);
};
export default Logout;
