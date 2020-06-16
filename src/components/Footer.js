import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import './Footer.css';
import { logOutUser } from '../actions/user';

const Footer = ({ isLogin, logOut, history }) => {
  const handleClick = async e => {
    e.preventDefault();
    const response = await logOut();
    if (response.data.logged_out) {
      history.push('/');
    }
  };

  return (
    <div className="menu">
      <div className="illnesses">
        <Link to="/main">

          <i className="fa fa-bar-chart" />
          <p>Add Illnesses</p>

        </Link>
      </div>
      <p>Trackings</p>
      { isLogin ? null
        : <Link to="/login"><p>Log In</p></Link>}
      {isLogin ? null : <Link to="/signup"><p>Sign Up</p></Link>}
      { isLogin ? <Link to="/logout" onClick={handleClick}><p>Log Out</p></Link>
        : null}
    </div>

  );
};
Footer.propTypes = {
  isLogin: PropTypes.bool,
  logOut: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

Footer.defaultProps = {
  isLogin: false,
  logOut: () => {},
  history: {},

};

const mapStateToProps = state => ({
  isLogin: state.user.isLogin,

});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOutUser()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));
