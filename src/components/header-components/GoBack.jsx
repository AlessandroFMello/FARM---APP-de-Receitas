import React from 'react';
import { IoIosArrowBack as ArrowBack } from 'react-icons/io';
import { useHistory } from 'react-router-dom';

export default function GoBack() {
  const history = useHistory();
  return (
    <button
      className="button-goback"
      onClick={ () => history.goBack() }
      type="button"
    >
      <ArrowBack className="goback" />
    </button>
  );
}
