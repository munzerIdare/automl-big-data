import * as dfd from "danfojs/src/index";
import { without } from "lodash";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
const rows = (data) => {
  return data.map((row, i) => {
    return (
      <tr key={i}>
        {row.map((o, j) => {
          return <td key={j}>{o}</td>;
        })}
      </tr>
    );
  });
};

const RawDataTable = (props) => {
  const dispatch = useDispatch();
  const [columns, setColumns] = useState([]);
  const [rawData, setRawData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (props.rawDataURL !== null) {
      geRawData();
    }
    return () => {
      isMounted = false;
    };
  }, [props.rawDataURL]);
  async function geRawData() {
    try {
      dispatch({
        type: "SET_LOADER",
      });
      let df = await dfd.read_csv(props.rawDataURL, {
        start: 0,
        end: 10,
      });

      setColumns(df.columns);
      setRawData(df.data);
      dispatch({
        type: "REMOVE_LOADER",
      });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: "REMOVE_LOADER",
      });
    }
  }

  if (props.rawDataURL === null) {
    return <div> </div>;
  }

  return (
    <div style={{}} className="raw_data_wrapper">
      <div className="plot-select-container">
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
      <table className="ExcelTable2003">
        <thead>
          <tr>
            {columns &&
              columns.map((column, index) => <th key={index}>{column}</th>)}
          </tr>
        </thead>
        <tbody>{rawData && rows(rawData)}</tbody>
      </table>
    </div>
  );
};

export default connect(
  (state) => ({
    // trainingRawFileURL: state.data.trainingRawFileURL,
  }),
  {}
)(RawDataTable);
