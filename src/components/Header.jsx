import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ProfileBtn from './header-components/ProfileBtn';
import SearchBar from './header-components/SearchBar';
import SearchBtn from './header-components/SearchBtn';

function Header(props) {
  const [isClicked, setIsClicked] = useState(false);

  const { pageName } = props;

  function displaySearchBar() {
    if (isClicked) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  }

  return (
    <div className="header-container">
      <div className="header">
        <ProfileBtn />

        <h1 data-testid="page-title">{ pageName }</h1>

        <SearchBtn displaySearchBar={ displaySearchBar } />
      </div>
      {
        isClicked && <SearchBar />
      }
    </div>
  );
}

Header.propTypes = {
  pageName: PropTypes.string,
}.isRequired;

Header.propTypes = {
  pageName: PropTypes.string,
}.isRequired;

export default Header;
