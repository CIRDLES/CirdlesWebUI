import React, { Component } from "react";
import { TOPSOIL_ENDPOINT } from "constants";
import axios from "axios";
import "../../styles/topsoil.scss";

class TopsoilPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTableFile: null,
      template: "DEFAULT",
      dataTable: null
    };

    this.handleChangeTableFile = this.handleChangeTableFile.bind(this);
    this.handleChangeTemplate = this.handleChangeTemplate.bind(this);
  }

  handleChangeTableFile(event) {
    this.setState({
      selectedTableFile: event.target.files[0]
    });
  }

  handleChangeTemplate(event) {
    this.setState({
      template: event.target.value
    });
  }

  handleFileSubmission() {
    const data = new FormData(),
          { selectedTableFile, template } = this.state;
    if (selectedTableFile !== null && template !== null) {
      data.append("tableFile", tableFile);
      data.append("template", template);

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
          Select a table file (.csv, .tsv): <input type="file" name="tableFile" onChange={this.handleChangeTableFile}></input>
          <br />
          Data Template:
          <select name="template" value={this.state.template} onChange={this.handleChangeTemplate}>
            <option value="DEFAULT">Default</option>
            <option value="SQUID_3">Squid 3</option>
          </select>
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
