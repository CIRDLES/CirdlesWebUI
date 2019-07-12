import React, { Component } from "react";
import { TOPSOIL_ENDPOINT, TOPSOIL } from "../../constants";
import axios from "axios";
import "tabulator-tables";
import Modal from "react-modal";
import Split from "react-split";
import {
  UploadForm,
  DataTable,
  VariableChooser
} from "./components";
// import * as Topsoil from "topsoil-js/dist/topsoil";
import "../../styles/topsoil/topsoil.scss";

Modal.setAppElement("#root");

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class TopsoilPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTableFile: null,
      template: "DEFAULT",
      table: {
        rows: [],
        columns: [],
        variables: {}
      },
      plot: {
        data: null,
        options: null
      },
      varChooserIsOpen: false,
      uploadFormIsOpen: false
    };

    this.plot = null;

    this.handleOpenVarChooser = this.handleOpenVarChooser.bind(this);
    this.handleSubmitVarChooser = this.handleSubmitVarChooser.bind(this);
    this.handleCloseVarChooser = this.handleCloseVarChooser.bind(this);

    this.handleOpenUploadForm = this.handleOpenUploadForm.bind(this);
    this.handleSubmitUploadForm = this.handleSubmitUploadForm.bind(this);
    this.handleCloseUploadForm = this.handleCloseUploadForm.bind(this);

    this.handleChangeTableFile = this.handleChangeTableFile.bind(this);
    this.handleChangeTemplate = this.handleChangeTemplate.bind(this);

    this.handleGeneratePlot = this.handleGeneratePlot.bind(this);
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

  handleOpenVarChooser() {
    this.setState({ varChooserIsOpen: true });
  }

  handleSubmitVarChooser(event) {
    event.preventDefault();
    const e = event.nativeEvent,
      variables = {};

    let i = 0,
      target = e.target[i];
    while (target !== undefined && target.type === "select-one") {
      if (target.value !== "") variables[target.value] = target.name;
      target = e.target[++i];
    }

    const table = { ...this.state.table };
    table.variables = variables;

    const plot = { ...this.state.plot };
    plot.data = table.rows.map(row => {
      const entry = {};
      let colName;
      for (let key in table.variables) {
        colName = table.variables[key];
        entry[key] = row[colName];
      }
      return entry;
    });

    this.setState({ table, plot });
    this.handleCloseVarChooser();
  }

  handleCloseVarChooser() {
    this.setState({ varChooserIsOpen: false });
  }

  handleOpenUploadForm() {
    this.setState({ uploadFormIsOpen: true });
  }

  handleSubmitUploadForm() {
    const data = new FormData(),
      { selectedTableFile, template } = this.state;
    if (selectedTableFile !== null && template !== null) {
      data.append("tableFile", selectedTableFile);
      data.append("template", template);

      axios
        .post(TOPSOIL_ENDPOINT, data)
        .then(response => {
          const rows = response.data.data,
            columns = response.data.columns;
          this.setState({
            table: { rows, columns }
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
    this.handleCloseUploadForm();
  }

  handleCloseUploadForm() {
    this.setState({ uploadFormIsOpen: false });
  }

  handleGeneratePlot() {
    // this.plot = new Topsoil.ScatterPlot("#plot", this.state.plot.data, {
    //   title: "Hello World",
    //   uncertainty: 2.0,
    //   x_axis: this.state.table.variables.x,
    //   y_axis: this.state.table.variables.y,
    //   points: true,
    //   points_fill: "steelblue",
    //   points_opacity: 1,
    //   ellipses: true,
    //   ellipses_fill: "red",
    //   ellipses_opacity: 1,
    //   concordia_type: "wetherill",
    //   concordia_line: true,
    //   concordia_line_fill: "blue",
    //   concordia_envelope: true,
    //   concordia_envelope_fill: "lightgray",
    //   lambda_235: 9.8485e-10,
    //   lambda_238: 1.55125e-10,
    //   R238_235S: 137.88
    // });
  }

  render() {
    const {
      template,
      selectedTableFile,
      table: { rows, columns, variables }
    } = this.state;
    return (
      <div id="page-container">
        <Modal
          isOpen={this.state.varChooserIsOpen}
          onRequestClose={this.handleCloseVarChooser}
          style={modalStyles}
          contentLabel="Variable Chooser"
          aria={{
            labelledby: "var-chooser-heading",
            describedby: "var-chooser-desc"
          }}
        >
          <h2 id="var-chooser-heading">Variable Chooser</h2>
          <p id="var-chooser-desc">
            {" "}
            Use this form to select which data columns correspond to specific
            plotting variables.
          </p>
          <VariableChooser
            columns={columns}
            onSubmit={this.handleSubmitVarChooser}
          />
        </Modal>

        <Modal
          isOpen={this.state.uploadFormIsOpen}
          onRequestClose={this.handleCloseUploadForm}
          style={modalStyles}
          contentLabel="Data Uploader"
          aria={{
            labelledby: "upload-form-heading",
            describedby: "upload-form-desc"
          }}
        >
          <h2 id="upload-form-heading">Data Uploader</h2>
          <p>Use this form to select a data file to upload.</p>
          <UploadForm
            tableFile={selectedTableFile}
            template={template}
            onSubmit={this.handleSubmitUploadForm}
            onChangeTableFile={this.handleChangeTableFile}
            onChangeTemplate={this.handleChangeTemplate}
          />
        </Modal>

        <div id="#toolbar">
          <button className="toolbar-item" onClick={this.handleOpenUploadForm}>
            Upload Data
          </button>
          <button
            className="toolbar-item"
            onClick={this.handleOpenVarChooser}
            disabled={rows.length === 0}
          >
            Choose Variables
          </button>
          <button
            className="toolbar-item"
            onClick={this.handleGeneratePlot}
            disabled={!variables || Object.entries(variables).length === 0}
          >
            Generate Plot
          </button>
        </div>

        <div style={{ flexGrow: 1, overflow: "auto" }}>
          <Split
            sizes={[50, 50]}
            direction="vertical"
            // gutterStyle={(dimension, gutterSize, index) => {
            //   return {
            //     width: gutterSize,
            //     backgroundColor: "gray",
            //     cursor: "grabbing"
            //   }
            // }}
          >
            <div id="table-container">
              <DataTable
                id="data-table"
                rows={rows || []}
                columns={columns || []}
              />
            </div>
            <div id="plot-container">
              <div id="plot" />
            </div>
          </Split>
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
