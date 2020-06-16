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
      errors: '',
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
    const { loginUser, user } = this.props;
    loginUser({ username, password });
    console.log(user);
  }

  handleErrors = () => {
    const { errors } = this.state;
    setTimeout(() => this.setState({ errors: '' }), 3000);
    return (
      <div>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
      </div>
    );
  }

  render() {
    const { username, errors, password } = this.state;
    return (
      <div className="login">
        <h3>Log In</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChangeName}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChangePassword}
          />
          <button placeholder="submit" type="submit">
            LOG IN
          </button>
          <p>OR</p>
          <button type="button">
            <Link to="/signup">CREATE AN ACCOUNT</Link>
          </button>

        </form>
        <div>
          <ul>
            {errors ? this.handleErrors() : null}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('State de Login:', state);
  return ({
    user: state.user,
    isLogin: state.user.isLogin,
  });
};

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
};

Login.defaultProps = {
  history: {},
  loginUser: () => {},
  user: {},
  isLogin: false,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
