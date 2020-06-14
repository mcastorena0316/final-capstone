import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Login from './Login';
import Signup from './Signup';
import Main from './Main';
import Welcome from './Welcome';
import Illness from './Illness';

const App = props => {
  const { isLogin } = props;
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Welcome />
            )}
          />
          <Route
            exact
            path="/login"
            render={() => (
              <Login />
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => (
              <Signup />
            )}
          />
          <Route
            exact
            path="/main"
            render={() => (
              isLogin ? <Main /> : <p>You need to login</p>)}
          />
          <Route
            path="/illness/:id"
            render={props => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <Illness {...props} />
            )}
          />

        </Switch>
      </div>
    </Router>
  );
};
App.propTypes = {
  isLogin: PropTypes.bool,
};

App.defaultProps = {
  isLogin: false,
};

const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
});

export default connect(mapStateToProps, null)(App);
