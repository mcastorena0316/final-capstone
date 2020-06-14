import axios from 'axios';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const LOGOUT_USER = 'LOGOUT_USER';

// eslint-disable-next-line consistent-return
export const createUser = newUser => async dispatch => {
  try {
    dispatch({ type: CREATE_USER, ...newUser });
    const response = await axios({
      method: 'POST',
      url: 'https://illnest-api.herokuapp.com/api/v1/users',
      data: { user: newUser },
      crossdomain: true,
    });
    return response;
  } catch (error) {
    dispatch({ type: CREATE_USER_ERROR });
  }
};

export const loginUser = newUser => async dispatch => {
  try {
    dispatch({ type: LOGIN_USER, ...newUser });
    const response = await axios({
      method: 'POST',
      url: 'https://illnest-api.herokuapp.com/api/v1/login',
      data: { user: newUser },
      crossdomain: true,
    });
    return response;
  } catch (error) {
    dispatch({ type: CREATE_USER_ERROR });
  }
};

export const logOutUser = () => async dispatch => {
  try {
    dispatch({ type: LOGOUT_USER, payload: {} });
    const response = await axios({
      method: 'DELETE',
      url: 'https://illnest-api.herokuapp.com/api/v1/logout',
      data: { user: {} },
      crossdomain: true,
    });
    return response;
  } catch (error) { console.log(error); }
};
