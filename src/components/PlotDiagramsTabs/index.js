/* eslint-disable react-hooks/exhaustive-deps */
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";

import ScatterPlot from "./ScatterPlot";

const StyledTabs = withStyles({
  root: {
    color: "#000",

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
      className="topleft-panel_ui"
    >
      {value === index && <Box p={3}>{children}</Box>}
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

const PlotDiagramsTabs = (props) => {
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch({
      type: "SET_CELL_ONE_TAB",
      payload: newValue,
    });
  };

  return (
    <div className="w-100 cell_1">
      {/* <!-- cell one --> */}
      <div>
        <div className="nav nav-tabs nav-tabs_custom">
          <div className="mui-tabs-area">
            <StyledTabs
              value={props.activeTab}
              variant="fullWidth"
              onChange={handleChange}
              aria-label="simple tabs example"
              className=""
            >
              <StyledTab label={`Scatter Chart `} {...a11yProps(0)} />
            </StyledTabs>
            <TabPanel value={props.activeTab} index={0}>
              <ScatterPlot />
            </TabPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeTab: state.misc.cellOneActiveTab,
  };
};

export default connect(mapStateToProps, {})(PlotDiagramsTabs);
