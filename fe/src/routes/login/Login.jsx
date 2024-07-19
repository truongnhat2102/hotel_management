import { useState } from 'react';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/ux/toast/Toast';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState(false);


  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        alert('Login fail!!!');
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const access_token = data.accessToken;
      localStorage.setItem('accessToken', access_token);
      const user = data.user;
      sessionStorage.setItem("user", JSON.stringify(user));
      console.log(JSON.parse(sessionStorage.getItem("user")));
      alert('Login Success');
      navigate('/')
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }

  };

  const responseGoogle = async (response) => {
    const tokenId = response.credential;
    console.log(tokenId);
    try {
      const response = await fetch('http://localhost:8080/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: tokenId }),
      });

      if (!response.ok) {
        alert('Login fail!!!');
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const access_token = data.accessToken;
      localStorage.setItem('accessToken', access_token);
      const user = data.customer;
      sessionStorage.setItem("user", JSON.stringify(user));
      console.log(JSON.parse(sessionStorage.getItem("user")));
      alert('Login Success');
      navigate('/')
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  const dismissError = () => {
    setErrorMessage('');
  };

  return (
    <>
      <div className="login__form">
        <div className="container mx-auto p-4 flex justify-center min-h-[600px] items-center">
          <form
            onSubmit={handleLoginSubmit}
            className="w-full max-w-lg p-4 md:p-10 shadow-md"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-brand">
                Welcome Back
              </h2>
              <p className="text-gray-500">
                Log in to continue to your account
              </p>
            </div>
            <div className="mb-6">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={loginData.username}
                onChange={handleInputChange}
                autoComplete="username"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleInputChange}
                autoComplete="current-password"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            {errorMessage && (
              <Toast
                type="error"
                message={errorMessage}
                dismissError={dismissError}
              />
            )}
            <div className="items-center">
              <div>
                <button
                  type="submit"
                  className="bg-brand hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Log In
                </button>
              </div>
              <div className="w-full ">
                <div className="text-center text-gray-500 py-[10px]">Or</div>
                <div className="flex justify-center">
                  {/* <GoogleLogin
                    size="large"
                    width="1000px"
                    onSuccess={(credentialResponse) => {
                      console.log('credentialResponse', credentialResponse);
                      if (credentialResponse.credential) {
                        context.triggerAuthCheck();
                        navigate('/user-profile');
                      }
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  /> */}
                  <GoogleOAuthProvider clientId='173698177497-a6i697njfg5r11d869irhujufpscvpim.apps.googleusercontent.com'>
                    <div>
                      <GoogleLogin
                        size="large"
                        width="1000px"
                        onSuccess={responseGoogle}
                        onError={responseGoogle}
                      />
                    </div>
                  </GoogleOAuthProvider>
                </div>
              </div>
              <div className="flex flex-wrap justify-center my-6 w-full">
                <Link
                  to="/forgot-password"
                  className="inline-block align-baseline text-md text-gray-500 hover:text-blue-800 text-right"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute left-0 right-0 flex justify-center items-center">
                  <div className="border-t w-full absolute"></div>
                  <span className="bg-white px-3 text-gray-500 z-10">
                    New to Stay Booker?
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center my-3 w-full mt-12">
                <Link
                  to="/register"
                  className="inline-block align-baseline font-medium text-md text-brand hover:text-blue-800 text-right"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
