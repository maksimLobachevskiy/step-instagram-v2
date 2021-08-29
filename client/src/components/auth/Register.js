import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

const Register = (props) => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password2: ""
  });

  useEffect(() => {
    if (props.isLogged) {
      props.history.push("/dashboard");
    }
  }, [props.isLogged, props.history]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      ...form
    };
    props.registerUser(newUser, props.history);
  };

  return (
    <div className='container'>
      <div className='row'>
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
              <strong>Register</strong> below
            </h4>
            <p className='grey-text text-darken-1'>
              Already have an account? <Link to='/login'>Log in</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className='input-field col s12'>
              <input
                onChange={onChange}
                value={form.name}
                error={props.errors.name}
                id='name'
                type='text'
                className={classnames("", {
                  invalid: props.errors.name
                })}
              />
              <label htmlFor='name'>Name</label>
              <span className='red-text'>{props.errors.name}</span>
            </div>
            <div className='input-field col s12'>
              <input
                onChange={onChange}
                value={form.username}
                error={props.errors.username}
                id='username'
                type='text'
                className={classnames("", {
                  invalid: props.errors.username
                })}
              />
              <label htmlFor='username'>Username</label>
              <span className='red-text'>{props.errors.username}</span>
            </div>
            <div className='input-field col s12'>
              <input
                onChange={onChange}
                value={form.email}
                error={props.errors.email}
                id='email'
                type='email'
                className={classnames("", {
                  invalid: props.errors.email
                })}
              />
              <label htmlFor='email'>Email</label>
              <span className='red-text'>{props.errors.email}</span>
            </div>
            <div className='input-field col s12'>
              <input
                onChange={onChange}
                value={form.password}
                error={props.errors.password}
                id='password'
                type='password'
                className={classnames("", {
                  invalid: props.errors.password
                })}
              />
              <label htmlFor='password'>Password</label>
              <span className='red-text'>{props.errors.password}</span>
            </div>
            <div className='input-field col s12'>
              <input
                onChange={onChange}
                value={form.password2}
                error={props.errors.password2}
                id='password2'
                type='password'
                className={classnames("", {
                  invalid: props.errors.password2
                })}
              />
              <label htmlFor='password2'>Confirm Password</label>
              <span className='red-text'>{props.errors.password2}</span>
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
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLogged: state.isLogged,
  errors: state.errors
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
