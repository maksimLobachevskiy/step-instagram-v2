import React from "react";
import { Route, Switch } from "react-router-dom";

import AuthContainer from "../../components/layout/AuthContainer";
import Register from "../../components/auth/Register";
import Login from "../../components/auth/Login";
import Dashboard from "../../components/dashboard/Dashboard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import loadUser from "../../actions/usersData";
import loadAllUsers from "../../actions/allUsers";
import UserProfile from "../../components/dashboard/Users/User/UserProfile";
import {
  set_islogged,
  unset_islogged,
  set_loggedUser,
  unset_loggedUser
} from "../../actions/index";
import Loader from "../Loader/Loader";

const Routes = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((store) => ({
    isLoading: store.type.isLoading,
    error: store.type.error
  }));

  const isLogged = useSelector((state) => state.isLogged);

  const { isUserLoading } = useSelector((store) => ({
    isUserLoading: store.allUsers.isUserLoading
  }));

  useEffect(() => {
    fetch("/api/post/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.isLogged) {
          dispatch(set_loggedUser(data.user));
          dispatch(set_islogged());
        }
        if (data.error) {
          dispatch(unset_loggedUser());
          dispatch(unset_islogged());
        }
      })
      .catch((er) => console.log(er));

    dispatch(loadUser());
    dispatch(loadAllUsers());
  }, []);

  return (
    <Switch>
      {isLoading ? (
        <Loader />
      ) : (
        <Route
          exact
          path='/'
          component={!isLogged ? AuthContainer : Dashboard}
        />
      )}

      {isLogged && (
        <Route exact path='/user/:username' component={UserProfile} />
      )}
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
    </Switch>
  );
};

export default Routes;
