import React, { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';

const RegistrationPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="registration-page">
      <h1>{isRegistering ? 'Регистрация' : '.'}</h1>
      <RegistrationForm onToggleForm={toggleForm} />
    </div>
  );
};

export default RegistrationPage;
