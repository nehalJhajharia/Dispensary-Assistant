// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [user_id, setUserId] = useState();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
    // Here you can handle the authentication logic
    // e.g., make an API call to validate the credentials
    // or use any authentication library of your choice

    // Clear the input fields after submission
    setUserId();
    setPassword('');

    // Redirect to the profile page with the username as a URL parameter
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


// import React, { useState } from 'react';
// import './login.css';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Here you can handle the authentication logic
//     // e.g., make an API call to validate the credentials
//     // or use any authentication library of your choice

//     // Clear the input fields after submission
//     setUsername('');
//     setPassword('');
//   };

//   return (
//     <div className="container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           name="username"
//           value={username}
//           onChange={handleUsernameChange}
//           required
//         />
//         <label htmlFor="password">Password:</label>
//         <div className='password-input-container'>
//             <input
//             type={showPassword ? 'text' : 'password'}
//             id="password"
//             name="password"
//             value={password}
//             onChange={handlePasswordChange}
//             required
//             />
//             <button
//             type='button'
//             className='password-toggle-button'
//             onClick={togglePasswordVisibility}
//             >
//                 {showPassword ? 'Hide' : 'Show'}
//             </button>
//         </div>
//         <input type="submit" value="Login" />
//       </form>
//     </div>
//   );
// };

// export default Login;
