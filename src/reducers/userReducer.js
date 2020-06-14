import {
  CREATE_USER, CREATE_USER_ERROR, LOGIN_USER, LOGIN_USER_ERROR, LOGOUT_USER,
} from '../actions/index';

const initialState = {
  isLogin: false,
  user: {
    username: '',
    password: '',
    passwordConfirmation: '',
    id: 0,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        // ...state.user,
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
          username: action.payload.username,
          password: action.payload.password,
          id: action.payload.id,
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
