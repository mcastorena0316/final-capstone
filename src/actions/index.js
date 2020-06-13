import axios from 'axios';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';

// eslint-disable-next-line consistent-return
const createUser = newUser => async dispatch => {
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

export default createUser;
