import React, { Component } from "react";
import { TOPSOIL_ENDPOINT } from "../../constants";
import axios from "axios";
import "tabulator-tables";
import Modal from "react-modal";
import Split from "react-split";
import {
  UploadForm,
  DataTable,
  VariableChooser,
  TopsoilPlot,
  TopsoilPlotPanel
} from "./components";
import { Option } from "topsoil-js";
import { DefaultOptions } from "./constants/defaults";
import { SampleRows, SampleColumns } from "./constants/sample-data";
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
    options: DefaultOptions
  },
  split: {
    horizontal: [50, 50],
    vertical: [65, 35]
  },
  varChooserIsOpen: false,
  uploadFormIsOpen: false
};
type State = Readonly<typeof initialState>;

class TopsoilPage extends Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = initialState;

    this._plotRef = React.createRef();

    this.handleLoadSampleData = this.handleLoadSampleData.bind(this);

    this.handleOpenVarChooser = this.handleOpenVarChooser.bind(this);
    this.handleSubmitVarChooser = this.handleSubmitVarChooser.bind(this);
    this.handleCloseVarChooser = this.handleCloseVarChooser.bind(this);

    this.handleOpenUploadForm = this.handleOpenUploadForm.bind(this);
    this.handleSubmitUploadForm = this.handleSubmitUploadForm.bind(this);
    this.handleCloseUploadForm = this.handleCloseUploadForm.bind(this);

    this.handleChangeTableFile = this.handleChangeTableFile.bind(this);
    this.handleChangeTemplate = this.handleChangeTemplate.bind(this);

    this.handleHorizontalSplitSizeChange = this.handleHorizontalSplitSizeChange.bind(
      this
    );
    this.handleVerticalSplitSizeChange = this.handleVerticalSplitSizeChange.bind(
      this
    );

    this.handlePlotZoomed = this.handlePlotZoomed.bind(this);
    this.handleSetExtents = this.handleSetExtents.bind(this);
    this.handleFitToConcordia = this.handleFitToConcordia.bind(this);
    this.handlePlotOptionChange = this.handlePlotOptionChange.bind(this);
  }

  componentDidMount() {
    const savedState = JSON.parse(localStorage.getItem("topsoil_state"));
    if (savedState) this.setState(savedState);
  }

  componentDidUpdate() {
    localStorage.setItem("topsoil_state", JSON.stringify(this.state));
  }

  handleLoadSampleData() {
    const table = { ...this.state.table.data };
    table.rows = SampleRows;
    table.columns = SampleColumns;
    this.setState({ table });
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

  handlePlotZoomed(xDomain, yDomain) {
    const plot = {...this.state.plot};
    plot.options[Option.X_MIN] = xDomain[0];
    plot.options[Option.X_MAX] = xDomain[1];
    plot.options[Option.Y_MIN] = yDomain[0];
    plot.options[Option.Y_MAX] = yDomain[1];
    this.setState({ plot });
  }

  handleSetExtents(xMin, xMax, yMin, yMax) {
    const {
      current: { instance }
    } = this._plotRef;
    if (instance) instance.changeAxisExtents(xMin, xMax, yMin, yMax, true);
  }

  handleFitToConcordia() {
    const {
      current: { instance }
    } = this._plotRef;
    if (instance) instance.snapToConcordia();
  }

  handleRefreshPlot() {
    if (!this._plotRef.current) return;

    const {
      current: {
        instance
      }
    } = this._plotRef;
    if (instance) instance.update();
  }

  handlePlotOptionChange(option, newValue) {
    const plot = { ...this.state.plot };
    plot.options[option] = newValue;
    this.setState({ plot });
  }

  handleHorizontalSplitSizeChange(sizes) {
    const split = { ...this.state.split };
    split.horizontal = sizes;
    this.setState({ split });
  }

  handleVerticalSplitSizeChange(sizes) {
    const split = { ...this.state.split };
    split.vertical = sizes;
    this.setState({ split });
  }

  render() {
    const {
      template,
      selectedTableFile,
      table: { rows: tableRows, columns: tableColumns },
      plot
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
            columns={tableColumns}
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
          <button className="toolbar-item" onClick={this.handleLoadSampleData}>
            Load Sample Data
          </button>
          <button className="toolbar-item" onClick={this.handleOpenUploadForm}>
            Upload Data
          </button>
          <button
            className="toolbar-item"
            onClick={this.handleOpenVarChooser}
            disabled={tableRows.length === 0}
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
            style={{ position: "relative" }}
          >
            <div className="float-left">
              <DataTable
                id="data-table"
                rows={tableRows || []}
                columns={tableColumns || []}
                onDataChanged={rows => {
                  const { table } = this.state;
                  table.rows = rows;
                  this.setState({ table }, this.updatePlotState.bind(this));
                }}
              />
            </div>

            <div id="right-split-container">
              <Split
                sizes={this.state.split.vertical}
                direction="vertical"
                onDrag={sizes => {
                  this.handleRefreshPlot();
                }}
                onDragEnd={this.handleVerticalSplitSizeChange}
              >
                <TopsoilPlot 
                  ref={this._plotRef} 
                  plot={plot}
                  onZoomEnd={this.handlePlotZoomed}
                />
                <TopsoilPlotPanel
                  plot={plot}
                  onOptionChanged={this.handlePlotOptionChange}
                  onSetExtents={this.handleSetExtents}
                  fitToWetherillConcordia={this.handleFitToConcordia}
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
