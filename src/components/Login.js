import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Login.css';
import { loginUser } from '../actions/index';

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

  componentDidMount() {
    this.loginStatus();
  }

  loginStatus = () => {
    axios.get('https://illnest-api.herokuapp.com/api/v1/logged_in', { withCredentials: true })
      .then(response => response)
      .catch(error => error);
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

  handleSubmit= async e => {
    e.preventDefault();
    const { username, password } = this.state;
    const { loginUser } = this.props;
    const response = await loginUser({ username, password });

    if (response.data.logged_in) {
      const { history } = this.props;
      history.push('/');
    } else {
      this.setState({
        errors: response.data.errors,
      });
    }
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

const mapStateToProps = state => ({
  user: state.user,
  isLogin: state.user.isLogin,
});

const mapDispatchToProps = dispatch => ({
  loginUser: data => dispatch(loginUser(data)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  loginUser: PropTypes.func,
};

Login.defaultProps = {
  history: {},
  loginUser: () => {},
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
