import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { set_islogged, set_loggedUser } from "../../actions/index";

const Login = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.isLogged);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const { email, password } = form;

  const onChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setForm({ email: email, password: password });

        localStorage.setItem("jwt", data.token);
        dispatch(set_loggedUser(data.user));
        dispatch(set_islogged());

        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
  }, [isAuth]);

  return (
    <div className='container'>
      <div style={{ marginTop: "4rem" }} className='row'>
        <div className='col s8 offset-s2'>
          <div>
            <img src='/logo_header.png' alt='logo' />
          </div>
          <Link to='/' className='btn-flat waves-effect'>
            <i className='material-icons left'>keyboard_backspace</i> Back to
            home
          </Link>
          <div className='col s12' style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className='grey-text text-darken-1'>
              Don't have an account? <Link to='/register'>Register</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className='input-field col s12'>
              <input
                onChange={onChange}
                value={form.email}
                id='email'
                type='email'
              />
              <label htmlFor='email'>Email</label>
            </div>
            <div className='input-field col s12'>
              <input
                onChange={onChange}
                value={form.password}
                id='password'
                type='password'
              />
              <label htmlFor='password'>Password</label>
            </div>
            <div className='col s12' style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                type='submit'
                className='btn btn-large waves-effect waves-light hoverable blue accent-3'
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
