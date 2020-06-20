import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import gandalf from './img/gandalf.png';
import Header from './Header';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Illness from '../containers/Illness';
import Trackings from '../containers/Trackings';
import Footer from './Footer';
import { loginStatus } from '../actions/user';
import './App.css';

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
                isLogin ? <Illness />
                  : (
                    <div className="login-access">
                      <p>You need to login to access here</p>
                      <img src={gandalf} alt="gandalf" />
                    </div>
                  )
              )}

            />
            <Route
              path="/illness/:id"
              render={({ match }) => (
                isLogin ? <Trackings match={match} /> : (
                  <div className="login-access">
                    <p>You need to login to access here</p>
                    <img src={gandalf} alt="gandalf" />
                  </div>
                )
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

const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
  user: state.user,
  illness: state.illness,
});
const mapDispatchToProps = dispatch => ({
  loginStatus: () => dispatch(loginStatus()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
