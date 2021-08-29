import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import typeReducer from "./typeReducers";
import allUsersReducer from "./allUsersReducer";
import loggedReducer from "./loggedReducer";
import loggedUserReducer from "./loggedUserReducer";
import { dashboardReducer } from "./dashboardReducer";
import updateDataReducer from "./updateDataReducer";
export default combineReducers({
  isLogged: loggedReducer,
  loggedUser: loggedUserReducer,
  errors: errorReducer,
  allUsers: allUsersReducer,
  type: typeReducer,
  dashboard: dashboardReducer,
  isUpdate: updateDataReducer
});
