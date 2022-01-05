import PropTypes from 'prop-types';
import React from 'react';
import searchIcon from '../../images/searchIcon.svg';

function SearchBtn(props) {
  const { displaySearchBar } = props;

  return (
    <div>
      <button
        data-testid="search-top-btn"
        type="button"
        onClick={ displaySearchBar }
        // src={ searchIcon }
        // alt="searchIcon"
      >
        { searchIcon ? <img src={ searchIcon } alt="searchIcon" /> : 'search'}
      </button>
    </div>
  );
}

SearchBtn.propTypes = {
  displaySearchBar: PropTypes.func,
}.isRequired;

export default SearchBtn;
