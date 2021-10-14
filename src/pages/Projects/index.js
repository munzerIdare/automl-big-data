import React, { useEffect, useState } from "react";
import UniversalLayout from "../../components/UniversalLayout";
import { connect } from "react-redux";

const Projects = (props) => {
  return (
    <UniversalLayout fluidWidth hideDataTab>
      <div className="main-content_body d-flex align-items-start">
        <div className="w-50">
          <div className="left-side_bar w-100" id="show-hide">
            <div className="base-bg-border_color text-white">
              <h6 className="m-2">Projects</h6>
            </div>
          </div>
        </div>
        <div className="w-50">
          <div className="left-side_bar w-100" id="show-hide">
            <div className="base-bg-border_color text-white">
              <h6 className="m-2">Members</h6>
            </div>
          </div>
        </div>
      </div>
    </UniversalLayout>
  );
};

const mapStateToProps = (state) => {
  return { loadProjectList: state.misc.loadProjectList };
};
export default connect(mapStateToProps, {})(Projects);
