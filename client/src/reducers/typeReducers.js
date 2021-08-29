import {
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  IS_LOADING
} from "../actions/usersData";

const INITIAL_STATE = {
  usersData: { posts: [] },
  error: null,
  isLoading: false
};
export const typeReducer = (store = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PRODUCT_SUCCESS:
      return {
        ...store,
        error: null,
        usersData: { ...action.payload }
      };
    case ADD_PRODUCT_FAILURE:
      return {
        ...store,
        usersData: action.payload.error
      };
    case IS_LOADING:
      return {
        ...store,
        isLoading: action.payload
      };
    default:
      return store;
  }
};

export default typeReducer;
