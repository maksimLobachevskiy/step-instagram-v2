export const SET_LOGGED_TRUE = "SET_LOGGED_TRUE";
export const SET_LOGGED_FALSE = "SET_LOGGED_FALSE";
export const SET_LOGGEDUSER = "SET_LOGGEDUSER";
export const UNSET_LOGGEDUSER = "UNSET_LOGGEDUSER";
export const UPDATE_DATA = "UPDATE_DATA";

export const set_islogged = () => {
  return {
    type: SET_LOGGED_TRUE
  };
};
export const unset_islogged = () => {
  return {
    type: SET_LOGGED_FALSE
  };
};

export const set_loggedUser = (data) => {
  return {
    type: SET_LOGGEDUSER,
    payload: data
  };
};

export const unset_loggedUser = () => {
  return {
    type: UNSET_LOGGEDUSER
  };
};

export const update_data = () => {
  return {
    type: UPDATE_DATA
  };
};
