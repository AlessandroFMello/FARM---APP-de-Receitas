import React, { useContext, useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import RecipesContext from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';

export default function DoneRecipeCard() {
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

  function getClipboard() {
    const { href } = window.location;
    const CUT_IN_PROGRESS = -12;
    if (href.includes('in-progress')) {
      copy(href.slice(0, CUT_IN_PROGRESS));
      // setHaveLink(true);
    } else {
      copy(href);
      // setHaveLink(true);
    }
  }

  function renderDoneRecipes() {
    return (
      <div>
        {console.log(doneRecipesFromLocalStorage)}
        ;
        {doneRecipesFromLocalStorage.length > 0
      && doneRecipesFromLocalStorage.map((recipe, index) => (
        <div key={ recipe.name }>
          <div>
            <img
              className="img-recomendation"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
          </div>
          <div>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { `${recipe.area} - ${recipe.category}` }
            </p>
            <h1
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </h1>
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              {`Feito em: ${recipe.doneDate}`}
            </p>
            <input
              className="share-icon"
              alt="Compartilhar"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ getClipboard }
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
    <div>{renderDoneRecipes()}</div>
  );
}
