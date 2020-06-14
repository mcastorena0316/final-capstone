import axios from 'axios';

export const DISPLAY_FETCHED_ILLNESS = 'DISPLAY FETCHED ILLNESS';
export const DISPLAY_FETCHED_DAYS = 'DISPLAY FETCHED DAYS';

export const fetchUserIllness = id => dispatch => axios.get(`https://illnest-api.herokuapp.com/api/v1/users/${id}/illnesses`)
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

export const fetchIllnessDays = (userid, illnessid) => dispatch => axios.get(`https://illnest-api.herokuapp.com/api/v1/users/${userid}/illnesses/${illnessid}/trackings`)
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
