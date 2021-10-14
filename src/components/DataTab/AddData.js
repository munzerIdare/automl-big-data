import React, { useState, useEffect } from "react";
import { setRawFile, updateRawFile } from "../../redux/experiment/actions";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import { handleTrainCSVColumns } from "../../redux/csv-data/actions";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const useStyles = makeStyles({
  paper: { minWidth: "380px" },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h5">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const AddData = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { expId } = useParams();
  const id = expId;

  const [expand, setExpand] = useState(true);
  const [disableAdd, setDisableAdd] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setRawFile] = useState("");
  const [originalFileName, setOriginalFileName] = useState("");
  const [openFileUpload, setOpenFileUpload] = React.useState(false);

  const [fileSource, setFileSource] = useState("csv");
  const [externalLink, setExternalLink] = useState("");

  const handleModalOpen = () => {
    setOpenFileUpload(true);
  };
  const handleModalClose = () => {
    setOpenFileUpload(false);
  };

  useEffect(() => {
    if (
      props.trainingRawFileURL !== undefined &&
      props.trainingRawFileURL !== null &&
      props.trainingRawFileURL !== ""
    ) {
      setExpand(true);
      setDisableAdd(true);
    }
  }, [props.trainingRawFileURL]);

  useEffect(() => {
    if (props.experiment && props.experiment.training) {
      if (props.experiment.training.train_filename) {
        setFileName(props.experiment.training.train_filename);
      }
      if (props.experiment.training.train_raw_data) {
        setOriginalFileName(
          props.experiment.training.train_raw_data.split("/").pop()
        );
      }
    }
  }, [props.experiment]);

  return (
    <div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="data_add-data-tab">
          <button
            className={
              expand ? "accordion-button" : "accordion-button collapsed"
            }
            type="button"
            onClick={() => {
              setExpand(!expand);
            }}
          >
            Add Data
          </button>
        </h2>
        {expand && (
          <div id="data_add-data">
            <div className="accordion-body pt-0 pb-0">
              <div className="input-group flex-nowrap justify-content-between">
                <input
                  defaultValue={fileName}
                  type="text"
                  className="data-input-name"
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Enter Data Name"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />{" "}
                <button
                  type="button"
                  className="btn btn-common_responsive rounded-0 mx-2"
                  onClick={handleModalOpen}
                >
                  Source
                </button>
                <div className="data-input-filename" id="file-upload-filename">
                  {originalFileName}
                </div>
                <Dialog
                  classes={{ paper: classes.paper }}
                  maxWidth="md"
                  onClose={handleModalClose}
                  aria-labelledby="customized-dialog-title"
                  open={openFileUpload}
                >
                  <DialogTitle
                    id="customized-dialog-title"
                    onClose={handleModalClose}
                  >
                    Add data by{" "}
                  </DialogTitle>
                  <DialogContent dividers>
                    <div className="modal-body d-flex align-items-center justify-content-around">
                      <div className="d-flex flex-column">
                        <div className="p-2">
                          <div className="form-check mt-1">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="file_type"
                              id="csv_file"
                              checked={fileSource === "csv"}
                              onChange={() => setFileSource("csv")}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="csv_file"
                            >
                              .csv file
                            </label>
                          </div>
                          <div>
                            <input
                              className="d-none"
                              type="file"
                              id="file-upload"
                              multiple={false}
                              required
                              onChange={(e) => {
                                setOriginalFileName(e.target.files[0].name);
                                setRawFile(e.target.files[0]);
                                handleModalClose();
                                setDisableAdd(false);
                              }}
                            />
                            <label
                              className="btn color-common btn-common rounded-0"
                              htmlFor="file-upload"
                            >
                              Upload CSV File
                            </label>
                          </div>
                        </div>
                        <div className="p-2">
                          <div className="form-check mt-1">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="link"
                              id="csv_file"
                              checked={fileSource === "link"}
                              onChange={() => setFileSource("link")}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="csv_file"
                            >
                              External Link
                            </label>
                          </div>
                          <div>
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) => {
                                setExternalLink(e.target.value);
                                console.log("E value", e.target.value);
                                setOriginalFileName(e.target.value);
                              }}
                            />
                            <label
                              onClick={() => handleModalClose()}
                              className="btn color-common btn-common rounded-0 mt-2"
                            >
                              Set Link
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <span style={{}}> *Required</span>
              <div className="text-end">
                <button
                  // disabled={
                  //   file === "" ||
                  //   externalLink === "" ||
                  //   fileName === "" ||
                  //   disableAdd
                  // }
                  onClick={() => {
                    if (
                      fileName !== "" &&
                      fileSource === "link" &&
                      externalLink !== ""
                    ) {
                      dispatch({
                        type: "SET_RAW_DATA_URL",
                        payload: externalLink,
                      });

                      dispatch(handleTrainCSVColumns(externalLink));
                      setOriginalFileName(externalLink.split("/").pop());
                    } else if (
                      file !== "" &&
                      fileName !== "" &&
                      fileSource === "csv"
                    ) {
                      props.setRawFile(file, fileName, id);
                    } else {
                      alert("Please upload a file or set external link");
                    }
                  }}
                  className="btn btn-action rounded-0 mt-2 mb-2"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const trainingRawFileURL = state.experiment.training
    ? state.experiment.training.train_raw_data
      ? state.experiment.training.train_raw_data
      : null
    : null;
  return {
    trainingRawFileURL: trainingRawFileURL,
    experiment: state.experiment,
  };
};

export default connect(mapStateToProps, { setRawFile, updateRawFile })(
  withRouter(AddData)
);
