import { SET_LOGGED_TRUE, SET_LOGGED_FALSE } from "../actions/index";

const loggedReducer = (state = null, action) => {
  switch (action.type) {
    case SET_LOGGED_TRUE:
      return true;
    case SET_LOGGED_FALSE:
      return false;
    default:
      return state;
  }
};

export default loggedReducer;
