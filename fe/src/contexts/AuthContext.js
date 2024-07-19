import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  userDetails: null,
  triggerAuthCheck: () => { }
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [authCheckTrigger, setAuthCheckTrigger] = useState(false);
  const [user, setUser] = useState(() => {
    return JSON.parse(sessionStorage.getItem("user"));
  });

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: user.username,
            password: user.password
          }),
        });

        if (!response.ok) {
          // alert('Login fail!!!');
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const access_token = data.accessToken;
        localStorage.setItem('accessToken', access_token);
        user = data.user;
        sessionStorage.setItem("user", JSON.stringify(user));
        console.log(JSON.parse(sessionStorage.getItem("user")));
        setIsAuthenticated(true);
        setUserDetails(user);
        // alert('Login Success');
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    checkAuthStatus();
  }, [authCheckTrigger]);

  const triggerAuthCheck = () => {
    setAuthCheckTrigger((prev) => !prev);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userDetails, triggerAuthCheck }}
    >
      {children}
    </AuthContext.Provider>
  );
};
