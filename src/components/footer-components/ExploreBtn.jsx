import React from 'react';
import { Link } from 'react-router-dom';
import exploreIcon from '../../images/exploreIcon.svg';

function ExploreBtn() {
  return (
    <Link to="/explorar">
      <input
        className="svg"
        type="image"
        data-testid="explore-bottom-btn"
        src={ exploreIcon }
        alt="explore"
      />
    </Link>
  );
}

export default ExploreBtn;
