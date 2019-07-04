import React, { Component } from "react";
import { TOPSOIL_ENDPOINT } from "constants";
import axios from "axios";
import ReactTabulator from "react-tabulator";
import "../../styles/topsoil.scss";

class TopsoilPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTableFile: null,
      template: "DEFAULT",
      rows: null,
      columns: null
    };

    this.handleChangeTableFile = this.handleChangeTableFile.bind(this);
    this.handleChangeTemplate = this.handleChangeTemplate.bind(this);
  }

  componentDidMount() {

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
      data.append("tableFile", selectedTableFile);
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
          const rows = response.data.data,
                columns = response.data.columns.map(col => {
                  col.editor = "input";
                  return col;
                });
          this.setState({ rows, columns });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    const { template, rows, columns } = this.state;
    return (
      <div id="page-container">
        <div id="upload-container">
          Select a table file (.csv, .tsv): <input type="file" name="tableFile" onChange={this.handleChangeTableFile}></input>
          <br />
          Data Template:
          <select name="template" value={template} onChange={this.handleChangeTemplate}>
            <option value="DEFAULT">Default</option>
            <option value="SQUID_3">Squid 3</option>
          </select>
          <br />
          <button onClick={this.handleFileSubmission.bind(this)}>Submit</button>
        </div>
        <div id="table-container">
          <ReactTabulator
            ref={ref => this.tabulator = ref}
            columns={columns}
            data={rows}
            cellEdited={cell => console.log("cellEdited", cell)}
            dataEdited={newData => console.log("dataEdited", newData)}
          />
        </div>
        <div id="plot-container" />
      </div>
    );
  }
}

export default TopsoilPage;
