import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import loader from "../../img/loader.png";
import { loginUser } from "../../redux/auth/actions";

const Login = (props) => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light border-bottom p-0">
          <div className="container-fluid p-0 pr-2">
            <div className="d-flex justify-content-center align-items-center w-100">
              <Link className="navbar-brand p-0 newtimes_font logo_ui" to="/">
                <span className="brand_color">
                  <span>idareAI</span>
                </span>
              </Link>
              <div className="text-center">
                <img width="42px" src={loader} alt="loader" />
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="container"></div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { logginErrors: state.misc.logginErrors };
};

export default connect(mapStateToProps, { loginUser })(Login);
