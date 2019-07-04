import React, { Component } from "react";
import { TOPSOIL_ENDPOINT } from "constants";
import axios from "axios";
import "../../styles/topsoil.scss";

class TopsoilPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTableFile: null,
      dataTable: null
    };
  }

  handleChangeTableFile(event) {
    this.setState({
      selectedTableFile: event.target.files[0]
    });
  }

  handleFileSubmission() {
    const data = new FormData();
    if (this.state.selectedTableFile !== null) {
      data.append("tableFile", this.state.selectedTableFile);

      axios
        .post(
          TOPSOIL_ENDPOINT,
          data,
          {
            responseType: "application/json"
          }
        )
        .then(response => {
          console.log(response);
          this.setState({ dataTable: JSON.parse(response) });
          console.log(this.state.dataTable);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div id="page-container">
        <div id="upload-container">
          Select a table file (.csv, .tsv): <input type="file" name="tableFile" onChange={this.handleChangeTableFile.bind(this)}></input>
          <br />
          <button onClick={this.handleFileSubmission.bind(this)}>Submit</button>
        </div>
        <div id="table-container" />
        <div id="plot-container" />
      </div>
    );
  }
}

export default TopsoilPage;
