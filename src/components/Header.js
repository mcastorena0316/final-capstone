import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ loggedInStatus, history, handleLogout}) => {
  const handleClick = () => {
    axios.delete('http://localhost:3001/api/v1logout', { withCredentials: true })
      // eslint-disable-next-line no-unused-vars
      .then(response => {
        handleLogout();
        history.push('/');
      })
      .catch(error => console.log(error));
  };

  return (
    <header>
      <Link to="/login"><p>Log In</p></Link>
      <Link to="/signup"><p>Sign Up</p></Link>
      {
        loggedInStatus
          ? <Link to="/logout" onClick={handleClick}>Log Out</Link>
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
export default Header;
