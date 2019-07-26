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
import { Variable, Option } from "topsoil-js";
import { DefaultOptions } from "./constants/defaults";
import { SampleRows, SampleColumns } from "./constants/sample-data";
import "../../styles/topsoil/topsoil.scss";

Modal.setAppElement("#root");

const styles = {
  modal: {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      maxWidth: "80%",
      maxHeight: "80%",
      transform: "translate(-50%, -50%)"
    }
  },
  loadContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    fontSize: "3em",
    backgroundColor: "#cccccccc",
    backgroundOpacity: 0.5
  },
  loadIndicator: {
    backgroundColor: "#ccc",
    padding: "0.5em 0.75em"
  }
};

const initialState = {
  selectedTableFile: null,
  template: "DEFAULT",
  table: {
    rows: [],
    columns: [],
    variables: {},
    unctFormat: "abs"
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
  uploadFormIsOpen: false,
  isLoading: false
};
type State = Readonly<typeof initialState>;

class TopsoilPage extends Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.plotComponent = React.createRef();
    this.dataTable = React.createRef();

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

    this.handleUpdatePlotState = this.handleUpdatePlotState.bind(this);
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
    const table = { ...this.state.table };
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

  handleSubmitVarChooser(variables, unctFormat) {
    const table = { ...this.state.table };
    table.variables = variables;
    table.unctFormat = unctFormat;

    this.setState({ table }, this.handleUpdatePlotState);
    this.handleCloseVarChooser();
  }

  handleCloseVarChooser() {
    this.setState({ varChooserIsOpen: false });
  }

  handleOpenUploadForm() {
    this.setState({ uploadFormIsOpen: true });
  }

  handleSubmitUploadForm() {
    this.setState({ loading: true });

    const data = new FormData(),
      { selectedTableFile, template } = this.state;
    if (selectedTableFile !== null && template !== null) {
      data.append("tableFile", selectedTableFile);
      data.append("template", template);

      const table = {...this.state.table};

      axios
        .post(TOPSOIL_ENDPOINT, data)
        .then(response => {
          table.rows = response.data.data;
          table.columns = response.data.columns;
          this.setState({ table }, this.setState({ loading: false }));
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
    const plot = { ...this.state.plot };
    plot.options[Option.X_MIN] = xDomain[0];
    plot.options[Option.X_MAX] = xDomain[1];
    plot.options[Option.Y_MIN] = yDomain[0];
    plot.options[Option.Y_MAX] = yDomain[1];
    this.setState({ plot });
  }

  handleSetExtents(xMin, xMax, yMin, yMax) {
    const {
      current: { instance }
    } = this.plotComponent;
    if (instance) instance.changeAxisExtents(xMin, xMax, yMin, yMax, true);
  }

  handleFitToConcordia() {
    const {
      current: { instance }
    } = this.plotComponent;
    if (instance) instance.snapToConcordia();
  }

  handleRefreshPlot() {
    if (!this.plotComponent.current) return;

    const {
      current: { instance }
    } = this.plotComponent;
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

  handleUpdatePlotState() {
    const { rows, variables, unctFormat } = this.state.table;
    if (Object.entries(variables).length === 0) return;
    const plot = { ...this.state.plot };
    plot.data = calculatePlotData(
      rows,
      variables,
      unctFormat,
      plot.options.uncertainty
    );
    plot.options[Option.X_AXIS] = variables[Variable.X];
    plot.options[Option.Y_AXIS] = variables[Variable.Y];
    this.setState({ plot });
  }

  render() {
    const { template, selectedTableFile, table, plot } = this.state;

    let loader;
    if (this.state.loading) {
      loader = <div style={styles.loadContainer}><span style={styles.loadIndicator}>Loading...</span></div>;
    }

    return (
      <div id="page-container">
        <Modal
          isOpen={this.state.varChooserIsOpen}
          onRequestClose={this.handleCloseVarChooser}
          style={styles.modal}
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
            columns={table.columns}
            onSubmit={this.handleSubmitVarChooser}
            variables={this.state.table.variables}
            requiredVars={[Variable.X, Variable.Y]}
            unctFormat={this.state.table.unctFormat}
          />
        </Modal>

        <Modal
          isOpen={this.state.uploadFormIsOpen}
          onRequestClose={this.handleCloseUploadForm}
          style={styles.modal}
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
            disabled={table.rows.length === 0}
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
                ref={this.dataTable}
                rows={table.rows || []}
                columns={table.columns || []}
                onCellEdited={this.handleUpdatePlotState}
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
                  ref={this.plotComponent}
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
        {loader}
      </div>
    );
  }
}

export default TopsoilPage;

function calculatePlotData(rows, variables, unctFormat, multiplier, rtnval) {
  rtnval = rtnval || [];
  rows.forEach(row => {
    if (row._children) {
      rtnval.concat(calculatePlotData(row._children, variables, rtnval));
    } else {
      const entry = {};
      let colName;
      for (let v in variables) {
        colName = variables[v];
        entry[v] = row[colName];
      }
      if (Variable.TITLE in row) {
        entry[Variable.TITLE] = row[Variable.TITLE];
      }
      if (Variable.SELECTED in row) {
        entry[Variable.SELECTED] = row[Variable.SELECTED];
      }
      if (unctFormat === "%") {
        if (Variable.SIGMA_X in entry) {
          entry[Variable.SIGMA_X] =
            entry[Variable.X] * (entry[Variable.SIGMA_X] / 100);
        }
        if (Variable.SIGMA_Y in entry) {
          entry[Variable.SIGMA_Y] =
            entry[Variable.Y] * (entry[Variable.SIGMA_Y] / 100);
        }
      }
      rtnval.push(entry);
    }
  });
  return rtnval;
}
