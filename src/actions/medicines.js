import axios from 'axios';

export const DISPLAY_FETCHED_MEDICINE = 'DISPLAY FETCHED MEDICINE';

export const fetchMedicines = (userid, illnessid, trackingid) => dispatch => axios.get(`http://localhost:3001/users/${userid}/illnesses/${illnessid}/trackings/${trackingid}/medicines`)
  .then(response => {
    // console.log('response action medicine',response);
    return (response.data);
  })
  .then(data => {
    dispatch({
      type: DISPLAY_FETCHED_MEDICINE,
      payload: data,
    });
  })
  .catch(error => {
    throw (error);
  });
