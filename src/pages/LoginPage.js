import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCopyrightCircle } from 'react-icons/ai';
import foodGif from '../images/foodGif.gif';

function LoginPage({ history }) {
  const [email, setEmail] = useState({
    email: '',
  });
  const [password, setPassword] = useState({
    password: '',
  });

  const [visible, setVisible] = useState(false);

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

  function eyePassword() {
    if (!visible) {
      setVisible(true);
    } else {
      setVisible(false);
    }
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
              type={ !visible ? 'password' : 'text' }
              value={ password.password }
            />

          </Form.Label>
          <button
            type="button"
            onClick={ () => eyePassword() }
            className="button-visible"
          >
            { !visible
              ? <AiOutlineEyeInvisible className="icon-eye" />
              : <AiOutlineEye className="icon-eye" /> }

          </button>
          <Button
            data-testid="login-submit-btn"
            disabled={ validateLogin() }
            type="submit"
            variant="success"
          >
            Entrar
          </Button>
        </form>
        <p className="farm">
          <AiOutlineCopyrightCircle />
          Product by FARM
        </p>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  history: PropTypes.shape({}),
}.isRequired;

export default LoginPage;
