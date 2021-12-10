import PropTypes from 'prop-types';
import React from 'react';
import searchIcon from '../../images/searchIcon.svg';

function SearchBtn(props) {
  const { displaySearchBar } = props;

  return (
    <div>
      <input
        data-testid="search-top-btn"
        type="image"
        onClick={ displaySearchBar }
        src={ searchIcon }
        alt="searchIcon"
      />
    </div>
  );
}

SearchBtn.propTypes = {
  displaySearchBar: PropTypes.func,
}.isRequired;

export default SearchBtn;
