import {
  DISPLAY_FETCHED_DAYS, CREATE_DAY,

} from '../actions/trackings';

export default function trackingReducer(state = [], action) {
  console.log(action);
  console.log('state de tracking', state);
  switch (action.type) {
    case DISPLAY_FETCHED_DAYS:
      return action.payload;
    case CREATE_DAY:
      return [...state, action.data];
    default:
      return state;
  }
}
