// Login.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { UserContext } from './context/UserContext';

const Login = () => {
  const [user_id, setUserId] = useState();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //set the value of user_id
  const {setUserId:setContextUserId} = useContext(UserContext);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setContextUserId(user_id);

    // Clear the input fields after submission
    setUserId('');
    setPassword('');

    // Redirect to the profile page 
    navigate(`/profile`);
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user_id">User ID:</label>
        <input
          type="text"
          id="user_id"
          name="user_id"
          value={user_id}
          onChange={handleUserIdChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button
            type="button"
            className="password-toggle-button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;