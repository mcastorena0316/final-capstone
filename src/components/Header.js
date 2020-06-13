import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import './Header.css';

const Header = ({ loggedInStatus, history, handleLogout }) => {
  const handleClick = () => {
    axios.delete('https://illnest-api.herokuapp.com/api/v1/logout', { withCredentials: true })
      // eslint-disable-next-line no-unused-vars
      .then(response => {
        handleLogout();
        history.push('/');
      })
      .catch((error => {
        throw (error);
      }));
  };

  return (
    <header>
      <Link to="/"><p>Home</p></Link>
      <Link to="/main"><p>Private Pate</p></Link>
      <Link to="/login"><p>Log In</p></Link>
      <Link to="/signup"><p>Sign Up</p></Link>
      {
        loggedInStatus
          ? <Link to="/logout" onClick={handleClick}><p>Log Out</p></Link>
          : null
      }
    </header>
  );
};

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  loggedInStatus: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  history: {},
};
export default withRouter(Header);
