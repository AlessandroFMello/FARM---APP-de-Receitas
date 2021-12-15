import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function ProfilePage() {
  function recoverFromLocalStorage() {
    const emailLocalStorage = JSON.parse(localStorage.getItem('user'));
    return emailLocalStorage.email;
  }

  return (
    <div className="profile-page-container">
      <div data-testid="profile-email">
        {localStorage.getItem('user') > 0 && recoverFromLocalStorage()}
      </div>
      <Link to="/receitas-feitas">
        <Button
          data-testid="profile-done-btn"
          type="button"
          variant="secondary"
        >
          Receitas Feitas
        </Button>
      </Link>
      <Link to="/receitas-favoritas">
        <Button
          data-testid="profile-favorite-btn"
          type="button"
          variant="secondary"
        >
          Receitas Favoritas
        </Button>
      </Link>
      <Link to="/">
        <Button
          data-testid="profile-logout-btn"
          type="button"
          variant="secondary"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </Button>

      </Link>
    </div>
  );
}

export default ProfilePage;
