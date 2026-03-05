import { useState, useContext } from 'react';
import authService from '../services/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const nav = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password };

    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        return authenticateUser();
      })
      .then(() => {
        nav('/profile');
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data?.message || 'An error occurred';
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="card">
      <form onSubmit={handleLoginSubmit}>
        <div className="left-side">
          <h1 className="title">Log in</h1>
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

          <p>
            If you don't have an account yet, you can create your account{' '}
            <Link to="/signup">here</Link>
          </p>
        </div>

        <div className="right-side">
          <h2 className="login-hello">Hello!!</h2>
          <h3>Awesome to have at IronProfile again!</h3>

          <p className="login-intro">
            If you signup, you agree with all our terms and conditions where we
            can do whatever we want with the data!
          </p>
          <button type="submit" className="btn login-user">
            Log in
          </button>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};
export default LoginPage;
