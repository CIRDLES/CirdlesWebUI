import React, { Component } from "react";
import { TOPSOIL_ENDPOINT, TOPSOIL } from "../../constants";
import axios from "axios";
import "tabulator-tables";
import Modal from "react-modal";
import Split from "react-split";
import {
  UploadForm,
  DataTable,
  VariableChooser,
  TopsoilPlot
} from "./components";
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

const initialState = {
  selectedTableFile: null,
  template: "DEFAULT",
  table: {
    rows: [],
    columns: [],
    variables: {}
  },
  plot: {
    data: [],
    options: {
      title: "Hello World",
      uncertainty: 2.0,
      x_axis: "X Axis",
      y_axis: "Y Axis",
      points: true,
      points_fill: "steelblue",
      points_opacity: 1,
      ellipses: true,
      ellipses_fill: "red",
      ellipses_opacity: 1,
      concordia_type: "wetherill",
      concordia_line: true,
      concordia_line_fill: "blue",
      concordia_envelope: true,
      concordia_envelope_fill: "lightgray",
      lambda_235: 9.8485e-10,
      lambda_238: 1.55125e-10,
      R238_235S: 137.88
    }
  },
  split : {
    horizontal: [50, 50],
    vertical: [35, 65]
  },
  varChooserIsOpen: false,
  uploadFormIsOpen: false
}
type State = Readonly<typeof initialState>;

class TopsoilPage extends Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = initialState;

    this._plotRef = React.createRef();

    this.handleOpenVarChooser = this.handleOpenVarChooser.bind(this);
    this.handleSubmitVarChooser = this.handleSubmitVarChooser.bind(this);
    this.handleCloseVarChooser = this.handleCloseVarChooser.bind(this);

    this.handleOpenUploadForm = this.handleOpenUploadForm.bind(this);
    this.handleSubmitUploadForm = this.handleSubmitUploadForm.bind(this);
    this.handleCloseUploadForm = this.handleCloseUploadForm.bind(this);

    this.handleChangeTableFile = this.handleChangeTableFile.bind(this);
    this.handleChangeTemplate = this.handleChangeTemplate.bind(this);

    this.handleHorizontalSplitSizeChange = this.handleHorizontalSplitSizeChange.bind(this);
    this.handleVerticalSplitSizeChange = this.handleVerticalSplitSizeChange.bind(this);
  }

  componentDidMount() {
    const savedState = JSON.parse(localStorage.getItem("topsoil_state"));
    if (savedState) this.setState(savedState);
  }

  componentDidUpdate() {
    localStorage.setItem("topsoil_state", JSON.stringify(this.state));
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

    this.setState({ table }, this.updatePlotState);
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
            columns = response.data.columns,
            variables = this.state.table.variables;
          this.setState({
            table: { rows, columns, variables }
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

  handleRefreshPlot() {
    if (! this._plotRef.current) return;

    const {
      current: {
        state: {
          plot
        }
      }
    } = this._plotRef;
    if (plot) plot.update();
  }

  handleHorizontalSplitSizeChange(sizes) {
    const split = {...this.state.split};
    console.log("H sizes", sizes);
    split.horizontal = sizes;
    this.setState({ split });
  }

  handleVerticalSplitSizeChange(sizes) {
    const split = {...this.state.split};
    console.log("V sizes", sizes);
    split.vertical = sizes;
    this.setState({ split });
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
            Generate Plot
          </button>

          <div id="toolbar-tail" className="toolbar-item">
            <div id="logo" className="toolbar-item" />
            <a
              href="http://cirdles.org/projects/topsoil/"
              className="toolbar-item"
            >
              CIRDLES.org
            </a>
            <a
              href="https://github.com/CIRDLES/Topsoil"
              className="toolbar-item"
            >
              GitHub
            </a>
          </div>
        </div>

        <div id="main-container">
          <Split 
            sizes={this.state.split.horizontal} 
            direction="horizontal"
            onDrag={sizes => {
              this.handleRefreshPlot();
            }}
            onDragEnd={this.handleHorizontalSplitSizeChange}
          >
            <div className="float-left full-size">
              <DataTable
                id="data-table"
                rows={rows || []}
                columns={columns || []}
                onDataChanged={rows => {
                  const { table } = this.state;
                  table.rows = rows;
                  this.setState.bind(this)({table}, this.updatePlotState.bind(this));
                }}
              />
            </div>

            <div className="inline-block">
              <Split 
                sizes={this.state.split.vertical} 
                direction="vertical"
                onDrag={sizes => {
                  this.handleRefreshPlot();
                }}
                onDragEnd={this.handleVerticalSplitSizeChange}
              >
                <div id="plot-panel" />
                <TopsoilPlot
                  ref={this._plotRef}
                  data={this.state.plot.data}
                  options={this.state.plot.options}
                />
              </Split>
            </div>
          </Split>
        </div>
      </div>
    );
  }

  updatePlotState() {
    if (Object.entries(this.state.table.variables).length === 0) return;
    const plot = { ...this.state.plot };
    plot.data = this.calculatePlotData();
    this.setState({ plot });
  }

  calculatePlotData() {
    const { table } = this.state;
    return table.rows.map(row => {
      const entry = {};
      let colName;
      for (let key in table.variables) {
        colName = table.variables[key];
        entry[key] = row[colName];
      }
      if ("title" in row) {
        entry["title"] = row["title"];
      }
      if ("selected" in row) {
        entry["selected"] = row["selected"];
      }
      return entry;
    });
  }
}

export default TopsoilPage;
