import { CREATE_USER, CREATE_USER_ERROR } from '../actions/index';

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
    case CREATE_USER_ERROR: return {
      isLogin: false,
    };
    default: return state;
  }
};
export default userReducer;
