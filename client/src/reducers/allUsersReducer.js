import {
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  IS_USER_LOADING
} from "../actions/allUsers";

const INITIAL_STATE = {
  allUsersData: { users: [] },
  error: null,
  isUserLoading: false
};
export const allUsersReducer = (store = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_USER_SUCCESS:
      return {
        ...store,
        error: null,
        allUsersData: { ...action.payload }
      };
    case ADD_USER_FAILURE:
      return {
        ...store,
        allUsersData: action.payload.error
      };
    case IS_USER_LOADING:
      return {
        ...store,
        isUserLoading: action.payload
      };
    default:
      return store;
  }
};

export default allUsersReducer;
