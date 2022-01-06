import PropTypes from 'prop-types';
import React from 'react';
import searchIcon from '../../images/searchIcon.svg';

function SearchBtn(props) {
  const { displaySearchBar } = props;

  return (
    <div>
      <input
        alt="searchIcon"
        data-testid="search-top-btn"
        onClick={ displaySearchBar }
        src={ searchIcon }
        type="image"
      />
    </div>
  );
}

SearchBtn.propTypes = {
  displaySearchBar: PropTypes.func,
}.isRequired;

export default SearchBtn;
