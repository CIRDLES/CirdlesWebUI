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
    this.handlePreferredIndexIsotopeChange = this.handlePreferredIndexIsotopeChange.bind(this);

    this.state = {
      selectedPrawnFile: null,
      selectedTaskFile: null,
      refMatFilter: "",
      concRefMatFilter: "",
      normalizeSBM: "true",
      ratioCalculationMethod: "false",
      preferredIndexIsotope: "PB_204",
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


  handleRefMatFilterChange(event) {
    this.setState({ refMatFilter: event.target.value })
  }

  handleConcRefMatFilterChange(event) {
    this.setState({ concRefMatFilter: event.target.value })
  }

  handleNormalizeSBMChange(changeEvent) {
    this.setState({
      normalizeSBM: changeEvent.target.value
    });
  };

  handleRatioCalculationMethodChange(changeEvent) {
    this.setState({
      ratioCalculationMethod: changeEvent.target.value
    });
  };

  handlePreferredIndexIsotopeChange(changeEvent) {
    this.setState({
      preferredIndexIsotope: changeEvent.target.value
    });
  };

  handleUpload() {
    const data = new FormData();
    if ((this.state.selectedPrawnFile != null) && (this.state.selectedTaskFile != null)) {
      data.append("prawnFile", this.state.selectedPrawnFile);
      data.append("taskFile", this.state.selectedTaskFile);
      data.append("useSBM", this.state.normalizeSBM);
      data.append("userLinFits", this.state.ratioCalculationMethod);
      data.append("refMatFilter", this.state.refMatFilter);
      data.append("concRefMatFilter", this.state.concRefMatFilter);
      data.append("prefIndexIso", this.state.preferredIndexIsotope);

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
  }


  render() {
    return (
      <div>
        <div>
          Choose zipped Prawn xml file:
          <span> </span>
          <input type="file" name="" id="" onChange={this.handleselectedPrawnFile} />
        </div>
        <div>
          Choose Squid2.* Task xls file:&nbsp;
          <span> </span>
          <input type="file" name="" id="" onChange={this.handleselectedTaskFile} />
        </div>

        <div>
          <br></br>
          Enter Reference Material Sample Name Filter:
          <span> </span>
          <input type="text" name="title" value={this.state.refMatFilter}
            onChange={this.handleRefMatFilterChange.bind(this)} />
        </div>
        <div>
          <br></br>
          Enter Concentration Reference Material Sample Name Filter:
          <span> </span>
          <input type="text" name="title" value={this.state.title}
            onChange={this.handleConcRefMatFilterChange.bind(this)} />
        </div>
        <div>
          <br></br>
          <label>Normalise Ion Counts for SBM? </label>
          <label>
            <input
              type="radio"
              value="true"
              checked={this.state.normalizeSBM === "true"}
              onChange={this.handleNormalizeSBMChange}
            />
            Yes
          </label>
          <span> </span>
          <label>
            <input
              type="radio"
              value="false"
              checked={this.state.normalizeSBM === "false"}
              onChange={this.handleNormalizeSBMChange}
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
              value="true"
              checked={this.state.ratioCalculationMethod === "true"}
              onChange={this.handleRatioCalculationMethodChange}
            />
            Linear regression to burn mid-time
          </label>
          <span> </span>
          <label>
            <input
              type="radio"
              value="false"
              checked={this.state.ratioCalculationMethod === "false"}
              onChange={this.handleRatioCalculationMethodChange}
            />
            Spot average (time-invariant)
          </label>
        </div>
        <div>
          <br></br>
          <label>Preferred Index Isotope: </label>
          <label>
            <input
              type="radio"
              value="PB_204"
              checked={this.state.preferredIndexIsotope === "PB_204"}
              onChange={this.handlePreferredIndexIsotopeChange}
            />
            204Pb
          </label>
          <span> </span>
          <label>
            <input
              type="radio"
              value="PB_207"
              checked={this.state.preferredIndexIsotope === "PB_207"}
              onChange={this.handlePreferredIndexIsotopeChange}
            />
            207Pb
          </label>
          <span> </span>
          <label>
            <input
              type="radio"
              value="PB_208"
              checked={this.state.preferredIndexIsotope === "PB_208"}
              onChange={this.handlePreferredIndexIsotopeChange}
            />
            208Pb
          </label>
        </div>
        <div>
          <br></br>
          Note: parameter models are currently GA defaults (see Squid app).
        </div>
        <div>
          <br></br>
          <button className="btn success" onClick={this.handleUpload}>
            Click here to Upload for processing ... wait for returned results</button>
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
