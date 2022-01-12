import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import md5 from 'crypto-js/md5';

function ProfilePage() {
  function recoverFromLocalStorage() {
    const emailLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (emailLocalStorage !== null) {
      return emailLocalStorage.email;
    }
  }

  function hashGenerator() {
    const hash = md5(recoverFromLocalStorage()).toString();
    const src = `https://www.gravatar.com/avatar/${hash}`;
    return src;
  }

  return (
    <div className="profile">
      <div className="profile-page-container">
        <img
          data-testid="header-profile-picture"
          alt="imagem do usuário"
          src={ hashGenerator() }
          className="image-gravatar"
        />

        <div
          className="profile-email"
          data-testid="profile-email"
        >
          {recoverFromLocalStorage()}
        </div>
        <Link to="/receitas-feitas">
          <Button
            data-testid="profile-done-btn"
            type="button"
            variant="outline-dark"
          >
            Receitas Feitas
          </Button>
        </Link>
        <Link to="/receitas-favoritas">
          <Button
            data-testid="profile-favorite-btn"
            type="button"
            variant="outline-dark"
          >
            Receitas Favoritas
          </Button>
        </Link>
        <Link to="/">
          <Button
            data-testid="profile-logout-btn"
            type="button"
            variant="outline-dark"
            onClick={ () => localStorage.clear() }
          >
            Sair
          </Button>

        </Link>
      </div>
    </div>
  );
}

export default ProfilePage;
