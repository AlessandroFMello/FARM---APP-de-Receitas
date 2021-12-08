import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function LoginPage({ history }) {
  const [email, setEmail] = useState({
    email: '',
  });
  const [password, setPassword] = useState({
    password: '',
  });

  useEffect(() => {
    localStorage.setItem('mealsToken', JSON.stringify(null));
    localStorage.setItem('cocktailsToken', JSON.stringify(null));
  }, []);

  function validateLogin() {
    const regexEmail = /\S+@\S+\.\S+/;
    const MIN_PASSWORD = 7;
    const validatingEmail = regexEmail.test(email.email);
    const validatingPassword = password.password.length >= MIN_PASSWORD;
    const validatingInputs = (validatingEmail && validatingPassword);
    return !validatingInputs;
  }

  function onSubmitLogin(e) {
    e.preventDefault();
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify(email));
    history.push('/comidas');
  }

  return (
    <form className="login-form" onSubmit={ (e) => onSubmitLogin(e) }>
      <label htmlFor="email">
        <input
          data-testid="email-input"
          id="email"
          onChange={ ({ target }) => setEmail({ email: target.value }) }
          placeholder="email"
          type="email"
          value={ email.email }
        />
      </label>
      <label htmlFor="password">
        <input
          data-testid="password-input"
          id="password"
          onChange={ ({ target }) => setPassword({ password: target.value }) }
          placeholder="password"
          type="password"
          value={ password.password }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        disabled={ validateLogin() }
        type="submit"
      >
        Login
      </button>
    </form>
  );
}

LoginPage.propTypes = {
  history: PropTypes.shape({}),
}.isRequired;

export default LoginPage;
