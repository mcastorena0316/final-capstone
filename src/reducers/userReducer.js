import {
  CREATE_USER, CREATE_USER_ERROR, LOGIN_USER, LOGIN_USER_ERROR, LOGOUT_USER,
} from '../actions/index';

const initialState = {
  isLogin: false,
  user: {
    username: '',
    password: '',
    passwordConfirmation: '',
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state.user,
        isLogin: true,
        user: {
          username: action.username,
          password: action.password,
          passwordConfirmation: action.passwordConfirmation,
        },
      };
    case CREATE_USER_ERROR:
      return {
        isLogin: false,
      };
    case LOGIN_USER:
      return {
        ...state.user,
        isLogin: true,
        user: {
          username: action.username,
          password: action.password,
        },
      };
    case LOGIN_USER_ERROR:
      return {
        isLogin: false,
      };
    case LOGOUT_USER:
      return {
        isLogin: false,
        user: {},
      };

    default: return state;
  }
};
export default userReducer;
