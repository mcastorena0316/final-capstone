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

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoggedIn: false,
//       user: {},
//     };
//     this.handleLogIn = this.handleLogIn.bind(this);
//     this.handleLogOut = this.handleLogOut.bind(this);
//   }

//   handleLogIn(data) {
//     this.setState({
//       isLoggedIn: true,
//       user: data.user,
//     });
//   }

//   handleLogOut() {
//     this.setState({
//       isLoggedIn: false,
//       user: {},
//     });
//   }

//   render() {
//     const { isLoggedIn, user } = this.state;
//     return (
//       <Router>
//         <div className="App">
//           <Header loggedInStatus={isLoggedIn} handleLogout={this.handleLogOut} />
//           <Switch>
//             <Route
//               exact
//               path="/"
//               render={() => (
//                 <Welcome />
//               )}
//             />
//             <Route
//               exact
//               path="/login"
//               render={() => (
//                 <Login handleLogin={this.handleLogIn} loggedInStatus={isLoggedIn} user={user} />
//               )}
//             />
//             <Route
//               exact
//               path="/signup"
//               render={() => (
//                 <Signup handleLogin={this.handleLogIn} loggedInStatus={isLoggedIn} />
//               )}
//             />
//             <Route
//               exact
//               path="/main"
//               render={() => (
//                 isLoggedIn ? <Main /> : <p>You need to login</p>)}
//             />

//           </Switch>
//         </div>
//       </Router>
//     );
//   }
// }

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
