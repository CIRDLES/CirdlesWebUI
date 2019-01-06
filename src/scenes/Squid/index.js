// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createProject } from 'actions';
import { Button } from 'components';
import axios from "axios";

const endpoint = "http://cirdles.cs.cofc.edu/Services/squidReporting";
const FileDownload = require("downloadjs");

const ProgressBar = (props) => {
  return (
    <div className="progress-bar">
      <Filler loaded={props.loaded} />
    </div>
  )
}

const Filler = (props) => {
  return <div className="filler" style={{ width: `${props.loaded}%` }} />
}

class SquidPage extends Component {
  constructor(props) {
    super(props);
    this.handleselectedPrawnFile = this.handleselectedPrawnFile.bind(this);
    this.handleselectedTaskFile = this.handleselectedTaskFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleNormalizeSBMChange = this.handleNormalizeSBMChange.bind(this);
    this.handleRatioCalculationMethodChange = this.handleRatioCalculationMethodChange.bind(this);
    
    this.state = {
      selectedPrawnFile: null,
      selectedTaskFile: null,
      normalizeSBM: "yes",
      ratioCalculationMethod: "spot",
      loaded: 0
    };
  }

  handleselectedPrawnFile(event) {
    this.setState({
      selectedPrawnFile: event.target.files[0],
      loaded: 0
    });
  }

  handleselectedTaskFile(event) {
    this.setState({
      selectedTaskFile: event.target.files[0],
      loaded: 0
    });
  }

  handleUpload() {
    const data = new FormData();
    data.append("prawnFile", this.state.selectedPrawnFile);
    data.append("taskFile", this.state.selectedTaskFile);

    axios
      .post(
        endpoint,
        data,
        {
          responseType: "blob",
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
            });
          }
        },
      )
      .then(response => {
        FileDownload(response.data, "squid-reports.zip", "application/zip"),
          {
            onDownloadProgress: ProgressEvent => {
              this.setState({
                loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
              });
            }
          }
      });
  }

  handleNormalizeSBMChange(changeEvent) {
    this.setState({
      normalizeSBM:  changeEvent.target.value
    });
  };

  handleRatioCalculationMethodChange(changeEvent) {
    this.setState({
      ratioCalculationMethod:  changeEvent.target.value
    });
  };

  render() {
    return (
      <div>
        <div>
          Choose zipped Prawn xml file:
          <span> </span>
          <input type="file" name="" id="" onChange={this.handleselectedPrawnFile} />
        </div>
        <div>
          Choose Squid2.* Task xls file:
          <span> </span>
          <input type="file" name="" id="" onChange={this.handleselectedTaskFile} />
        </div>

        <div>
          <br></br>
          <label>Normalise Ion Counts for SBM? </label>
          <label>
            <input
              type="radio"
              value="yes"
              checked={this.state.normalizeSBM === "yes"}
              onChange={this.handleNormalizeSBMChange}
              className="form-check-input"
            />
            Yes
          </label>
          <span> </span>
          <label>
            <input
              type="radio"
              value="no"
              checked={this.state.normalizeSBM === "no"}
              onChange={this.handleNormalizeSBMChange}
              className="form-check-input"
            />
            No
          </label>
        </div>
        <div>
          <br></br>
          <label>Ratio Calculation Method: </label>
          <label>
            <input
              type="radio"
              value="linear"
              checked={this.state.ratioCalculationMethod === "linear"}
              onChange={this.handleRatioCalculationMethodChange}
              className="form-check-input"
            />
            Linear regression to burn mid-time
          </label>
          <span> </span>
          <label>
            <input
              type="radio"
              value="spot"
              checked={this.state.ratioCalculationMethod === "spot"}
              onChange={this.handleRatioCalculationMethodChange}
              className="form-check-input"
            />
            Spot average (time-invariant)
          </label>
        </div>
        <div>
          <button onClick={this.handleUpload}>Upload</button>
        </div>
        <h3> Upload progress:</h3>
        <ProgressBar loaded={this.state.loaded} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    createProject: bindActionCreators(createProject, dispatch)
  };
}

export default SquidPage;
