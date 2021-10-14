import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import store from "./redux/store";
import Routes from "./pages/routes";

import "./App.scss";
import "./scss/styles.scss";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <BrowserRouter>
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
    />
    <Fragment>
      <Provider store={store}>
        <Routes />
      </Provider>
    </Fragment>
  </BrowserRouter>,
  document.getElementById("root")
);
