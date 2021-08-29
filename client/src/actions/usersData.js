export const GET_ERRORS = "GET_ERRORS";
export const USER_LOADING = "USER_LOADING";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

///////////////////////User Data ///////////////////////////
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const ADD_PRODUCT_FAILURE = "ADD_PRODUCT_FAILURE";
export const IS_LOADING = "IS_LOADING";

const loadUser = () => {
  return (dispatch) => {
    dispatch(isLoading(true));
    fetch("/api/post/allposts")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Failed to load");
      })
      .then((usersData) => {
        dispatch(isLoading(false));
        dispatch(addProductSuccess(usersData));
      })
      .catch((e) => {
        dispatch(addProductFailure(e.message));
      });
  };
};

export const addProductSuccess = (payload) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: payload
});
export const addProductFailure = (error) => ({
  type: ADD_PRODUCT_FAILURE,
  payload: {
    error
  }
});
export const isLoading = (loading) => ({
  type: IS_LOADING,
  payload: loading
});

export default loadUser;
