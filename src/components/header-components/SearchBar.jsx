import React, { useState, useContext } from 'react';

import RecipesContext from '../../context/RecipesContext';
import fetchAPI from '../../services/fetchAPI';

function SearchBar() {
  const [searchBarInput, setSearchBarInput] = useState('');
  const { mealOrDrink } = useContext(RecipesContext);

  function handleInput({ target }) {
    const { value } = target;
    setSearchBarInput(value);
  }

  function getRadioEndpoint() {
    const radios = [...document.querySelectorAll('.search-bar-radio')];
    const checkedRadio = radios.find((radio) => radio.checked);
    return checkedRadio.value;
  }

  function getUrlByEndpoint() {
    const endpoint = getRadioEndpoint();
    let url;
    const firstLetterConditional = (searchBarInput.length > 1
      && endpoint === 'primeira-letra')
      ? global.alert('Sua busca deve conter somente 1 (um) caracter')
      : url = `https://www.${mealOrDrink}.com/api/json/v1/1/search.php?f=${searchBarInput}`;

    switch (endpoint) {
    case 'ingrediente':
      url = `https://www.${mealOrDrink}.com/api/json/v1/1/filter.php?i=${searchBarInput}`;
      return url;
    case 'nome':
      url = `https://www.${mealOrDrink}.com/api/json/v1/1/search.php?s=${searchBarInput}`;
      return url;
    case 'primeira-letra':
      return firstLetterConditional;
    default:
      return 'no endpoint';
    }
  }

  async function fecthByUrl() {
    const urlToFetch = getUrlByEndpoint();
    const response = await fetchAPI(urlToFetch);
    return console.log(response);
  }

  return (
    <div>
      <form className="search-bar">
        <label htmlFor="search-input">
          <input
            type="text"
            data-testid="search-input"
            onChange={ handleInput }
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
          onClick={ () => { fecthByUrl(); } }
          type="button"
        >
          Buscar

        </button>
      </form>
    </div>
  );
}

export default SearchBar;
