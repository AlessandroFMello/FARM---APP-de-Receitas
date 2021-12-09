import React from 'react';
import { Link } from 'react-router-dom';
import exploreIcon from '../../images/exploreIcon.svg';

function ExploreBtn() {
  return (
    <Link to="/explorar">
      <button
        type="button"
      >
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="explore"
        />
      </button>
    </Link>
  );
}

export default ExploreBtn;
