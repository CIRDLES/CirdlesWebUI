import React, { Component } from "react";
import { TOPSOIL_ENDPOINT } from "constants";
import axios from "axios";
import Tabulator from "tabulator-tables";
import "tabulator-tables"
import "../../styles/topsoil.scss";
import { timingSafeEqual } from "crypto";

// const Tabulator = require("tabulator-tables");

const testData = [
  { label: "row1", selected: true, x: 29.165688743, y: 0.712165893, sigma_x: 0.22165688743, sigma_y: 0.00452165893, rho: 0.918191745 },
  { label: "row2", selected: true, x: 29.031535970, y: 0.714916493, sigma_x: 0.26031535970, sigma_y: 0.004916493, rho: 0.714916493 }
];

const testColumns = [
  { title: "Label", field: "label", editor: "input" },
  { title: "Selected", field: "selected", editor: true, formatter: "tickCross" },
  { title: "X", field: "x", editor: "input" },
  { title: "σX", field: "sigma_x", editor: "input" },
  { title: "Y", field: "y", editor: "input" },
  { title: "σY", field: "sigma_y", editor: "input" },
  { title: "Corr Coef", field: "rho", editor: "input" }
]

class TopsoilPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTableFile: null,
      template: "DEFAULT",
      rows: [],
      columns: []
    };

    this.handleChangeTableFile = this.handleChangeTableFile.bind(this);
    this.handleChangeTemplate = this.handleChangeTemplate.bind(this);
  }

  componentDidMount() {
    this.tabulator = new Tabulator("#tabulator", {
      reactiveData: true,
      data: this.state.rows,
      columns: this.state.columns
    });
  }
  
  componentDidUpdate() {
    this.tabulator.setData(this.state.data);
    this.tabulator.setColumns(this.state.columns);
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
          data
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
    const { template } = this.state;
    return (
      <div id="page-container">
        <div id="upload-container">
          <div>
            Select a table file (.csv, .tsv): <input type="file" name="tableFile" onChange={this.handleChangeTableFile}></input>
          </div>
          <br />
          <div>
            Data Template:
            <select name="template" value={template} onChange={this.handleChangeTemplate}>
              <option value="DEFAULT">Default</option>
              <option value="SQUID_3">Squid 3</option>
            </select>
          </div>
          <br />
          <button onClick={this.handleFileSubmission.bind(this)}>Submit</button>
        </div>
        <div id="table-container">
          <div id="tabulator" />
        </div>
        <div id="plot-container">
          <div id="plot" />
        </div>
      </div>
    );
  }
}

export default TopsoilPage;
