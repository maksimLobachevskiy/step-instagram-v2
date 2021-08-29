export const GET_ALL_USERS = "GET_ALL_USERS";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILURE = "ADD_USER_FAILURE";
export const IS_USER_LOADING = "IS_USER_LOADING";

export const loadAllUsers = () => {
  return (dispatch) => {
    dispatch(isUserLoading(true));
    fetch("/api/users/allusers")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Failed to load");
      })
      .then((allUsersData) => {
        console.log(allUsersData);
        dispatch(isUserLoading(false));
        dispatch(addUsersSuccess(allUsersData));
      })
      .catch((e) => {
        dispatch(addUsersFailure(e.message));
      });
  };
};

export const addUsersSuccess = (payload) => ({
  type: ADD_USER_SUCCESS,
  payload: payload
});
export const addUsersFailure = (error) => ({
  type: ADD_USER_FAILURE,
  payload: {
    error
  }
});
export const isUserLoading = (loading) => ({
  type: IS_USER_LOADING,
  payload: loading
});

export default loadAllUsers;
