import { SET_LOGGEDUSER, UNSET_LOGGEDUSER } from "../actions/index";

const loggedUserReducer = (state = null, action) => {
  switch (action.type) {
    case SET_LOGGEDUSER:
      return action.payload;
    case UNSET_LOGGEDUSER:
      return null;
    default:
      return state;
  }
};

export default loggedUserReducer;
