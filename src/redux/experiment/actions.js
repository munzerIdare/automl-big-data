import request from "../../utils/request";
import {
  handleTrainCSVColumns,
  handlePredCSVColumns,
  setInstancList,
} from "../csv-data/actions";

export const createNewExperiment = (expInfo, history) => async (dispatch) => {
  dispatch({
    type: "SET_LOADER",
  });
  try {
    const { data } = await request.post(
      "/api/create_full_experiments/",
      expInfo
    );
    dispatch({
      type: "SET_CURRENT_EXPERIMENT",
      payload: { ...data },
    });
    dispatch({
      type: "REMOVE_LOADER",
    });
    history.push(`/dashboard/experiments/${data.id}/data`);
  } catch (error) {
    dispatch({
      type: "REMOVE_LOADER",
    });
  }
};

export const getExperimentById =
  (id, history, route, report) => async (dispatch) => {
    dispatch({
      type: "SET_LOADER",
    });
    try {
      const { data } = await request.get(`/api/experiments/${id}`);

      if (
        data.instance_variable &&
        data.training &&
        data.training.train_raw_data
      ) {
        dispatch(
          setInstancList(data.instance_variable, data.training.train_raw_data)
        );
        if (data.training.train_processed_data === null) {
          dispatch(handleTrainCSVColumns(data.training.train_raw_data));
        } else if (data.training.train_processed_data) {
          dispatch(handleTrainCSVColumns(data.training.train_processed_data));
        }
        if (data.prediction && data.prediction.pred_raw_data) {
          if (data.prediction.train_processed_data === null) {
            dispatch(handlePredCSVColumns(data.prediction.pred_raw_data));
          } else if (data.prediction.pred_processed_data) {
            dispatch(handlePredCSVColumns(data.prediction.pred_processed_data));
          }
        }

        console.log("");
      }

      dispatch({
        type: "SET_CURRENT_EXPERIMENT",
        payload: { ...data },
      });
      dispatch({
        type: "REMOVE_LOADER",
      });
      if (route && report) {
        history.push(`/dashboard/report/${data.id}`);
      } else if (route && !report) {
        history.push(`/dashboard/experiments/${data.id}/${route}`);
      }
    } catch (error) {
      dispatch({
        type: "REMOVE_LOADER",
      });
    }
  };

export const getLastExperiment = (history) => async (dispatch) => {
  dispatch({
    type: "SET_LOADER",
  });
  try {
    const { data } = await request.get("/api/get_last_experiments/");
    if (
      data.instance_variable &&
      data.training &&
      data.training.train_raw_data
    ) {
      dispatch(
        setInstancList(data.instance_variable, data.training.train_raw_data)
      );
      if (data.training.train_processed_data === null) {
        dispatch(handleTrainCSVColumns(data.training.train_raw_data));
      } else if (data.training.train_processed_data) {
        dispatch(handleTrainCSVColumns(data.training.train_processed_data));
      }
      if (data.prediction && data.prediction.pred_raw_data) {
        if (data.prediction.train_processed_data === null) {
          dispatch(handlePredCSVColumns(data.prediction.pred_raw_data));
        } else if (data.prediction.pred_processed_data) {
          dispatch(handlePredCSVColumns(data.prediction.pred_processed_data));
        }
      }
    }
    dispatch({
      type: "SET_CURRENT_EXPERIMENT",
      payload: { ...data },
    });
    dispatch({
      type: "REMOVE_LOADER",
    });
    history.push(`/dashboard/experiments/${data.id}/data`);
  } catch (error) {
    dispatch({
      type: "REMOVE_LOADER",
    });
  }
};

export const setRawFile = (file, fileName, id) => async (dispatch) => {
  let formData = new FormData(); //formdata object

  formData.append("file", file); //append the values with key, value pair
  formData.append("experiment", 1);

  try {
    dispatch({
      type: "SET_LOADER",
    });
    const uploadedFile = await request.post("/api/s3-uploader/", formData);

    const s3Link = uploadedFile.data.file;

    await request.post(`/api/experiments/${id}/training/upload_raw_data/`, {
      train_raw_data: s3Link,
      train_filename: fileName,
    });
    dispatch({
      type: "SET_TRAIN_DATE_COLUMNS",
      payload: null,
    });
    dispatch({
      type: "SET_TRAIN_NUM_DATE_COLUMNS",
      payload: null,
    });
    dispatch({
      type: "SET_RAW_DATA",
      payload: null,
    });
    dispatch({
      type: "SET_TRAIN_NUM_COLUMNS",
      payload: null,
    });

    dispatch({
      type: "SET_TRAIN_COLS_WITHOUT_DATE",
      payload: null,
    });
    dispatch({
      type: "SET_TRAIN_RAW_COLUMNS",
      payload: null,
    });
    dispatch({
      type: "RESET_EXPERIMENT",
    });
    dispatch({
      type: "SET_TAB",
      payload: 0,
    });

    dispatch({
      type: "SET_RAW_DATA_URL",
      payload: s3Link,
    });
    dispatch(handleTrainCSVColumns(s3Link));

    dispatch({
      type: "SET_RAW_DATA_FILE_NAME",
      payload: fileName,
    });
    dispatch({
      type: "SET_PLOTTING_TRAIN_URL",
      payload: s3Link,
    });
    dispatch({
      type: "SET_RAW_DATA_MODAL",
    });
  } catch (error) {
    console.log("catch", error);
    dispatch({
      type: "REMOVE_LOADER",
    });
  }
};
export const updateRawFile =
  (columns, type, id, fileName) => async (dispatch) => {
    try {
      dispatch({
        type: "SET_LOADER",
      });

      const { data } = await request.post(
        `/api/experiments/${id}/training/update_raw_data/`,
        {
          variables: columns,
          action_type: type,
        }
      );
      console.log("data of update===>", data);
      dispatch({
        type: "SET_TRAIN_DATE_COLUMNS",
        payload: null,
      });
      dispatch({
        type: "SET_TRAIN_NUM_DATE_COLUMNS",
        payload: null,
      });
      dispatch({
        type: "SET_RAW_DATA",
        payload: null,
      });
      dispatch({
        type: "SET_TRAIN_NUM_COLUMNS",
        payload: null,
      });

      dispatch({
        type: "SET_TRAIN_COLS_WITHOUT_DATE",
        payload: null,
      });
      dispatch({
        type: "RESET_EXPERIMENT",
      });
      dispatch({
        type: "SET_TAB",
        payload: 0,
      });
      dispatch({
        type: "SET_RAW_DATA_URL",
        payload: data.train_raw_data,
      });
      dispatch(handleTrainCSVColumns(data.train_raw_data));
      dispatch({
        type: "SET_RAW_DATA_FILE_NAME",
        payload: fileName,
      });
      dispatch({
        type: "SET_PLOTTING_TRAIN_URL",
        payload: data.train_raw_data,
      });

      dispatch({
        type: "REMOVE_LOADER",
      });
    } catch (error) {
      console.log("catch", error);
      dispatch({
        type: "REMOVE_LOADER",
      });
    }
  };

export const getPredictedTimeSeriesFile =
  (file, expID, instance, target) => async (dispatch) => {
    try {
      if (file && expID && instance && target) {
        const objToPost = {
          input_file: file,
          experiment_id: expID,
          instance_variable: instance,
          target_variable: target,
        };

        try {
          dispatch({
            type: "SET_LOADER",
          });
          await request.post("/api/ml_functions/run_auto_pred/", objToPost);
          dispatch({
            type: "REMOVE_LOADER",
          });
        } catch (error) {
          console.log("catch from child", error);
          dispatch({
            type: "REMOVE_LOADER",
          });
        }
      }
    } catch (error) {
      console.log("catch from parent", error);
      dispatch({
        type: "REMOVE_LOADER",
      });
    }
  };
export const cleanBasicData = (expID, instance, target) => async (dispatch) => {
  try {
    if (expID && instance && target) {
      const objToPost = {
        instance_variable: instance,
        target_variable: target,
      };

      try {
        dispatch({
          type: "SET_LOADER",
        });
        await request.post(
          `/api/experiments/${expID}/training/clean_data_basic/`,
          objToPost
        );
        dispatch({
          type: "REMOVE_LOADER",
        });
      } catch (error) {
        console.log("catch from child", error);
        dispatch({
          type: "REMOVE_LOADER",
        });
      }
    }
  } catch (error) {
    console.log("catch from parent", error);
    dispatch({
      type: "REMOVE_LOADER",
    });
  }
};
export const setInstanceTarget =
  (expID, instance, target) => async (dispatch) => {
    try {
      if (expID && instance && target) {
        const objToPost = {
          instance_variable: instance,
          target_variable: target,
        };

        try {
          dispatch({
            type: "SET_LOADER",
          });
          await request.post(
            `/api/experiments/${expID}/training/set_instance_target/`,
            objToPost
          );

          dispatch({
            type: "REMOVE_LOADER",
          });
        } catch (error) {
          console.log("catch from child", error);
          dispatch({
            type: "REMOVE_LOADER",
          });
        }
      }
    } catch (error) {
      console.log("catch from parent", error);
      dispatch({
        type: "REMOVE_LOADER",
      });
    }
  };
export const setInstance = (instance) => async (dispatch) => {
  if (instance !== "") {
    dispatch({
      type: "SET_PREDICTED_TIME_SERIES_FILE_URL",
      payload: null,
    });
    dispatch({
      type: "SET_INSTANCE",
      payload: instance,
    });
  }
};

export const setTarget = (target) => async (dispatch) => {
  if (target !== "") {
    dispatch({
      type: "SET_PREDICTED_TIME_SERIES_FILE_URL",
      payload: null,
    });
    dispatch({
      type: "SET_TARGET",
      payload: target,
    });
  }
};

export const changeReportImage = (file, id) => async (dispatch) => {
  let formData = new FormData(); //formdata object

  formData.append("file", file); //append the values with key, value pair
  formData.append("experiment", id);
  formData.append("path", "report");

  try {
    dispatch({
      type: "SET_LOADER",
    });
    const uploadedFile = await request.post("/api/s3-uploader/", formData);

    const s3Link = uploadedFile.data.file;

    await request.put(`/api/experiments/${id}/reports/`, {
      image_link: s3Link,
    });

    dispatch({
      type: "HIDE_IMAGE_UP_BTN",
    });
    dispatch({
      type: "REMOVE_LOADER",
    });
  } catch (error) {
    console.log("catch", error);
    dispatch({
      type: "REMOVE_LOADER",
    });
  }
};
export const updateReportDetails = (key, value, id) => async (dispatch) => {
  try {
    dispatch({
      type: "SET_LOADER",
    });
    await request.put(`/api/experiments/${id}/reports/`, {
      [key]: value,
    });
    if (key === "recommendation") {
      dispatch({
        type: "HIDE_RECOM_BTN",
      });
    } else if (key === "description") {
      dispatch({
        type: "HIDE_DES_BTN",
      });
    }

    dispatch({
      type: "REMOVE_LOADER",
    });
  } catch (error) {
    console.log("catch", error);
    dispatch({
      type: "REMOVE_LOADER",
    });
  }
};
