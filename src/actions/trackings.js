import axios from 'axios';

export const DISPLAY_FETCHED_DAYS = 'DISPLAY FETCHED DAYS';
export const CREATE_DAY = 'CREATE DAY';
export const DELETE_DAY = 'DELETE DAY';
export const DELETE_DAY_ERROR = 'DELETE DAY ERROR';
export const CREATE_DAY_ERROR = 'CREATE DAY ERROR';

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
      console.log('Response de action', response);
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
