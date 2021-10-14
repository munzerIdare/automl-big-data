/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { handleTrainCSVColumns } from "../../redux/csv-data/actions";
import store from "../../redux/store";

export default (outputData, callback, trainingRoutesIncludes) => {
  switch (outputData.action) {
    case "auto_pred_score":
      store.dispatch({
        type: "SET_PREDICTION_ACCURACY_CHART_URL",
        payload: null,
      });
      store.dispatch({
        type: "SET_PREDICTION_ACCURACY_CHART_URL",
        payload: outputData.output,
      });
      break;
    case "auto_pred_train_test":
      store.dispatch({
        type: "SET_TRAINING_PREDICTED_PLOTTING_FILE_URL",
        payload: null,
      });
      store.dispatch({
        type: "SET_TRAINING_PREDICTED_PLOTTING_FILE_URL",
        payload: outputData.output,
      });
      break;
    case "auto_pred_test_pred":
      store.dispatch({
        type: "SET_TRAINING_RESULT_FILE_URL",
        payload: outputData.output,
      });
      store.dispatch({
        type: "SET_TAB",
        payload: 2,
      });
      break;
    case "clean_data":
      callback();

      store.dispatch({
        type: "SET_TAB",
        payload: 1,
      });
      store.dispatch({
        type: "SET_TRAINING_PROCESSED_FILE_URL",
        payload: null,
      });
      store.dispatch({
        type: "SET_TRAINING_PROCESSED_FILE_URL",
        payload: outputData.output,
      });
      store.dispatch(handleTrainCSVColumns(outputData.output));
      store.dispatch({
        type: "SET_PLOTTING_TRAIN_URL",
        payload: outputData.output,
      });

      break;
    case "create_season":
      callback();
      store.dispatch({
        type: "SET_TAB",
        payload: 1,
      });
      store.dispatch({
        type: "SET_TRAINING_PROCESSED_FILE_URL",
        payload: null,
      });
      store.dispatch({
        type: "SET_TRAINING_PROCESSED_FILE_URL",
        payload: outputData.output,
      });
      store.dispatch(handleTrainCSVColumns(outputData.output));

      break;
    case "create_calendar":
      callback();
      store.dispatch({
        type: "SET_PLOTTING_TRAIN_URL",
        payload: outputData.output,
      });
      store.dispatch({
        type: "SET_TAB",
        payload: 1,
      });
      store.dispatch({
        type: "SET_TRAINING_PROCESSED_FILE_URL",
        payload: null,
      });
      store.dispatch({
        type: "SET_TRAINING_PROCESSED_FILE_URL",
        payload: outputData.output,
      });
      store.dispatch(handleTrainCSVColumns(outputData.output));

      break;
    case "fe_result":
      store.dispatch({
        type: "SET_TRAINING_RESULT_FILE_URL",
        payload: null,
      });
      store.dispatch({
        type: "SET_TRAINING_RESULT_FILE_URL",
        payload: outputData.output,
      });

      store.dispatch({
        type: "SET_TAB",
        payload: 2,
      });
      break;
    case "fe_pred_time_series":
      store.dispatch({
        type: "SET_TRAINING_PREDICTED_PLOTTING_FILE_URL",
        payload: null,
      });
      store.dispatch({
        type: "SET_TRAINING_PREDICTED_PLOTTING_FILE_URL",
        payload: outputData.output,
      });
      // store.dispatch({
      //   type: "SET_PREDICTED_TIME_SERIES_FILE_URL",
      //   payload: null,
      // });
      // store.dispatch({
      //   type: "SET_PREDICTED_TIME_SERIES_FILE_URL",
      //   payload: outputData.output,
      // });
      break;
    case "cv_result_combined":
      store.dispatch({
        type: "SET_VALIDATION_RESULT_FILE_URL",
        payload: null,
      });
      store.dispatch({
        type: "SET_VALIDATION_RESULT_FILE_URL",
        payload: outputData.output,
      });
      store.dispatch({
        type: "SET_CELL_FOUR_TAB",
        payload: 1,
      });

      break;
    case "fe_pred_acr_chart":
      store.dispatch({
        type: "SET_PREDICTION_ACCURACY_CHART_URL",
        payload: null,
      });
      store.dispatch({
        type: "SET_PREDICTION_ACCURACY_CHART_URL",
        payload: outputData.output,
      });
      break;
    case "set_var_imp":
      store.dispatch({
        type: "SET_VARIABLE_IMPORTANCE_FILE_URL",
        payload: null,
      });
      store.dispatch({
        type: "SET_VARIABLE_IMPORTANCE_FILE_URL",
        payload: outputData.output,
      });

      break;
    case "pred_clean":
      callback();
      store.dispatch({
        type: "SET_TAB",
        payload: 0,
      });
      store.dispatch({
        type: "SET_PREDICTION_PROCESSED_FILE_URL",
        payload: outputData.output,
      });
      store.dispatch({
        type: "SET_TAB",
        payload: 1,
      });
      break;
    case "variable_statistics":
      if (trainingRoutesIncludes) {
        store.dispatch({
          type: "SET_TRAINING_VARIABLE_STAT_URL",
          payload: null,
        });
        store.dispatch({
          type: "SET_TRAINING_VARIABLE_STAT_URL",
          payload: outputData.output,
        });
      } else {
        store.dispatch({
          type: "SET_PREDICTION_VARIABLE_STAT_URL",
          payload: null,
        });
        store.dispatch({
          type: "SET_PREDICTION_VARIABLE_STAT_URL",
          payload: outputData.output,
        });
      }
      break;
    case "model_pred_time_series":
      store.dispatch({
        type: "SET_TRAINING_PREDICTED_PLOTTING_FILE_URL",
        payload: null,
      });
      store.dispatch({
        type: "SET_TRAINING_PREDICTED_PLOTTING_FILE_URL",
        payload: outputData.output,
      });

      break;
    case "model_pred_accuracy_chart":
      store.dispatch({
        type: "SET_PREDICTION_ACCURACY_CHART_URL",
        payload: null,
      });
      store.dispatch({
        type: "SET_PREDICTION_ACCURACY_CHART_URL",
        payload: outputData.output,
      });

      break;
    case "model_result":
      store.dispatch({
        type: "SET_TAB",
        payload: 0,
      });
      store.dispatch({
        type: "SET_TRAINING_RESULT_FILE_URL",
        payload: outputData.output,
      });
      store.dispatch({
        type: "SET_TAB",
        payload: 2,
      });
      break;
    case "model_validation_result":
      store.dispatch({
        type: "SET_VALIDATION_RESULT_FILE_URL",
        payload: null,
      });
      store.dispatch({
        type: "SET_VALIDATION_RESULT_FILE_URL",
        payload: outputData.output,
      });
      store.dispatch({
        type: "SET_CELL_FOUR_TAB",
        payload: 1,
      });
      break;

    case "pred_reg":
      store.dispatch({
        type: "OPEN_CSV",
        payload: outputData.output,
      });
      store.dispatch({
        type: "SET_TAB",
        payload: 0,
      });
      store.dispatch({
        type: "SET_PLOTTING_PREDICTION_URL",
        payload: null,
      });
      store.dispatch({
        type: "SET_PLOTTING_PREDICTION_URL",
        payload: outputData.output,
      });

      store.dispatch({
        type: "SET_PREDICTION_PREDICTED_PLOTTING_FILE_URL",
        payload: null,
      });
      store.dispatch({
        type: "SET_PREDICTION_PREDICTED_PLOTTING_FILE_URL",
        payload: outputData.output,
      });
      store.dispatch({
        type: "SET_PREDICTION_RESULT_FILE_URL",
        payload: null,
      });
      store.dispatch({
        type: "SET_PREDICTION_RESULT_FILE_URL",
        payload: outputData.output,
      });
      store.dispatch({
        type: "SET_CELL_ONE_TAB",
        payload: 0,
      });

      store.dispatch({
        type: "SET_TAB",
        payload: 2,
      });
      break;
  }
};
