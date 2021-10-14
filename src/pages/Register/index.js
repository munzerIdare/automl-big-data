import React from "react";
import { registerUser } from "../../redux/auth/actions";
import { connect } from "react-redux";

const Register = (props) => {
  return (
    <div>
      <div className="container">Register</div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { signUpErrors: state.misc.signUpErrors };
};

export default connect(mapStateToProps, { registerUser })(Register);
