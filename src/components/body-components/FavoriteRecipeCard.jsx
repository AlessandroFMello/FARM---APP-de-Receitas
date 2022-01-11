import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/blackHeartIcon.svg';

export default function FavoriteRecipeCard({ filterName }) {
  const [haveLink, setHaveLink] = useState(false);
  const [
    favoriteRecipesFromLocalStorage,
    setFavoriteRecipesFromLocalStorage,
  ] = useState([]);

  const {
    ifDoesntExistsCreateALocalStorageKey,
    getAnyFromLocalStorage,
  } = useContext(RecipesContext);

  useEffect(() => {
    ifDoesntExistsCreateALocalStorageKey('favoriteRecipes', []);
  }, [ifDoesntExistsCreateALocalStorageKey]);

  useEffect(() => {
    const getFavoriteRecipesFromLocaStorage = localStorage.getItem('favoriteRecipes');
    if (getFavoriteRecipesFromLocaStorage) {
      setFavoriteRecipesFromLocalStorage(JSON.parse(getFavoriteRecipesFromLocaStorage));
    }
  }, [setFavoriteRecipesFromLocalStorage]);

  const TIME_OUT_LINK = 3000;

  useEffect(() => {
    let timeLink;

    if (haveLink) {
      timeLink = setTimeout(() => {
        setHaveLink(false);
      }, TIME_OUT_LINK);
    }
    return () => clearTimeout(timeLink);
  }, [haveLink]);

  function getClipboard(urlFragment) {
    const { href } = window.location;
    const tres = 3;
    const domain = href.split('/').slice(0, tres).join('/');
    copy(domain + urlFragment);

    if (!haveLink) {
      setHaveLink(true);
    }
  }

  function removeFavorite({ target }) {
    const favoriteRecipes = JSON.parse(getAnyFromLocalStorage('favoriteRecipes'));
    const { name } = target;
    const removeFromFavorites = favoriteRecipes.filter((el) => el.name !== name);
    const newLocalStorage = [...removeFromFavorites];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newLocalStorage));
    setFavoriteRecipesFromLocalStorage(newLocalStorage);
  }

  function renderFavoriteRecipes() {
    return (
      <div>
        {console.log(favoriteRecipesFromLocalStorage)}
        {favoriteRecipesFromLocalStorage.length > 0
      && favoriteRecipesFromLocalStorage
        .filter(({ type }) => type.includes(filterName))
        .map((recipe, index) => (
          <div key={ recipe.name }>
            <div>
              <Link to={ (`/${recipe.type}s/${recipe.id}`) }>
                <img
                  className="img-recomendation"
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                />
              </Link>
            </div>
            <div>
              { recipe.type === 'comida' ? (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { `${recipe.area} - ${recipe.category}` }
                </p>
              ) : (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { recipe.alcoholicOrNot }
                </p>
              ) }
              <Link to={ (`/${recipe.type}s/${recipe.id}`) }>
                <h1
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name}
                </h1>
              </Link>
              <input
                className="share-icon"
                alt="Compartilhar"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => getClipboard(`/${recipe.type}s/${recipe.id}`) }
                src={ shareIcon }
                type="image"
              />
              <input
                alt="Favoritar"
                className="favorite-btn"
                data-testid={ `${index}-horizontal-favorite-btn` }
                name={ `${recipe.name}` }
                onClick={ removeFavorite }
                src={ favoriteIcon }
                type="image"
              />
              {
                haveLink && (
                  <p className="link-copy">Link copiado!</p>
                )
              }
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>{renderFavoriteRecipes()}</div>
  );
}

FavoriteRecipeCard.propTypes = {
  filterName: PropTypes.oneOf(['comida', 'bebida', '']),
};

FavoriteRecipeCard.defaultProps = {
  filterName: '',
};
