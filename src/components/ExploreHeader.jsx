import PropTypes from 'prop-types';
import React from 'react';
import ProfileBtn from './header-components/ProfileBtn';

function ExploreHeader(props) {
  const { pageName } = props;
  return (
    <div className="header">
      <ProfileBtn />

      <h2 data-testid="page-title">{ pageName }</h2>
    </div>
  );
}

ExploreHeader.propTypes = {
  pageName: PropTypes.string,
}.isRequired;

ExploreHeader.propTypes = {
  pageName: PropTypes.string,
}.isRequired;

export default ExploreHeader;
