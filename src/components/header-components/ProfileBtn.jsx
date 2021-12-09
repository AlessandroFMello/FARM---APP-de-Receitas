import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';

function ProfileBtn() {
  return (
    <div>
      <Link to="/perfil">
        <button
          type="button"
          className="profile-top-btn"
        >
          <img
            src={ profileIcon }
            alt="profileIcon"
            data-testid="profile-top-btn"
          />
        </button>
      </Link>
    </div>
  );
}

ProfileBtn.propTypes = {
  history: PropTypes.shape({}),
}.isRequired;

export default ProfileBtn;
