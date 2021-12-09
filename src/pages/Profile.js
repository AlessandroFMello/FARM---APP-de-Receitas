import PropTypes from 'prop-types';
import React from 'react';
import ExploreHeader from '../components/ExploreHeader';

function Profile() {
  const pageName = 'Perfil';

  return (
    <div>
      <ExploreHeader pageName={ pageName } />
    </div>
  );
}

Profile.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Profile;
