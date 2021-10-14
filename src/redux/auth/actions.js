import decode from "jwt-decode";
import { toast } from "react-toastify";
import axios from "axios";
import request from "../../utils/request";

export const logOut = (history) => async (dispatch) => {
  toast.success("Logout Success");
  localStorage.removeItem("USER_INFO");
  dispatch({ type: "RESET_APP" });
  dispatch({ type: "RESET_USER_INFO" });
  history.push("/login");
};

export const loginUser = (UserInfo) => async (dispatch) => {
  dispatch({ type: "SET_LOADER" });

  const baseURL = process.env.REACT_APP_BASE_URL;
  const url = `/auth/api/login/`;
  const loggedUserURL = `/auth/api/user/`;
  try {
    const { data } = await axios.post(`${baseURL + url}`, UserInfo);
    const userID_decoded = decode(data.refresh);
    const userID = userID_decoded.user_id;
    const token = data.access;
    const refresh = data.refresh;
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const userData = await axios.get(`${baseURL + loggedUserURL}`, config);
    const userInfo_local = {
      userId: userID,
      userName: "Admin",
      token: token,
      refresh: refresh,
      isLoggedIn: true,
      email: userData.data.email,
      first_name: userData.data.first_name,
      last_name: userData.data.last_name,
    };
    localStorage.setItem("USER_INFO", JSON.stringify(userInfo_local));
    toast.success("Login Success");
    dispatch({
      type: "SET_USER_INFO",
      payload: { ...userInfo_local },
    });

    dispatch({ type: "REMOVE_LOADER" });
    dispatch({
      type: "SET_LOGIN_ERRORS",
      payload: "",
    });
  } catch (error) {
    toast.error("Error on Login");
    console.log("Error on login===>", error.response.data);
    dispatch({ type: "REMOVE_LOADER" });
    dispatch({
      type: "SET_LOGIN_ERRORS",
      payload: error.response.data.detail,
    });
  }
};
export const loginWithKey = (userkey, pId, history) => async (dispatch) => {
  dispatch({ type: "SET_LOADER" });

  const baseURL = process.env.REACT_APP_BASE_URL;
  const url = `/auth/api/login_with_key/`;
  const loggedUserURL = `/auth/api/user/`;
  try {
    const { data } = await axios.post(`${baseURL + url}`, {
      user_key: userkey,
    });
    const userID_decoded = decode(data.refresh);
    const userID = userID_decoded.user_id;
    const token = data.access;
    const refresh = data.refresh;
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const userData = await axios.get(`${baseURL + loggedUserURL}`, config);
    const userInfo_local = {
      userId: userID,
      userName: "Admin",
      token: token,
      refresh: refresh,
      isLoggedIn: true,
      email: userData.data.email,
      first_name: userData.data.first_name,
      last_name: userData.data.last_name,
    };
    localStorage.setItem("USER_INFO", JSON.stringify(userInfo_local));
    toast.success("Login Success");
    dispatch({
      type: "SET_USER_INFO",
      payload: { ...userInfo_local },
    });
    history.push(`/projects?project_guid=${pId}`);
    // window.location.assign(`/projects/${pId}`);
    dispatch({ type: "REMOVE_LOADER" });
    dispatch({
      type: "SET_LOGIN_ERRORS",
      payload: "",
    });
  } catch (error) {
    toast.error("Error on Login");
    console.log("Error on login===>", error.response.data);
    dispatch({ type: "REMOVE_LOADER" });
    dispatch({
      type: "SET_LOGIN_ERRORS",
      payload: error.response.data.detail,
    });
  }
};
export const registerUser = (UserInfo, history) => async (dispatch) => {
  dispatch({ type: "SET_LOADER" });
  const baseURL = process.env.REACT_APP_BASE_URL;
  const url = `/auth/api/register/`;
  try {
    await axios.post(`${baseURL + url}`, UserInfo);

    toast.success("Register Successful");

    dispatch({ type: "REMOVE_LOADER" });
    dispatch({ type: "SET_SIGNUP_ERRORS", payload: {} });
    history.push("/login");
  } catch (error) {
    toast.error("Error on Register");

    dispatch({ type: "SET_SIGNUP_ERRORS", payload: error.response.data });
    dispatch({ type: "REMOVE_LOADER" });
  }
};
