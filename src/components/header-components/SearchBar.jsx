import React from 'react';
// import fetchAPI from '../../services/fetchAPI';

function SearchBar() {
  function getRadioEndpoint() {
    const radios = [...document.querySelectorAll('.search-bar-radio')];
    const checkedRadio = radios.find((radio) => radio.checked);
    return checkedRadio.value;
  }

  return (
    <div>
      <form className="search-bar">
        <label htmlFor="search-input">
          <input
            type="text"
            data-testid="search-input"
          />
        </label>
        <label htmlFor="search-bar-radio">
          <input
            data-testid="ingredient-search-radio"
            className="search-bar-radio"
            name="search-bar-radio"
            type="radio"
            value="ingrediente"
          />
          Ingrediente
        </label>
        <label htmlFor="search-bar-radio">
          <input
            data-testid="name-search-radio"
            className="search-bar-radio"
            name="search-bar-radio"
            type="radio"
            value="nome"
          />
          Nome
        </label>
        <label htmlFor="search-bar-radio">
          <input
            data-testid="first-letter-search-radio"
            className="search-bar-radio"
            name="search-bar-radio"
            type="radio"
            value="primeira-letra"
          />
          Primeira Letra
        </label>

        <button
          data-testid="exec-search-btn"
          onClick={ () => { console.log(getRadioEndpoint()); } }
          type="button"
        >
          Buscar

        </button>
      </form>
    </div>
  );
}

export default SearchBar;
