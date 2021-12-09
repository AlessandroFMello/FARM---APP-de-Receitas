import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <form className="search-bar">
        <label htmlFor="search-input">
          <input
            type="text"
            data-testid="search-input"
          />
        </label>
        <button type="button">Buscar</button>
      </form>
    </div>
  );
}
