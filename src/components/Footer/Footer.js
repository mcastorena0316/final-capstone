import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import './Footer.css';
import { logOutUser } from '../../actions/user';

const Footer = ({
  isLogin, logOut, history, displayForm, match,
}) => {
  const handleClick = async e => {
    e.preventDefault();
    const response = await logOut();
    if (response.data.logged_out) {
      history.push('/');
    }
  };

  const displayAddForm = () => {
    displayForm();
  };

  return (
    <nav className="menu">
      <Link to="/main">
        <div className="icons">
          <i className="fa fa-bar-chart" />
          <p>Illnesses</p>
        </div>
      </Link>

      {isLogin && match.path === '/illness/:id' ? (
        <div className="icons icon-btn">
          <button type="button" onClick={displayAddForm}>
            <i className="fa fa-line-chart" />
            <p>Add Trackings</p>
          </button>
        </div>
      ) : null}

      { !isLogin
        && (
        <>
          <Link to="/login">
            <div className="icons">
              <i className="fa fa-sign-in" />
              <p>Log In</p>
            </div>
          </Link>
          <Link to="/signup">
            <div className="icons">

              <i className="fa fa-user-circle" />
              <p>Sign Up</p>
            </div>
          </Link>
        </>
        )}
      { isLogin && (
        <Link to="/logout" onClick={handleClick}>
          <div className="icons">
            <i className="fa fa-sign-in" />
            <p>Log Out</p>
          </div>
        </Link>

      )}
    </nav>

  );
};
Footer.propTypes = {
  isLogin: PropTypes.bool,
  logOut: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),

  match: PropTypes.shape({
    path: PropTypes.string,
  }),
  displayForm: PropTypes.func,
};

Footer.defaultProps = {
  isLogin: false,
  logOut: () => {},
  history: {},
  match: {},
  displayForm: () => {},

};

const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
  tracking: state.tracking,

});
const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOutUser()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));
