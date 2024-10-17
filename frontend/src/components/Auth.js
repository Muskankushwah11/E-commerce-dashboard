// Auth.js
import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuth = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      {isLogin ? (
        <>
          <Login />
          <p>
            Don't have an account?{' '}
            <button onClick={toggleAuth}>Register</button>
          </p>
        </>
      ) : (
        <>
          <Signup />
          <p>
            Already have an account?{' '}
            <button onClick={toggleAuth}>Login</button>
          </p>
        </>
      )}
    </div>
  );
};

export default Auth;
