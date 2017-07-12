import React from 'react';
import PropTypes from 'prop-types';

const Header = props => (
  <div className="header">
    <h1 className="title">{props.title}</h1>
    <p className="description">{props.description}</p>
  </div>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

Header.defaultProps = {
  description: '',
};

export default Header;
