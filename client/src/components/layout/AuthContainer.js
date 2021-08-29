import React from "react";
import { Link } from "react-router-dom";

const AuthContainer = () => {
  return (
    <div style={{ height: "100vh" }} className='container valign-wrapper'>
      <div className='row'>
        <div className='col s12 center-align valign-wrapper'>
          <div className='col s6'>
            <img src='/login_img.png' width='300' alt='logo' />
          </div>
          <div className='col s6'>
            <div className='btns'>
              <div>
                <Link
                  to='/register'
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginRight: "15px"
                  }}
                  className='btn btn-large waves-effect waves-light hoverable blue accent-3'
                >
                  Register
                </Link>
                <Link
                  to='/login'
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className='btn btn-large waves-effect waves-light hoverable pink accent-3'
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthContainer;
