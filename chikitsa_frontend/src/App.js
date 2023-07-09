//App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Home';
import Login from './Login';
import ProfilePage from './ProfilePage';
import CreateAppointment from './CreateAppointment';
import { UserProvider } from './context/UserContext';
import SignupPage from './Signup';
import CreateTest from './CreateTest';
import AppointmentDetails from './AppointmentDetails';
import { UrlProvider } from './context/UrlContext';
import EditMedicalHistory from './EditMedicalHistory';

function App() {
  return (
    <>
    <UserProvider>
    <UrlProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path='/profile' element={<ProfilePage/>} />
          <Route exact path="/create-appointment" element={<CreateAppointment />} />
          <Route exact path="/appointment-details/:appointment_id" element={<AppointmentDetails />} />
          <Route exact path="/create-test" element={<CreateTest />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path='/edit-medical-history' element={<EditMedicalHistory />} />
        </Routes>
      </div>
    </Router>
    </UrlProvider>
    </UserProvider>
    </>
  );
}

export default App;
