import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Login from './Login';
import Signup from './Signup';
import Main from './Main';
import Welcome from './Welcome';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
    };
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line no-unused-expressions
    this.logInStatus;
  }

  logInStatus() {
    axios.get('https://illnest-api.herokuapp.com/api/v1/logged_in',
      { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          this.handleLogIn(response);
        } else {
          this.handleLogOut();
        }
      })
      .catch((error => {
        throw (error);
      }));
  }

  handleLogIn(data) {
    this.setState({
      isLoggedIn: true,
      user: data.user,
    });
  }

  handleLogOut() {
    this.setState({
      isLoggedIn: false,
      user: {},
    });
  }

  render() {
    const { isLoggedIn, user } = this.state;
    return (
      <Router>
        <div className="App">
          <Header loggedInStatus={isLoggedIn} handleLogout={this.handleLogOut} />
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
                <Login handleLogin={this.handleLogIn} loggedInStatus={isLoggedIn} user={user} />
              )}
            />
            <Route
              exact
              path="/signup"
              render={() => (
                <Signup handleLogin={this.handleLogIn} loggedInStatus={isLoggedIn} />
              )}
            />
            <Route
              exact
              path="/main"
              render={() => (
                isLoggedIn ? <Main /> : <p>You need to login</p>)}
            />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
