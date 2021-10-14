/* eslint-disable react-hooks/exhaustive-deps */
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import RawDataTable from "./RawDataTable";

const StyledTabs = withStyles({
  root: {
    color: "#000",
    // position: "fixed",
    zIndex: "999",
    backgroundColor: "white",
  },
  fixed: {
    // width: "auto",
    flex: "none",
  },
  indicator: {
    backgroundColor: "transparent",
    height: "5px!important",
  },
})(Tabs);
const StyledTab = withStyles({
  root: {
    fontFamily: '"Montserrat", sans-serif',
    textTransform: "capitalize",
    fontSize: "0.75rem !important",
    minWidth: "70px!important",
    padding: "5px 6px !important",
    border: "1px solid #e4e5e6",
    flexBasis: "auto",
    minHeight: "28px",
    flexGrow: "inherit",
    "&:hover": {},
    "&.Mui-selected": {
      color: "#fff",
      backgroundImage: "linear-gradient(#8d0126, #230615) !important",
    },
  },
})(Tab);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="tabpanel_ui"
    >
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ShowTablesTabs = (props) => {
  const [rawDataURL, setRawDataURL] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setRawDataURL(props.trainingRawFileURL);
  }, [props.trainingRawFileURL]);

  const handleChange = (event, newValue) => {
    dispatch({
      type: "SET_TAB",
      payload: newValue,
    });
  };
  return (
    <div className="w-100">
      <div>
        <div className="nav nav-tabs nav-tabs_custom">
          <div className="mui-tabs-area">
            <StyledTabs
              value={props.activeTab}
              variant="fullWidth"
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <StyledTab label="Raw Data" {...a11yProps(0)} />
            </StyledTabs>
            <TabPanel value={props.activeTab} index={0}>
              <RawDataTable rawDataURL={rawDataURL} />
            </TabPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const trainingRawFileURL = state.experiment.training
    ? state.experiment.training.train_raw_data
      ? state.experiment.training.train_raw_data
      : null
    : null;

  return {
    activeTab: state.misc.activeTab,
    experiment: state.experiment,
    trainingRawFileURL: trainingRawFileURL,
  };
};

export default connect(mapStateToProps)(ShowTablesTabs);
