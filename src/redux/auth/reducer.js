const defaultState = {
  userId: null,
  userName: null,
  token: null,
  refresh: null,
  isLoggedIn: false,
  email: null,
  first_name: null,
  last_name: null,
};

const userInfo = localStorage.getItem("USER_INFO");
const INITIAL_STATE = userInfo ? JSON.parse(userInfo) : defaultState;

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...state,
        userName: action.payload.userName,
        userId: action.payload.userId,
        token: action.payload.token,
        refresh: action.payload.refresh,
        isLoggedIn: action.payload.isLoggedIn,
        email: action.payload.email,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
      };
    case "RESET_USER_INFO":
      return {
        ...defaultState,
      };
    default:
      return state;
  }
}
