import React, { useEffect, useState } from 'react';
import {
  BrowserRouter, Routes, Route, Link, Navigate,
} from 'react-router-dom';
import decode from 'jwt-decode';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Logout from './components/Logout.jsx';

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
    <>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          {!auth && (
            <>
              {' '}
              |
              {' '}
              <Link to="/login">Log In</Link>
              {' '}
              |
              {' '}
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </nav>

        {auth && (
          <div>
            <span>
              Currently logged in as
              {' '}
              {user}
            </span>
            <Logout setAuth={setAuth} />
          </div>
        )}

        <Routes>
          <Route path="signup" element={<Signup setAuth={setAuth} />} />
          <Route path="login" element={<Login setAuth={setAuth} />} />
          <Route path="/" element={auth ? <Home /> : <Navigate replace to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
