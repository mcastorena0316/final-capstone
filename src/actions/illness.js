import axios from 'axios';

export const DISPLAY_FETCHED_ILLNESS = 'DISPLAY FETCHED ILLNESS';
export const CREATE_ILLNESS = 'CREATE ILLNESS';
export const DELETE_ILLNESS = 'DELETE ILLNESS';
export const DELETE_ILLNESS_ERROR = 'DELETE ILLNESS ERROR';
export const CREATE_ILLNESS_ERROR = 'CREATE ILLNESS ERROR';
export const DISPLAY_FETCHED_DAYS = 'DISPLAY FETCHED DAYS';

export const fetchUserIllness = id => dispatch => axios.get(`http://localhost:3001/users/${id}/illnesses`)
  .then(response => response.data)
  .then(data => {
    dispatch({
      type: DISPLAY_FETCHED_ILLNESS,
      payload: data,
    });
  })
  .catch(error => {
    throw (error);
  });

export const createIll = data => async dispatch => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:3001/createill',
      data,
      crossdomain: true,
      withCredentials: true,
    });
    // console.log('Response de action', response);
    dispatch({
      type: CREATE_ILLNESS,
      data: {
        ...data,
        id: response.data.id ? response.data.id : null,
      },

    });
  } catch (error) {
    dispatch({ type: CREATE_ILLNESS_ERROR, payload: error });
  }
};

export const deleteIll = data => async dispatch => {
  try {
    dispatch({ type: DELETE_ILLNESS, payload: data });
    const response = await axios({
      method: 'DELETE',
      url: 'http://localhost:3001/deleteill',
      data,
      crossdomain: true,
      withCredentials: true,
    });
    console.log('Response de action', response);
    return response;
  } catch (error) { 
    console.log(error)
    return (error); }
  
};

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
