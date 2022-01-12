import PropTypes from 'prop-types';
import React from 'react';
import ExploreHeader from '../components/ExploreHeader';
import Footer from '../components/Footer';
import ProfilePage from '../components/Profile-components/ProfilePage';

function Profile() {
  const pageName = 'Perfil';

  return (
    <div>
      <ExploreHeader pageName={ pageName } className="header-profile" />
      <ProfilePage />
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Profile;
