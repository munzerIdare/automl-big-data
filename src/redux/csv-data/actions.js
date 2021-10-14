import * as dfd from "danfojs/src/index";
import { without } from "lodash";

export const setInstancList = (instance, fileURL) => async (dispatch) => {
  let df = await dfd.read_csv(fileURL);
  const insList = df[instance].unique().values;
  dispatch({
    type: "SET_INSTANCE_LIST",
    payload: insList,
  });
};
export const handleTrainCSVColumns = (fileURL) => async (dispatch) => {
  const numericTypes = ["int32", "float32"];
  console.log("this is from raw sata=== table ds");
  try {
    dispatch({
      type: "SET_LOADER",
    });
    let df = await dfd.read_csv(fileURL);

    const columsTypes = [...df.col_types];
    const columns = [...df.columns];
    let columnsWithTypes = [];
    let numericColumns = [];
    columns.forEach((el, i) => {
      const each = columsTypes[i];
      let obj = {};
      obj.name = el;
      obj.type = each;
      columnsWithTypes.push(obj);
    });
    let date_col = [];
    columns.forEach((col, i) => {
      if (df[col].dtype === "string") {
        try {
          if (df[col] === dfd.to_datetime(df[col])) {
          }
          let da = df[col];
          da = dfd.to_datetime(df[col]);
          date_col.push(col);
        } catch (error) {
          console.log("errrror", col);
        }
      }
    });
    dispatch({
      type: "SET_SELECTED_INSTANCE",
      payload: null,
    });
    dispatch({
      type: "SET_SELECTED_INSTANCE",
      payload: "all",
    });
    columnsWithTypes.forEach((element) => {
      if (numericTypes.includes(element.type)) {
        numericColumns.push(element.name);
      }
    });

    if (date_col.length > 0) {
      const dateNumColumns = [...new Set(date_col.concat(numericColumns))];

      dispatch({
        type: "SET_TRAIN_DATE_COLUMNS",
        payload: date_col,
      });

      dispatch({
        type: "SET_TRAIN_NUM_DATE_COLUMNS",
        payload: dateNumColumns,
      });
    } else if (date_col.length === 0) {
      dispatch({
        type: "SET_TRAIN_DATE_COLUMNS",
        payload: null,
      });
      dispatch({
        type: "SET_TRAIN_NUM_DATE_COLUMNS",
        payload: null,
      });
    }
    const columnsWithoutDate = without(columns, ...date_col);

    dispatch({
      type: "SET_TRAIN_NUM_COLUMNS",
      payload: numericColumns,
    });

    dispatch({
      type: "SET_TRAIN_COLS_WITHOUT_DATE",
      payload: columnsWithoutDate,
    });
    dispatch({
      type: "SET_TRAIN_RAW_COLUMNS",
      payload: df.columns,
    });

    console.log("columnsWithoutDate====>", columnsWithoutDate);

    dispatch({
      type: "REMOVE_LOADER",
    });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: "REMOVE_LOADER",
    });
  }
};
export const handlePredCSVColumns = (fileURL) => async (dispatch) => {
  const numericTypes = ["int32", "float32"];
  console.log("this is from raw sata=== table");
  try {
    dispatch({
      type: "SET_LOADER",
    });
    let df = await dfd.read_csv(fileURL);

    const columsTypes = [...df.col_types];
    const columns = [...df.columns];
    let columnsWithTypes = [];
    let numericColumns = [];
    columns.forEach((el, i) => {
      const each = columsTypes[i];
      let obj = {};
      obj.name = el;
      obj.type = each;
      columnsWithTypes.push(obj);
    });

    let date_col = [];
    columns.forEach((col, i) => {
      if (df[col].dtype === "string") {
        try {
          if (df[col] === dfd.to_datetime(df[col])) {
          }
          let da = df[col];
          da = dfd.to_datetime(df[col]);
          date_col.push(col);
        } catch (error) {
          console.log("errrror", col);
        }
      }
    });

    columnsWithTypes.forEach((element) => {
      if (numericTypes.includes(element.type)) {
        numericColumns.push(element.name);
      }
    });

    if (date_col.length > 0) {
      const dateNumColumns = [...new Set(date_col.concat(numericColumns))];

      dispatch({
        type: "SET_PRED_DATE_COLUMNS",
        payload: date_col,
      });
      dispatch({
        type: "SET_PRED_NUM_DATE_COLUMNS",
        payload: dateNumColumns,
      });
    } else if (date_col.length === 0) {
      dispatch({
        type: "SET_PRED_DATE_COLUMNS",
        payload: null,
      });
      dispatch({
        type: "SET_PRED_NUM_DATE_COLUMNS",
        payload: null,
      });
    }

    dispatch({
      type: "SET_PRED_NUM_COLUMNS",
      payload: numericColumns,
    });

    dispatch({
      type: "REMOVE_LOADER",
    });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: "REMOVE_LOADER",
    });
  }
};
