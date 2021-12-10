import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import foodGif from '../images/foodGif.gif';

function LoginPage({ history }) {
  const [email, setEmail] = useState({
    email: '',
  });
  const [password, setPassword] = useState({
    password: '',
  });

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
    <div className="login-page-container">
      <div className="login-items-container">
        <img className="login-gif" src={ foodGif } alt="foodGif" />
        <form className="login-form" onSubmit={ (e) => onSubmitLogin(e) }>
          <Form.Label htmlFor="email">
            <Form.Control
              data-testid="email-input"
              id="email"
              onChange={ ({ target }) => setEmail({ email: target.value }) }
              placeholder="E-mail"
              type="email"
              value={ email.email }
            />
          </Form.Label>
          <Form.Label htmlFor="password">
            <Form.Control
              data-testid="password-input"
              id="password"
              onChange={ ({ target }) => setPassword({ password: target.value }) }
              placeholder="Senha"
              type="password"
              value={ password.password }
            />
          </Form.Label>
          <Button
            data-testid="login-submit-btn"
            disabled={ validateLogin() }
            type="submit"
            variant="success"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  history: PropTypes.shape({}),
}.isRequired;

export default LoginPage;
