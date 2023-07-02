//App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Home';
import Login from './Login';
import ProfilePage from './ProfilePage';
import CreateAppointment from './CreateAppointment';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <>
    <UserProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path='/profile' element={<ProfilePage/>} />
          <Route exact path="/create-appointment" element={<CreateAppointment />} />
        </Routes>
      </div>
    </Router>
    </UserProvider>
    </>
  );
}

export default App;
