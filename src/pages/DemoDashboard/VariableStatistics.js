import Plotly from "plotly.js";
import React, { useState } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

const VariableStatistics = ({ instanceData, targetData }) => {
  return (
    <div className="container_height">
      {/* <!-- cell three --> */}
      <div className="top-right_cell w-100 border-start">
        <div className="">
          <ul
            className="nav nav-tabs nav-tabs_custom"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="accuracy-tab"
                data-bs-toggle="tab"
                data-bs-target="#accuracy"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Prediction Accuracy chart
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Data Quality Plot
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#contact"
                type="button"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                Anomaly Plots
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="accuracy"
              role="tabpanel"
              aria-labelledby="accuracy-tab"
            ></div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              ...
            </div>
            <div
              className="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              ...
            </div>
          </div>
        </div>
      </div>
      {/* <!-- cell four --> */}
      <div
        // style={{ marginTop: "10rem" }}
        className="top-left_cell w-100 border-start"
      >
        <div className="">
          <ul
            className="nav nav-tabs nav-tabs_custom"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="stat-tab"
                data-bs-toggle="tab"
                data-bs-target="#stat"
                type="button"
                role="tab"
                aria-controls="stat"
                // aria-selected="true"
              >
                Variable Statistics
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="stat"
              role="tabpanel"
              aria-labelledby="stat-tab"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariableStatistics;
