import React, { useState, useEffect } from 'react';
import authService from '../services/auth.service';

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      return authService
        .verifyToken(storedToken)
        .then((response) => {
          if (response.data && response.data._id) {
            return authService.getCurrentUser(storedToken);
          } else {
            throw new Error('Invalid token payload');
          }
        })
        .then((response) => {
          if (response.data) {
            setIsLoggedIn(true);
            setIsLoading(false);
            setUser(response.data);
          }
        })
        .catch((error) => {
          console.error('Auth error:', error);
          removeToken();
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      return Promise.resolve();
    }
  };

  const removeToken = () => {
    localStorage.removeItem('authToken');
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        updateUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
