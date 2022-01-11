import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';

export default function DoneRecipeCard({ filterName }) {
  const [haveLink, setHaveLink] = useState(false);
  const [doneRecipesFromLocalStorage, setDoneRecipesFromLocalStorage] = useState([]);

  const { ifDoesntExistsCreateALocalStorageKey } = useContext(RecipesContext);

  useEffect(() => {
    ifDoesntExistsCreateALocalStorageKey('doneRecipes', []);
  }, [ifDoesntExistsCreateALocalStorageKey]);

  useEffect(() => {
    const getDoneRecipesFromLocaStorage = localStorage.getItem('doneRecipes');
    if (getDoneRecipesFromLocaStorage) {
      setDoneRecipesFromLocalStorage(JSON.parse(getDoneRecipesFromLocaStorage));
    }
  }, [setDoneRecipesFromLocalStorage]);

  const TIME_OUT_LINK = 3000;

  useEffect(() => {
    let timeLink;

    if (haveLink) {
      timeLink = setTimeout(() => {
        setHaveLink(false);
        const child = document.getElementsByClassName('link-copy')[0];
        child.remove();
      }, TIME_OUT_LINK);
    }
    return () => clearTimeout(timeLink);
  }, [haveLink]);

  function getClipboard(urlFragment, { target }) {
    const { href } = window.location;
    const tres = 3;
    const domain = href.split('/').slice(0, tres).join('/');
    copy(domain + urlFragment);
    const father = target.parentElement;

    const child = document.createElement('p');
    child.innerText = 'Link copiado!';
    child.className = 'link-copy';
    if (!haveLink) {
      setHaveLink(true);
      father.appendChild(child);
    }
  }

  function renderDoneRecipes() {
    return (
      <div>
        {doneRecipesFromLocalStorage.length > 0
      && doneRecipesFromLocalStorage
        .filter(({ type }) => type.includes(filterName))
        .map((recipe, index) => (
          <div key={ recipe.name }>
            <div>
              <Link to={ (`/${recipe.type}s/${recipe.id}`) }>
                <img
                  className="card-done-img"
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                />
              </Link>
            </div>
            <div className="card-done-text">
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
              <Link
                className="card-done-link"
                to={ (`/${recipe.type}s/${recipe.id}`) }
              >
                <h1
                  data-testid={ `${index}-horizontal-name` }
                  className="card-done-link"
                >
                  {recipe.name}
                </h1>
              </Link>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {`Feito em: ${recipe.doneDate}`}
              </p>
              <input
                className="share-icon"
                alt="Compartilhar"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ (e) => getClipboard(`/${recipe.type}s/${recipe.id}`, e) }
                src={ shareIcon }
                type="image"
              />
              {
                doneRecipesFromLocalStorage[index].tags.map((tag) => (
                  <p
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </p>
                ))
              }
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="card-done-container">{renderDoneRecipes()}</div>
  );
}

DoneRecipeCard.propTypes = {
  filterName: PropTypes.oneOf(['comida', 'bebida', '']),
};

DoneRecipeCard.defaultProps = {
  filterName: '',
};
