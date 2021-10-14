/* eslint-disable import/no-anonymous-default-export */

const initialState = {
  trainRawColsWithoutDate: null,
  trainNumericColumns: null,
  trainDateColumns: null,
  trainNumericDateColumns: null,
  instanceList: null,
  trainRawColumns: null,
  predNumericColumns: null,
  predDateColumns: null,
  predNumericDateColumns: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "RESET_APP":
      return initialState;
    case "SET_TRAIN_RAW_COLUMNS":
      return {
        ...state,
        trainRawColumns: action.payload,
      };

    case "SET_TRAIN_COLS_WITHOUT_DATE":
      return {
        ...state,
        trainRawColsWithoutDate: action.payload,
      };

    case "SET_INSTANCE_LIST":
      return {
        ...state,
        instanceList: action.payload,
      };

    case "SET_TRAIN_NUM_COLUMNS":
      return {
        ...state,
        trainNumericColumns: action.payload,
      };
    case "SET_PRED_NUM_COLUMNS":
      return {
        ...state,
        predNumericColumns: action.payload,
      };
    case "SET_TRAIN_DATE_COLUMNS":
      return {
        ...state,
        trainDateColumns: action.payload,
      };
    case "SET_PRED_DATE_COLUMNS":
      return {
        ...state,
        predDateColumns: action.payload,
      };
    case "SET_TRAIN_NUM_DATE_COLUMNS":
      return {
        ...state,
        trainNumericDateColumns: action.payload,
      };
    case "SET_PRED_NUM_DATE_COLUMNS":
      return {
        ...state,
        predNumericDateColumns: action.payload,
      };

    default:
      return state;
  }
};
