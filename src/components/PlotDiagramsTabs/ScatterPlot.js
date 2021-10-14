import * as dfd from "danfojs/src/index";
import Plotly from "plotly.js";
import React, { useEffect, useState } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import { connect, useDispatch } from "react-redux";
import { getRandomColumn } from "../../utils/helpers";
import { sample } from "lodash";
const Plot = createPlotlyComponent(Plotly);
const ScatterPlot = (props) => {
  const dispatch = useDispatch();
  const [xAxisList, setXAxisList] = useState([]);
  const [yAxisList, setYAxisList] = useState([]);
  const [xAxisValue, setXAxisValue] = useState("");
  const [yAxisValue, setYAxisValue] = useState("");
  const [trace, setTrace] = useState({});
  const [layout, setLayout] = useState({});

  useEffect(() => {
    if (props.rawFileURL && props.rawColumns && props.numericColumns) {
      handleData(props.rawFileURL, props.rawColumns, props.numericColumns);
      setXAxisList(props.rawColumns);
      setYAxisList(props.numericColumns);
    }
  }, [props.rawFileURL, props.rawColumns, props.numericColumns]);

  const handleChangeXAxis = async (x, target, fileURL) => {
    if (fileURL === null) {
      return;
    }

    try {
      dispatch({
        type: "SET_LOADER",
      });
      let df = await dfd.read_csv(fileURL);

      if (x !== "" && target) {
        handlePlotLayout(x, target);
        let columnX = df[x].values;
        let columnY = df[target].values;

        plotScatter(columnX, columnY);
      } else {
        dispatch({
          type: "REMOVE_LOADER",
        });
      }
    } catch (error) {
      dispatch({
        type: "REMOVE_LOADER",
      });
      console.log(error);
    }
  };
  const handleChangeYAxis = async (x, target, fileURL) => {
    if (fileURL === null) {
      return;
    }

    try {
      dispatch({
        type: "SET_LOADER",
      });
      let df = await dfd.read_csv(fileURL);

      if (x !== "" && target) {
        handlePlotLayout(x, target);
        let columnX = df[x].values;
        let columnY = df[target].values;

        plotScatter(columnX, columnY);
      } else {
        dispatch({
          type: "REMOVE_LOADER",
        });
      }
    } catch (error) {
      dispatch({
        type: "REMOVE_LOADER",
      });
      console.log(error);
    }
  };

  const handleData = async (fileURL, rawCols, numCols) => {
    if (fileURL === null) {
      return;
    }

    try {
      dispatch({
        type: "SET_LOADER",
      });

      let colX = sample(rawCols);

      setXAxisValue(colX);
      let colY = getRandomColumn(numCols, colX);
      setYAxisValue(colY);

      let df = await dfd.read_csv(fileURL);

      if (colX && colY) {
        handlePlotLayout(colX, colY);
        let columnX = df[colX].values;
        let columnY = df[colY].values;
        plotScatter(columnX, columnY);
      } else {
        dispatch({
          type: "REMOVE_LOADER",
        });
      }
      dispatch({
        type: "REMOVE_LOADER",
      });
    } catch (error) {
      dispatch({
        type: "REMOVE_LOADER",
      });
      console.log(error);
    }
  };

  const handlePlotLayout = (x, y) => {
    if (x && y) {
      try {
        setLayout({
          plot_bgcolor: "#f7f7f7",
          paper_bgcolor: "#FFF3",
          margin: {
            // l: 50,
            // r: 50,
            // b: 5,
            t: 5,
            // pad: 10,
          },
          title: {
            font: {
              family: "Courier New, monospace",
              size: 12,
            },
            xref: "paper",
            x: 0.05,
          },
          xaxis: {
            gridcolor: "#fff",
            gridwidth: 1,
            title: {
              text: x,
              font: {
                family: "Courier New, monospace",
                size: 12,
                color: "#7f7f7f",
              },
            },
          },
          yaxis: {
            gridcolor: "#fff",
            gridwidth: 1,
            title: {
              text: y,
              font: {
                family: "Courier New, monospace",
                size: 12,
                color: "#7f7f7f",
              },
            },
          },
        });
      } catch (error) {
        console.error();
      }
    }
  };

  const plotScatter = (xArray, yArray) => {
    try {
      if (xArray && xArray.length > 0 && yArray && yArray.length > 0) {
        dispatch({
          type: "SET_LOADER",
        });

        setTrace({
          x: xArray,
          y: yArray,
          mode: "markers",
          type: "scatter",

          textposition: "top center",
          textfont: {
            family: "Raleway, sans-serif",
          },
          marker: {
            size: 5,
            color: yArray,
            colorscale: "YlGnBu",
            showscale: true,
          },
        });
        dispatch({
          type: "REMOVE_LOADER",
        });
      } else {
        dispatch({
          type: "REMOVE_LOADER",
        });
      }
    } catch (error) {
      dispatch({
        type: "REMOVE_LOADER",
      });
      console.log(error);
    }
  };

  if (props.rawFileURL === null || props.rawColumns === null) {
    return <div> </div>;
  }

  return (
    <div>
      <div style={{}}>
        <div className="plot-select-container">
          <div>
            <label>Select X-Axis</label>
            <select
              value={xAxisValue}
              className="form-select mb-1 form-select_custom"
              aria-label="Default select example"
              onChange={(e) => {
                setXAxisValue(e.target.value);
                dispatch({
                  type: "SET_SELECTED_XAXIS",
                  payload: e.target.value,
                });

                handleChangeXAxis(e.target.value, yAxisValue, props.rawFileURL);
              }}
            >
              {xAxisList &&
                xAxisList.length > 0 &&
                xAxisList.map((o, j) => {
                  return (
                    <option disabled={yAxisValue === o} key={j} value={o}>
                      {o}
                    </option>
                  );
                })}
            </select>
          </div>

          <div>
            <label>Select Y-Axis</label>
            <select
              value={yAxisValue}
              className="form-select mb-1 form-select_custom"
              aria-label="Default select example"
              onChange={(e) => {
                setYAxisValue(e.target.value);
                handleChangeYAxis(xAxisValue, e.target.value, props.rawFileURL);
              }}
            >
              {yAxisList &&
                yAxisList.length > 0 &&
                yAxisList.map((o, j) => {
                  return (
                    <option disabled={xAxisValue === o} key={j} value={o}>
                      {o}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <label>Filter By</label>
            <select
              className="form-select mb-1 form-select_custom"
              aria-label="Default select example"
            >
              <option>...</option>
            </select>
          </div>
        </div>
        <Plot
          data={[trace]}
          layout={layout}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const trainingRawFileURL = state.experiment.training
    ? state.experiment.training.train_raw_data
      ? state.experiment.training.train_raw_data
      : null
    : null;
  return {
    instanceValue: state.experiment.instance_variable,
    targetValue: state.experiment.target_variable,
    selectedXAxis: state.misc.selectedXAxis,
    selectedInstance: state.misc.selectedInstance,
    instanceList: state.csvData.instanceList,
    rawFileURL: trainingRawFileURL,
    numericColumns: state.csvData.trainNumericColumns,
    rawColumns: state.csvData.trainRawColumns,
  };
};

export default connect(mapStateToProps, {})(ScatterPlot);
