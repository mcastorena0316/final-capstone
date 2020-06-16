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
import Illness from '../containers/Illness';
import Trackings from '../containers/Trackings';
import Footer from './Footer';
import { loginStatus } from '../actions/user';

class App extends React.Component {
  componentDidMount() {
    const { loginStatus } = this.props;
    loginStatus();
  }

  render() {
    const { isLogin } = this.props;
    return (
      <Router>
        <div className="App">
          <Header />
          <Footer />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                isLogin ? <Illness /> : <Login />
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
                isLogin ? <Illness /> : <p>You need to login</p>)}
            />
            <Route
              path="/illness/:id"
              render={props => (
              // eslint-disable-next-line react/jsx-props-no-spreading
                isLogin ? <Trackings {...props} /> : <p>You need to login</p>
              )}
            />

          </Switch>
        </div>
      </Router>
    );
  }
}
App.propTypes = {
  isLogin: PropTypes.bool,
  loginStatus: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.number,
    password: PropTypes.string,
    username: PropTypes.string,
  }),
};

App.defaultProps = {
  isLogin: false,
  loginStatus: () => {},
  user: {},
};

const mapStateToProps = state =>
  // console.log('State de app:', state);
  ({
    isLogin: state.user.isLogin,
    user: state.user,
  });
const mapDispatchToProps = dispatch => ({
  loginStatus: () => dispatch(loginStatus()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
