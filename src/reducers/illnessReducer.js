import {
  DISPLAY_FETCHED_ILLNESS,
  CREATE_ILLNESS, DELETE_ILLNESS, UPDATE_ILLNESS,
} from '../actions/illness';

export default function illnessReducer(state = [], action) {
  switch (action.type) {
    case DISPLAY_FETCHED_ILLNESS:
      return action.payload;
    case CREATE_ILLNESS:
      return [...state, action.data];
    case DELETE_ILLNESS:
      return state.filter(el => el.id !== action.payload.id);
    case UPDATE_ILLNESS:
      // eslint-disable-next-line array-callback-return
      state.map(x => {
        if (x.id === action.payload.id) {
          if (x.description !== action.payload.description && x.name === action.payload.name) {
            const y = x;
            y.description = action.payload.description;
          } if (x.name !== action.payload.name && x.description !== action.payload.description) {
            const z = x;
            z.name = action.payload.name;
            z.description = action.payload.description;
          }
        }
      });
      return state;
    default:
      return state;
  }
}
