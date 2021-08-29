import { UPDATE_DATA } from "../actions/index";

const updateDataReducer = (state = false, action) => {
  switch (action.type) {
    case UPDATE_DATA:
      return !state;
    default:
      return state;
  }
};

export default updateDataReducer;
