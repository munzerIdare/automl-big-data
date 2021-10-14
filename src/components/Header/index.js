import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import loader from "../../img/loader.png";
import { logOut } from "../../redux/auth/actions";

const StyledTabs = withStyles({
  root: {
    // backgroundColor: "#f0f0f0",
    color: "#000",
    marginTop: "6px",
    width: "600px",
  },
  indicator: {
    backgroundColor: "#f1023f",
    height: "5px!important",
    width: "92px !important",
  },
})(Tabs);
const StyledTab = withStyles({
  root: {
    fontFamily: '"Montserrat", sans-serif',
    textTransform: "capitalize",
    fontSize: "0.75rem !important",
    minWidth: "90px!important",
    // widht: "100 !important",
    // backgroundColor: "#f0f0f0",
    backgroundColor: "transparent !important",
    // width: "100px!important",
    padding: "0px !important",
    // border: "1px solid #e4e5e6",
    minHeight: "37px",
    fontWeight: "bold",
    // width: "100%",
    display: "inline-block",
    // padding: "10px 5px",
    boxSizing: "border-box",
    overflow: "inherit",
    opacity: "inherit",
    "&:after": {
      content: "''",
      display: "block",
      position: "absolute",
      transform: "skew(40deg, 0)",
      // backgroundImage: "linear-gradient(#F1023F, #F1023F)",
      backgroundColor: "#f0f0f0",
      height: "50%",
      top: "0",
      zIndex: "-1",
      left: "5px",
      width: "89px",
    },
    "&:before": {
      content: "''",
      display: "block",
      position: "absolute",
      transform: "skew(-40deg, 0)",
      // backgroundImage: "linear-gradient(#F1023F, #F1023F)",
      backgroundColor: "#f0f0f0",
      height: "50%",
      top: "18px",
      zIndex: "-1",
      left: "5px",
      width: "89px",
    },
    "&:hover": {},
    "&.Mui-selected": {
      color: "#fff",
      borderStyle: "solid solid double;",

      height: "36px",
    },
    "&.Mui-selected:before": {
      backgroundImage: "linear-gradient(#f1023f, #230615) !important",
    },
    "&.Mui-selected:after": {
      backgroundImage: "linear-gradient(#f1023f, #f1023f) !important",
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
const Header = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let history = useHistory();

  const routeTo = (to) => {};

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light border-bottom p-0">
          <div className="header_section container-fluid p-0 pr-2">
            {!props.hideDataTab ? (
              <div className={"nav nav-pills left-nav_custom w-100"}>
                <StyledTabs
                  variant="scrollable"
                  scrollButtons="auto"
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <StyledTab
                    onClick={() => routeTo("data")}
                    label="Data"
                    {...a11yProps(0)}
                  />
                </StyledTabs>
              </div>
            ) : (
              <div> </div>
            )}

            <div className="d-flex justify-between align-items-center w-100">
              <a className="navbar-brand p-0 newtimes_font logo_ui" href="#">
                <span className="brand_color">
                  <span>idareAI</span>
                </span>
              </a>
              <div className="text-center">
                <img width="42px" src={loader} />
              </div>

              <div className="navbar-collapse d-flex" id="navbarText">
                <ul className="navbar-nav top-navbar_custom mx-auto mb-lg-0 d-inline-block">
                  <li className="nav-item d-inline-block">
                    <Link className="nav-link nav-link_custom active" to="/">
                      Projects
                    </Link>
                  </li>
                  <li className="nav-item d-inline-block">
                    <Link className="nav-link nav-link_custom active" to="/">
                      Home
                    </Link>
                  </li>
                </ul>
                {/* <!-- user section --> */}
                <div className="btn-group align-items-center pr-2">
                  <ul className="navbar-nav me-auto mb-lg-0">
                    <li className="nav-item">
                      <a
                        className="nav-link user-title_custom active"
                        aria-current="page"
                        href="#"
                      >
                        {props.user !== undefined && (
                          <span className="fw_500">
                            {props.user.first_name} {props.user.last_name}
                          </span>
                        )}

                        <br />
                        <span>Role</span>
                      </a>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="btn-secondary custom-circle_dropdown mr-2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    I
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button className="dropdown-item" type="button">
                        <Link to="/setting">Setting</Link>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => props.logOut(history)}
                        className="dropdown-item"
                        type="button"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

const mapStateToProps = (state) =>
  state.experiment
    ? { experimentID: state.experiment.id, user: state.user }
    : {};

export default connect(mapStateToProps, { logOut })(Header);
