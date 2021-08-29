export const GET_PHOTOS = "GET_PHOTOS";
export const GET_CURRENT_PAGE = "GET_CURRENT_PAGE";
export const SET_FETCHING = "SET_FETCHING";
export const GET_TOTAL_COUNT = "GET_TOTAL_COUNT";

export const getPhotos = (payload) => ({
  type: GET_PHOTOS,
  payload: payload,
});
export const getCurrentPage = (payload) => ({
  type: GET_CURRENT_PAGE,
  payload: payload,
});
export const setFetching = (payload) => ({
  type: SET_FETCHING,
  payload: payload,
});
export const getTotalCount = (payload) => ({
  type: GET_TOTAL_COUNT,
  payload: payload,
});
