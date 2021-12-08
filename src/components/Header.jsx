import React from 'react';

function Header() {
  return (
    <div className="header">
      <button type="button" data-testid="profile-top-btn">Profile</button>
      <h1 data-testid="page-title">Page Name</h1>
      <button type="button" data-testid="search-top-btn">SearchBar</button>
    </div>
  );
}

export default Header;
