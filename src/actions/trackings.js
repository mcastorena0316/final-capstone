import axios from 'axios';

export const DISPLAY_FETCHED_DAYS = 'DISPLAY FETCHED DAYS';
export const CREATE_DAY = 'CREATE DAY';
export const DELETE_DAY = 'DELETE DAY';
export const DELETE_DAY_ERROR = 'DELETE DAY ERROR';
export const CREATE_DAY_ERROR = 'CREATE DAY ERROR';
export const UPDATE_DAY = 'UPDATE DAY';

export const fetchIllnessDays = (userid, illnessid) => dispatch => axios.get(`http://localhost:3001/users/${userid}/illnesses/${illnessid}/trackings`)
  .then(response => response.data)
  .then(data => {
    dispatch({
      type: DISPLAY_FETCHED_DAYS,
      payload: data,
    });
  })
  .catch(error => {
    throw (error);
  });

export const createDay = data => async dispatch => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:3001/createday',
      data,
      crossdomain: true,
      withCredentials: true,
    });
    dispatch({
      type: CREATE_DAY,
      data: {
        ...data,
        id: response.data.id ? response.data.id : null,
      },

    });
  } catch (error) {
    dispatch({ type: CREATE_DAY_ERROR, payload: error });
  }
};

export const deleteDay = data => async dispatch => {
  try {
    dispatch({ type: DELETE_DAY, payload: data });
    const response = await axios({
      method: 'DELETE',
      url: 'http://localhost:3001/deleteday',
      data,
      crossdomain: true,
      withCredentials: true,
    });
    // console.log('Response de action', response);
    return response;
  } catch (error) {
    return (error);
  }
};

export const updateDay = data => async dispatch => {
  console.log(data);
  try {
    dispatch({ type: UPDATE_DAY, payload: data });
    const response = await axios({
      method: 'PATCH',
      url: 'http://localhost:3001/updateday',
      data,
      crossdomain: true,
      withCredentials: true,
    });
    console.log('Response de action', response);
    return response;
  } catch (error) {
    console.log(error);
    return (error);
  }
};
