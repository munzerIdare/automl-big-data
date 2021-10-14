/* eslint-disable import/no-anonymous-default-export */
import _ from "lodash";
const initialState = {
  id: null,
  experiment_name: null,
  author: {
    first_name: null,
    last_name: null,
    email: null,
  },
  analysis: {
    id: null,
    analysis_name: null,
    solution_type: null,
    project: {
      id: null,
      project_name: null,
      created_at: "2021-09-06T09:06:38.996556Z",
      updated_at: "2021-09-06T09:06:39.003423Z",
      created_by: {
        first_name: null,
        last_name: null,
        email: null,
      },
    },
  },
  instance_variable: null,
  target_variable: null,
  impute: null,
  training: {
    train_filename: null,
    train_raw_data: null,
    train_processed_data: null,
    ms_accuracy_metrics: null,
    ms_validation: null,
    train_test_file: null,
    train_result: null,
    train_var_stat:
      "https://automl-media.s3.amazonaws.com//home/app/src/media/experiment_28/variable_statistics_data/variable_stat.csv",
    train_val_result: null,
    train_var_importance: null,
    train_score: null,
    selected_variables: null,
  },
  prediction: null,
  is_draft: null,
  created_at: "2021-09-06T09:06:39.008691Z",
  updated_at: "2021-09-06T09:07:38.010346Z",
  algorithms: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "RESET_EXPERIMENT":
      return {
        id: state.id,
        experiment_name: state.experiment_name,
        author: state.author,
        analysis: state.analysis,
        DataQualityChartURL: state.DataQualityChartURL,
        instance_variable: null,
        target_variable: null,
        training: null,
        prediction: null,
        selected_variables: null,
      };
    case "SET_CURRENT_EXPERIMENT":
      return {
        ...action.payload,
        // training:
        //   action.payload.training === null
        //     ? initialTrainingObj
        //     : action.payload.training,
      };
    case "SET_NEW_EXPERIMENT":
      return {
        ...action.payload,
        training: {
          ...state.training,
        },
      };
    case "SET_RAW_DATA_URL":
      return {
        ...state,
        training: {
          ...state.training,
          train_raw_data: action.payload,
        },
      };
    case "SET_RAW_DATA_FILE_NAME":
      return {
        ...state,
        training: {
          ...state.training,
          train_filename: action.payload,
        },
      };
    case "SET_INSTANCE":
      return {
        ...state,
        instance_variable: action.payload,
      };
    case "SET_TARGET":
      return {
        ...state,
        target_variable: action.payload,
      };
    case "SET_SELECTED_VARIABLES":
      return {
        ...state,
        training: {
          ...state.training,
          selected_variables: action.payload,
        },
      };
    case "SET_VARIABLES":
      return {
        ...state,
        training: {
          ...state.training,
          selected_variables: state.training.selected_variables.includes(
            action.payload
          )
            ? state.training.selected_variables.filter(
                (item) => item !== action.payload
              )
            : [...state.training.selected_variables, action.payload],
        },
      };
    case "SET_ALL_VARIABLES":
      return {
        ...state,
        training: {
          ...state.training,
          selected_variables: action.payload,
        },
      };
    case "SET_TRAINING_VARIABLE_STAT_URL":
      return {
        ...state,
        training: {
          ...state.training,
          train_var_stat: action.payload,
        },
      };

    case "SET_PREDICTION_VARIABLE_STAT_URL":
      return {
        ...state,
        prediction: {
          ...state.prediction,
          pred_var_stat: action.payload,
        },
      };
    case "SET_TRAINING_RESULT_FILE_URL":
      return {
        ...state,
        training: {
          ...state.training,
          train_result: action.payload,
        },
      };
    case "SET_TRAINING_PROCESSED_FILE_URL":
      return {
        ...state,
        training: {
          ...state.training,
          train_processed_data: action.payload,
        },
      };
    case "SET_TRAINING_PREDICTED_PLOTTING_FILE_URL":
      return {
        ...state,
        training: {
          ...state.training,
          train_test_file: action.payload,
        },
      };
    case "SET_PREDICTION_ACCURACY_CHART_URL":
      return {
        ...state,
        training: {
          ...state.training,
          train_score: action.payload,
        },
      };
    case "SET_VALIDATION_RESULT_FILE_URL":
      return {
        ...state,
        training: {
          ...state.training,
          train_val_result: action.payload,
        },
      };
    case "SET_VARIABLE_IMPORTANCE_FILE_URL":
      return {
        ...state,
        training: {
          ...state.training,
          train_var_importance: action.payload,
        },
      };
    case "RESET_PREDICTION":
      return {
        ...state,
        prediction: null,
      };
    case "SET_PREDICTION_FILE_URL":
      return {
        ...state,
        prediction: {
          ...state.prediction,
          pred_raw_data: action.payload,
        },
      };
    case "SET_PREDICTION_PROCESSED_FILE_URL":
      return {
        ...state,
        prediction: {
          ...state.prediction,
          pred_processed_data: action.payload,
        },
      };
    case "SET_PREDICTION_RESULT_FILE_URL":
      let obj = {
        pred_result: action.payload,
        created_at: new Date(),
        updated_at: new Date(),
      };
      return {
        ...state,
        prediction: {
          ...state.prediction,
          prediction_result: [obj],
        },
      };

    default:
      return state;
  }
};
