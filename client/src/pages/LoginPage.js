import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';

const LoginPage = () => {
  const [isRegistering] = useState(false);

  return (
    <div className="registration-page">
      <h1>{isRegistering ? 'Регистрация' : '.'}</h1>
      {isRegistering ? (
        <RegistrationForm />
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default LoginPage;

