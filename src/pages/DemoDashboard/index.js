import React from "react";
import VariableStatistics from "./VariableStatistics";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import PlotDiagramsTabs from "../../components/PlotDiagramsTabs";
import ShowTablesTabs from "../../components/ShowTablesTabs";
import UniversalLayout from "../../components/UniversalLayout";
import { getLastExperiment } from "../../redux/experiment/actions";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",

    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: { zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.84)" },
};

const DemoDashboard = (props) => {
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const history = useHistory();

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <UniversalLayout fluidWidth={true}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
      >
        <br />
        <ul style={{}} className="nav nav-pills">
          <li className="nav-item">
            <Link
              className="btn btn-focus me-4 px-5 rounded-0"
              to="/#"
              onClick={() => props.getLastExperiment(history)}
            >
              Open Last Solution
            </Link>
          </li>
          <li className="nav-item">
            <Link className="btn btn-focus px-5 rounded-0" to="/projects">
              Open Existing Project
            </Link>
          </li>
        </ul>
      </Modal>
      <div className="main-content_body d-flex align-items-start">
        <div className="left-side_bar" id="show-hide">
          <div
            className="tab-content tab-content_custom"
            id="v-pills-tabContent"
          ></div>
        </div>

        <div className="main-body_content d-flex w-100 cell-body_content">
          <div className="container_height">
            <PlotDiagramsTabs />
            <ShowTablesTabs />
          </div>

          <VariableStatistics />
        </div>
      </div>
    </UniversalLayout>
  );
};

export default connect(null, {
  getLastExperiment,
})(DemoDashboard);
