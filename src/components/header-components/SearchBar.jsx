import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import fetchAPI from '../../services/fetchAPI';

function SearchBar() {
  const { mealOrDrink, setRecipes } = useContext(RecipesContext);
  const history = useHistory();
  const [searchBarInput, setSearchBarInput] = useState('');
  const [radioValue, setRadioValue] = useState('');

  function handleInput({ target }) {
    const { value } = target;
    setSearchBarInput(value);
  }

  function getUrlByEndpoint() {
    const urlByEndpoint = {
      ingrediente: `https://www.${mealOrDrink}.com/api/json/v1/1/filter.php?i=${searchBarInput}`,
      nome: `https://www.${mealOrDrink}.com/api/json/v1/1/search.php?s=${searchBarInput}`,
      primeiraLetra: `https://www.${mealOrDrink}.com/api/json/v1/1/search.php?f=${searchBarInput}`,
    };

    return urlByEndpoint[radioValue];
  }

  async function fecthByUrl() {
    const urlToFetch = getUrlByEndpoint();
    const response = await fetchAPI(urlToFetch);

    return response;
  }

  async function addToRecipesContext() {
    const response = await fecthByUrl();
    const scheme = {
      themealdb: ['meals', 'comidas', 'idMeal'],
      thecocktaildb: ['drinks', 'bebidas', 'idDrink'],
    };
    const recipes = response[scheme[mealOrDrink][0]];

    setRecipes(response);

    if (recipes.length === 0) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }

    if (recipes.length === 1) {
      history.push(`/${scheme[mealOrDrink][1]}/${recipes[0][scheme[mealOrDrink][2]]}`);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (radioValue === 'primeiraLetra' && searchBarInput.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      addToRecipesContext();
    }
  }

  return (
    <div>
      <form className="search-bar" onSubmit={ handleSubmit }>
        <label htmlFor="search-input">
          <input
            type="text"
            data-testid="search-input"
            value={ searchBarInput }
            onChange={ handleInput }
          />
        </label>
        <label htmlFor="ingrediente">
          <input
            type="radio"
            className="search-bar-radio"
            data-testid="ingredient-search-radio"
            id="ingrediente"
            name="search-bar-radio"
            value="ingrediente"
            checked={ radioValue === 'ingrediente' }
            onChange={ (e) => setRadioValue(e.target.value) }
          />
          Ingrediente
        </label>
        <label htmlFor="nome">
          <input
            type="radio"
            className="search-bar-radio"
            data-testid="name-search-radio"
            id="nome"
            name="search-bar-radio"
            value="nome"
            checked={ radioValue === 'nome' }
            onChange={ (e) => setRadioValue(e.target.value) }
          />
          Nome
        </label>
        <label htmlFor="primeira-letra">
          <input
            type="radio"
            className="search-bar-radio"
            data-testid="first-letter-search-radio"
            id="primeira-letra"
            name="search-bar-radio"
            value="primeiraLetra"
            checked={ radioValue === 'primeiraLetra' }
            onChange={ (e) => setRadioValue(e.target.value) }
          />
          Primeira Letra
        </label>

        <button
          type="submit"
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
