import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Login.css';
import { loginUser } from '../actions/user';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { user, isLogin } = this.props;
    if (user !== prevProps.user && isLogin) {
      const { history } = this.props;
      history.push('/main');
    }
  }

  handleChangeName = e => {
    this.setState({
      username: e.target.value,
    });
  }

  handleChangePassword = e => {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit= e => {
    e.preventDefault();
    const { username, password } = this.state;
    const { loginUser } = this.props;
    loginUser({ username, password });
  }

  handleErrors = () => {
    const { error } = this.props;
    setTimeout(() => {
      const errors = document.getElementById('errors-div');
      if (errors !== null) {
        while (errors.firstChild) {
          errors.removeChild(errors.firstChild);
        }
      }
    }, 3000);

    return (
      <ul>
        {error.map(error => <li key={error}>{error}</li>)}
      </ul>

    );
  }

  render() {
    const { username, password } = this.state;
    const { error } = this.props;
    return (
      <div className="login">
        <div id="errors-div" className="errors-div">
          {error.length > 0 ? this.handleErrors() : null}
        </div>
        <h2>Log In</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChangeName}
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChangePassword}
          />
          <button className="btn-login" placeholder="submit" type="submit">
            Login
          </button>
          <p>OR</p>
          <button type="button" className="btn-signup">
            <Link to="/signup">Create an account</Link>
          </button>

        </form>

      </div>
    );
  }
}

const mapStateToProps = state =>
  // console.log('State de Login:', state.user.errors);
  ({
    user: state.user,
    isLogin: state.user.isLogin,
    error: state.user.errors,
  });
const mapDispatchToProps = dispatch => ({
  loginUser: data => dispatch(loginUser(data)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  loginUser: PropTypes.func,
  user: PropTypes.shape({}),
  isLogin: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.array,
};

Login.defaultProps = {
  history: {},
  loginUser: () => {},
  user: {},
  isLogin: false,
  error: [],
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
