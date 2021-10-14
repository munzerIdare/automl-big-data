import React, { lazy, Suspense, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PlotDiagramsTabs from "../../components/PlotDiagramsTabs";
import ShowTablesTabs from "../../components/ShowTablesTabs";
import UniversalLayout from "../../components/UniversalLayout";
import Console from "../../components/Console";

const DataTab = lazy(() => import("../../components/DataTab"));

const Dashboard = (props) => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <UniversalLayout fluidWidth={true}>
      <div className="main-content_body d-flex align-items-start">
        <div
          className="left-side_bar d-flex"
          style={{ display: "block" }}
          id="show-hide"
        >
          <div
            onClick={() => setShowSidebar(!showSidebar)}
            className="leftbar-hide-ui"
            style={{ display: showSidebar ? "none" : "block" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-chevron-compact-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"
              />
            </svg>
          </div>

          <div style={{ display: showSidebar ? "block" : "none" }}>
            <div
              className="tab-content tab-content_custom"
              id="v-pills-tabContent"
            >
              <Suspense fallback={<div>Loading...</div>}>
                <DataTab />
              </Suspense>
            </div>
            <Console />
          </div>
          <div
            onClick={() => setShowSidebar(!showSidebar)}
            className="leftbar-show-ui"
            style={{ display: showSidebar ? "block" : "none" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-chevron-compact-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"
              />
            </svg>
          </div>
        </div>

        <div className="main-body_content d-flex w-100 cell-body_content">
          <div className="container_height">
            <PlotDiagramsTabs />
            <ShowTablesTabs />
          </div>
        </div>
      </div>
    </UniversalLayout>
  );
};

const mapStateToProps = (state) => ({
  currentExperiment: state.experiment,
});

export default connect(mapStateToProps, {})(withRouter(Dashboard));
