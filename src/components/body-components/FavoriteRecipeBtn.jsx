import React, { useState, useContext, useEffect } from 'react';
import notFavoriteIcon from '../../images/whiteHeartIcon.svg';
import favoritedIcon from '../../images/blackHeartIcon.svg';
import RecipesContext from '../../context/RecipesContext';

function FavoriteRecipeBtn() {
  const {
    ifDoesntExistsCreateALocalStorageKey,
    setAnyToLocalStorage,
    getAnyFromLocalStorage,
    recipe,
  } = useContext(RecipesContext);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    ifDoesntExistsCreateALocalStorageKey('favoriteRecipes', []);
  }, [ifDoesntExistsCreateALocalStorageKey]);

  useEffect(() => {
    const favoriteRecipesLocalStorage = getAnyFromLocalStorage('favoriteRecipes');
    let isFavorite = false;
    const wichApi = {
      comidas: 'strMeal',
      bebidas: 'strDrink',
    };
    if (favoriteRecipesLocalStorage !== null) {
      const favorites = JSON.parse(favoriteRecipesLocalStorage);
      isFavorite = favorites.some((el) => recipe[wichApi[recipe.type]] === el.name);
    }
    setFavorite(isFavorite);
  }, [setFavorite, getAnyFromLocalStorage, recipe]);

  function saveFavorite() {
    if (!favorite) {
      setAnyToLocalStorage(recipe, 'favoriteRecipes');
    } else {
      const favoriteRecipes = JSON.parse(getAnyFromLocalStorage('favoriteRecipes'));
      const wichApi = {
        comidas: 'strMeal',
        bebidas: 'strDrink',
      };
      const name = recipe[wichApi[recipe.type]];
      const removeFromFavorites = favoriteRecipes.filter((el) => el.name !== name);
      const newLocalStorage = [...removeFromFavorites];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newLocalStorage));
    }
    setFavorite((prev) => !prev);
  }

  return (
    <input
      alt="Favoritar"
      className="favorite-btn"
      data-testid="favorite-btn"
      onClick={ () => saveFavorite() }
      src={ favorite ? favoritedIcon : notFavoriteIcon }
      type="image"
    />
  );
}

export default FavoriteRecipeBtn;
