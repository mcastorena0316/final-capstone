import {
  CREATE_USER, CREATE_USER_ERROR, LOGIN_USER, LOGIN_USER_ERROR,
  LOGOUT_USER, LOGGED_IN, LOGGED_IN_ERROR,
} from '../actions/user';

const initialState = {
  isLogin: false,
  user: {
    username: '',
    id: 0,
  },
};

const userReducer = (state = initialState, action) => {
  // console.log('La accion que estoy ejecutando:', action)
  switch (action.type) {
    case LOGGED_IN:
      return {
        isLogin: true,
        user: {
          username: action.payload.user.username,
          password: action.payload.user.password,
          id: action.payload.user.id,
        },
      };
    case LOGGED_IN_ERROR:
      return {
        isLogin: false,
        user: {},
      };
    case CREATE_USER:
      return {
        isLogin: true,
        user: {
          id: action.payload.id,
          username: action.payload.username,
          password: action.payload.password,
          passwordConfirmation: action.payload.passwordConfirmation,
        },
      };
    case CREATE_USER_ERROR:
      return {
        isLogin: false,
      };
    case LOGIN_USER:
      return {
        isLogin: true,
        user: {
          username: action.payload.user.username,
          id: action.payload.user.id,
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
        illness: {},
      };

    default: return state;
  }
};
export default userReducer;
