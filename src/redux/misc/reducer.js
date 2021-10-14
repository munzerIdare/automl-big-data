/* eslint-disable import/no-anonymous-default-export */
const initialState = {
  loader: false,
  socketLoader: false,
  activeTab: 0,
  cellFourActiveTab: 0,
  cellOneActiveTab: 0,
  loadProjectList: false,
  logginErrors: "",
  signUpErrors: {},
  rawDataModal: false,
  selectedInstance: null,
  selectedXAxis: null,
  selectedAlgo: null,
  showDesBtn: false,
  showRecomBtn: false,
  uploadImgBtn: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "RESET_APP":
      return initialState;
    case "TOGGLE_LOADER":
      return {
        ...state,
        loader: !state.loader,
      };
    case "SET_LOADER":
      return {
        ...state,
        loader: true,
      };
    case "REMOVE_LOADER":
      return {
        ...state,
        loader: false,
      };
    case "SET_SOCKET_LOADER":
      return {
        ...state,
        socketLoader: true,
      };
    case "REMOVE_SOCKET_LOADER":
      return {
        ...state,
        socketLoader: false,
      };

    //tab
    case "SET_TAB":
      return {
        ...state,
        activeTab: action.payload,
      };
    case "SET_CELL_FOUR_TAB":
      return {
        ...state,
        cellFourActiveTab: action.payload,
      };
    case "SET_CELL_ONE_TAB":
      return {
        ...state,
        cellOneActiveTab: action.payload,
      };
    case "LOAD_PROJECT_LIST":
      return {
        ...state,
        loadProjectList: true,
      };
    case "SET_LOGIN_ERRORS":
      return {
        ...state,
        logginErrors: action.payload,
      };
    case "SET_SIGNUP_ERRORS":
      return {
        ...state,
        signUpErrors: action.payload,
      };
    case "SET_RAW_DATA_MODAL":
      return {
        ...state,
        rawDataModal: true,
      };
    case "REMOVE_RAW_DATA_MODAL":
      return {
        ...state,
        rawDataModal: false,
      };
    case "SET_SELECTED_INSTANCE":
      return {
        ...state,
        selectedInstance: action.payload,
      };
    case "SET_SELECTED_XAXIS":
      return {
        ...state,
        selectedXAxis: action.payload,
      };
    case "SET_SELECTED_ALGO":
      return {
        ...state,
        selectedAlgo: action.payload,
      };
    case "SHOW_DES_BTN":
      return {
        ...state,
        showDesBtn: true,
      };
    case "HIDE_DES_BTN":
      return {
        ...state,
        showDesBtn: false,
      };
    case "SHOW_RECOM_BTN":
      return {
        ...state,
        showRecomBtn: true,
      };
    case "HIDE_RECOM_BTN":
      return {
        ...state,
        showRecomBtn: false,
      };
    case "SHOW_IMAGE_UP_BTN":
      return {
        ...state,
        uploadImgBtn: true,
      };
    case "HIDE_IMAGE_UP_BTN":
      return {
        ...state,
        uploadImgBtn: false,
      };

    default:
      return state;
  }
};
