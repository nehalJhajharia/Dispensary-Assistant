//App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Home';
import Login from './Login';
import ProfilePage from './ProfilePage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path='/profile' element={<ProfilePage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
