/* eslint-disable consistent-return */
import axios from 'axios';

export const CREATE_USER = 'CREATE USER';
export const CREATE_USER_ERROR = 'CREATE USER ERROR';
export const LOGIN_USER = 'LOGIN USER';
export const LOGIN_USER_ERROR = 'LOGIN USER ERROR';
export const LOGOUT_USER = 'LOGOUT USER';
export const LOGGED_IN = 'LOGGED IN';
export const LOGGED_IN_ERROR = 'LOGGED_IN_ERROR';

export const loginStatus = () => dispatch => {
  axios.get('http://localhost:3001/logged_in',
    { withCredentials: true })
    .then(response =>
      // console.log(response);
      (
        response.data))
    .then(data => {
      dispatch({
        type: LOGGED_IN,
        payload: data,
      });
    })
    .catch(error => {
      dispatch({
        type: LOGGED_IN_ERROR,
        payload: error,

      });
    });
};

export const createUser = newUser => async dispatch => {
  let response = {};
  try {
    response = await axios({
      method: 'POST',
      url: 'http://localhost:3001/users',
      data: { user: newUser },
      crossdomain: true,
      withCredentials: true,
    });
    dispatch({
      type: CREATE_USER,
      payload: {
        ...newUser,
        id: response.data.user.id ? response.data.user.id : null,
      },
    });
    return response;
  } catch (error) {
    console.log(response.data);
    dispatch({ type: CREATE_USER_ERROR, payload: response.data.errors });
  }
};

export const loginUser = user => dispatch => {
  axios.post('http://localhost:3001/login', { user }, { withCredentials: true })
    .then(response => response.data)
    .then(data => {
      dispatch({
        type: LOGIN_USER,
        payload: data,
      });
    })
    .catch(error => {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: error,
      });
      return error
    });
};

export const logOutUser = () => async dispatch => {
  try {
    dispatch({ type: LOGOUT_USER, payload: {} });
    const response = await axios({
      method: 'DELETE',
      url: 'http://localhost:3001/logout',
      data: { user: {} },
      crossdomain: true,
      withCredentials: true,
    });
    return response;
  } catch (error) { return (error); }
};
