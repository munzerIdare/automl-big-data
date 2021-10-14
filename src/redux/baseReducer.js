import { combineReducers } from "redux";
import userReducer from "./auth/reducer";
import experimentReducer from "./experiment/reducer";
import miscReducer from "./misc/reducer";
import csvReducer from "./csv-data/reducer";

export default combineReducers({
  experiment: experimentReducer,
  user: userReducer,
  misc: miscReducer,
  csvData: csvReducer,
});
