import React from 'react';

function LoginPage() {
  return (
    <form className="login-form">
      <label htmlFor="email">
        <input
          data-testid="email-input"
          id="email"
          placeholder="email"
          type="email"
        />
      </label>
      <label htmlFor="password">
        <input
          data-testid="password-input"
          id="password"
          placeholder="password"
          type="password"
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}

export default LoginPage;
