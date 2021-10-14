import React from "react";
import { connect } from "react-redux";

const FullPageLoader = (props) => {
  if (!props.loader && !props.socketLoader) {
    return null;
  }
  return (
    <div>
      <div className="loading-container-box d-flex justify-content-center align-items-center">
        <div className="loader__no_bottom__space loader analysis_runing_img">
          <div className="inner one"></div>
          <div className="inner two"></div>
          <div className="inner three"></div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    loader: state.misc.loader,
    socketLoader: state.misc.socketLoader,
  }),
  null
)(FullPageLoader);
