// @flow
import React, { Component } from "react";
import { TOPSOIL_ENDPOINT } from "constants";
import axios from "axios";
import Tabulator from "tabulator-tables";
import "../../styles/topsoil.scss";

const labelColumn = {
  title: "Label",
  field: "title",
  width: 150
};

const selectedColumn = {
  title: "Selected",
  field: "selected",
  editor: true,
  formatter: "tickCross"
};

const numberEditor = function (cell, onRendered, success, cancel, editorParams) {
  let editor = document.createElement("input");

  editor.setAttribute("type", "string");

  //create and style input
  editor.style.padding = "3px";
  editor.style.width = "100%";
  editor.style.boxSizing = "border-box";

  editor.value = cell.getValue();

  //set focus on the select box when the editor is selected (timeout allows for editor to be added to DOM)
  onRendered(() => {
    editor.focus();
    editor.style.css = "100%";
  });

  const confirmFunc = () => {
    const value = editor.value;
    if (isNaN(value)) {
      cancel();
    } else {
      success(+value);
    }
  }

  // editor.addEventListener("change", successFunc);
  editor.addEventListener("blur", confirmFunc);

  return editor;
};

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
      layout: "fitDataFill",
      reactiveData: true,
      dataTree: true,
      data: this.state.rows,
      columns: this.state.columns
    });
    
  }
  
  componentDidUpdate() {
    this.tabulator.setColumns(this.state.columns);
    this.tabulator.setData(this.state.rows)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
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
                columns = response.data.columns;
          this.addEditorToLeafColumns(columns);
          columns.unshift(labelColumn, selectedColumn);
          this.setState({ rows, columns });
        })
        .catch(error => {
          console.error(error);
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

  addEditorToLeafColumns(columns) {
    columns.forEach(col => {
      if (col.columns) {
        this.addEditorToLeafColumns(col.columns);
        return;
      }
      col.editor = numberEditor;
    });
  }

}

export default TopsoilPage;
