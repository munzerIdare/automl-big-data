import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { connect } from "react-redux";

const CurrentProject = (props) => {
  return (
    <div>
      <div className="d-flex justify-content-between p-2">
        <p className="m-0">
          <span className="fw-bold">Project:</span>
          {!isEmpty(props.experiment) &&
            !isEmpty(props.experiment.analysis) &&
            !isEmpty(props.experiment.analysis.project) && (
              <span className="ms-1">
                {props.experiment.analysis.project.project_name}
              </span>
            )}
        </p>
        <p className="m-0">
          <span className="fw-bold">Analysis :</span>
          {!isEmpty(props.experiment) &&
            !isEmpty(props.experiment.analysis) && (
              <span className="ms-1">
                {props.experiment.analysis.analysis_name}
              </span>
            )}
        </p>
        <select className="m-0 border-0 outline-none">
          {!isEmpty(props.experiment) && (
            <option> {props.experiment.experiment_name}</option>
          )}
        </select>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  experiment: state.experiment,
});
export default connect(mapStateToProps, {})(CurrentProject);
