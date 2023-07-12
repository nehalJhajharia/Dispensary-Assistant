import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import './login.css';
import saveUserData from './local-data/UserSet';
import setPage from './local-data/CurrentPageSet';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Set the value of username
  const { setUserId: setContextUserId } = useContext(UserContext);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setContextUserId(username);
    const user = {
      name: 'jha',
      id: username,
    };
    saveUserData(user);
    setPage('profile');

    // Clear the input fields after submission
    setUsername('');
    setPassword('');

    // Redirect to the profile page
    navigate('/profile');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="container p-5">
      <div className="login-form" style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <img
          src="https://www.svnit.ac.in/conference/frsm2023/hit/svnit_logo.png"
          alt="logo"
          height="100vh"
          className="navbar-img"
        />
        <div className="mb-3"></div>
        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              className="form-control"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder=" "
              required
            />
            <label htmlFor="username" className="form-label text-center" style={{ width: '100%' }}>
              Username
            </label>
          </div>
          <div className="form-floating">
            <input
              className="form-control"
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder=" "
              required
            />
            <label htmlFor="password" className="form-label text-center" style={{ width: '100%' }}>
              Password
            </label>
          </div>
          <button type="submit" className="mt-3 btn btn-success" style={{width:'100%'}}>
              Login
          </button>
          <hr style={{ width: '80%', marginInline: 'auto' }} />
          <button type="button" className="btn btn-success" style={{width:'100%'}} onClick={handleSignup}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
