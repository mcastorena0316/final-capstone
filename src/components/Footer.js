import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import './Footer.css';
import { logOutUser } from '../actions/user';

const Footer = ({
  isLogin, logOut, history,
}) => {
  const handleClick = async e => {
    e.preventDefault();
    const response = await logOut();
    if (response.data.logged_out) {
      history.push('/');
    }
  };

  return (
    <div className="menu">
      <div className="icons">
        <Link to="/main">
          <i className="fa fa-bar-chart" />
          <p>Add Illnesses</p>
        </Link>
      </div>
      { isLogin ? null
        : (
          <div className="icons">
            <Link to="/login">
              <i className="fa fa-sign-in" />
              <p>Log In</p>
            </Link>
          </div>
        )}
      {isLogin ? null
        : (
          <div className="icons">
            <Link to="/signup">
              <i className="fa fa-user-circle" />
              <p>Sign Up</p>
            </Link>
          </div>
        )}
      { isLogin ? (
        <div className="icons">
          <Link to="/logout" onClick={handleClick}>

            <i className="fa fa-sign-in" />
            <p>Log Out</p>

          </Link>
        </div>
      )
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
  illness: state.illness[0],

});
const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOutUser()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));
