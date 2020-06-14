import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './Signup.css';
import { createUser } from '../actions/index';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      errors: '',
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePasswordConfirm = this.handleChangePasswordConfirm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChangePasswordConfirm = e => {
    this.setState({
      passwordConfirmation: e.target.value,
    });
  }

   handleSubmit= async e => {
     e.preventDefault();
     const {
       username, password, passwordConfirmation,
     } = this.state;
     const { createUser } = this.props;

     const response = await createUser({ username, password, passwordConfirmation });
     if (response && response.status === 200) {
       const { history } = this.props;
       history.push('/');
     } else {
       this.setState({
         errors: 'Information is wrong, please try again',
       });
     }
   }

   handleErrors = () => {
     const { errors } = this.state;
     setTimeout(() => this.setState({ errors: '' }), 3000);
     return (
       <div>
         <p>{errors}</p>
       </div>
     );
   }

   render() {
     const {
       username, errors, password, passwordConfirmation,
     } = this.state;
     return (
       <div className="signup">
         <h1>Signup</h1>
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
           <input
             placeholder="password confirmation"
             type="password"
             name="passwordConfirmation"
             value={passwordConfirmation}
             onChange={this.handleChangePasswordConfirm}
           />
           <button placeholder="submit" type="submit">
             Sign In
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
  createUser: data => dispatch(createUser(data)),
});

Signup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  createUser: PropTypes.func.isRequired,
};

Signup.defaultProps = {
  history: {},
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
