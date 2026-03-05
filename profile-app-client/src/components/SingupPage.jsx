import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

const SingupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [campus, setCampus] = useState('');
  const [course, setCourse] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const nav = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password, campus, course };

    authService
      .signUp(requestBody)
      .then(() => nav('/login'))
      .catch((error) => {
        const errorDescription =
          error.response?.data?.message || 'An error occurred';
        setErrorMessage(errorDescription);
      });
  };

  const campusOptions = [
    'Madrid',
    'Barcelona',
    'Miami',
    'Paris',
    'Berlin',
    'Amsterdam',
    'México',
    'Sao Paulo',
    'Lisbon',
    'Remote',
  ];

  const courseOptions = [
    'Web Dev',
    'UX/UI',
    'Data Analytics',
    'Cyber Security',
  ];

  return (
    <div className="card">
      <form onSubmit={handleSignupSubmit}>
        <div className="left-side">
          <h1 className="title">Sign up</h1>
          <label>Username</label>
          <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Campus</label>
          <select
            name="campus"
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
            required
          >
            <option value="">Select a campus</option>
            {campusOptions.map((camp) => (
              <option key={camp} value={camp}>
                {camp}
              </option>
            ))}
          </select>

          <label>Course</label>
          <select
            name="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          >
            <option value="">Select a course</option>
            {courseOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="right-side">
          <h2 className="singup-hello">Hello!!</h2>
          <h3>Welcome to IronProfile!</h3>

          <p className="singup-intro">
            If you signup, you agree with all our terms and conditions where we
            can do whatever we want with the data!
          </p>

          <button type="submit" className="btn create-user">
            Create the Account
          </button>

          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};
export default SingupPage;
