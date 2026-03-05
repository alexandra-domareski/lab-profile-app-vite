import './App.css';
import HomePage from './components/HomePage';
import { Routes, Route } from 'react-router-dom';
import SingupPage from './components/SingupPage';
import LoginPage from './components/LoginPage';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/signup" element={<SingupPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
