import {
  GET_PHOTOS,
  GET_CURRENT_PAGE,
  GET_TOTAL_COUNT,
  SET_FETCHING
} from "../actions/dashboardActions";
const INITIAL_STATE = {
  photos: [],
  currentPage: 1,
  fetching: true,
  totalCount: 0
};
export const dashboardReducer = (store = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PHOTOS:
      return {
        ...store,
        photos: [...action.payload]
      };
    case GET_CURRENT_PAGE:
      return {
        ...store,
        currentPage: action.payload + 1
      };

    case GET_TOTAL_COUNT:
      return {
        ...store,
        totalCount: action.payload
      };
    case SET_FETCHING:
      return {
        ...store,
        fetching: action.payload
      };
    default:
      return store;
  }
};
