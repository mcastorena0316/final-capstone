import axios from 'axios';

export const DISPLAY_FETCHED_ILLNESS = 'DISPLAY FETCHED ILLNESS';
export const CREATE_ILLNESS = 'CREATE ILLNESS';
export const DELETE_ILLNESS = 'DELETE ILLNESS';
export const CREATE_ILLNESS_ERROR = 'CREATE ILLNESS ERROR';
export const UPDATE_ILLNESS = 'UPDATE ILLNESS';

export const fetchUserIllness = id => dispatch => axios.get(`https://illnest-api.herokuapp.com/users/${id}/illnesses`)
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
      url: `https://illnest-api.herokuapp.com/users/${data.user_id}/illnesses`,
      data,
      crossdomain: true,
      withCredentials: true,
    });
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
      url: `https://illnest-api.herokuapp.com/users/${data.user_id}/illnesses/${data.id}`,
      data,
      crossdomain: true,
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return (error);
  }
};

export const updateIll = data => async dispatch => {
  try {
    dispatch({ type: UPDATE_ILLNESS, payload: data });
    const response = await axios({
      method: 'PATCH',
      url: `https://illnest-api.herokuapp.com/users/${data.user_id}/illnesses/${data.id}`,
      data,
      crossdomain: true,
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return (error);
  }
};
