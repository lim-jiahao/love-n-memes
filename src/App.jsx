import React, { useEffect, useState } from 'react';
import {
  BrowserRouter, Routes, Route, NavLink, Navigate,
} from 'react-router-dom';
import decode from 'jwt-decode';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Profile from './components/Profile.jsx';
import ChatsList from './components/ChatsList.jsx';
import MemeUpload from './components/MemeUpload.jsx';

const App = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    // currently no authentication on the token is being done (no jwt.verify)
    // i saw this should be done on server side
    // when app is more fleshed out, we prob will do some axios get request to the backend
    // to get data and populate the page. the token will then be authenticated on the backend
    //  someone may access a protected page on the frontend but no data will be sent to them
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuth(false);
      return;
    }
    try {
      const { username, exp } = decode(token);
      if (!username || exp < new Date().getTime() / 1000) {
        setAuth(false);
        return;
      }
      setAuth(true);
      setUser(username);
    } catch (e) {
      setAuth(false);
    }
  });

  return (
    <div className="max-w-7xl p-20 m-auto">
      <BrowserRouter>
        {auth && (
          <div className="w-full mb-6">
            <nav className="flex justify-evenly">
              <NavLink to="/profile" className={({ isActive }) => `${isActive ? 'fas' : 'far'} fa-user fa-2x`}><i /></NavLink>
              <NavLink to="/" className={({ isActive }) => `${isActive ? 'fas' : 'far'} fa-laugh-squint fa-2x`}><i /></NavLink>
              <NavLink to="/chats" className={({ isActive }) => `${isActive ? 'fas' : 'far'} fa-comments fa-2x`}><i /></NavLink>

            </nav>
          </div>
        )}

        <Routes>
          <Route path="signup" element={<Signup setAuth={setAuth} />} />
          <Route path="login" element={<Login setAuth={setAuth} />} />
          <Route
            path="/"
            element={auth ? <Home /> : <Login setAuth={setAuth} />}
          />
          <Route
            path="profile"
            element={auth ? <Profile setAuth={setAuth} /> : <Login setAuth={setAuth} />}
          />
          <Route
            path="profile/upload"
            element={auth ? <MemeUpload /> : <Login setAuth={setAuth} />}
          />
          <Route
            path="chats"
            element={auth ? <ChatsList user={user} /> : <Login setAuth={setAuth} />}
          />
        </Routes>

        {/* {auth && <Home />} */}
      </BrowserRouter>
    </div>
  );
};

export default App;
