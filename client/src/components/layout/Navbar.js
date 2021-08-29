import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { unset_islogged, unset_loggedUser } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.scss";

const Navbar = (props) => {
  const { username } = useSelector((state) => state.loggedUser);
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogoutClick = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(unset_islogged());
    dispatch(unset_loggedUser());
    history.push("/login");
  };

  return (
    <div className='navwrapper'>
      <NavLink to={"/"}>
        <img src='/logo_header.png' alt='logo' />
      </NavLink>
      <ul className='nav-menu'>
        <li className='nav-menu__item'>
          <a className='nav-menu__item-item1' href={`/user/${username}`}>
            <div className='user-name'>{username}</div>
            <div>
              <i className='material-icons'>person_outline</i>
            </div>
          </a>
        </li>
        <li>
          <span className='nav-menu__item' onClick={onLogoutClick}>
            <i className='material-icons'>exit_to_app</i>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
