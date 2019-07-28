// @flow
import React, { Component } from "react";
import { Variable } from "topsoil-js";
import { Select, Collapse } from "../../../components";

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 15em",
    width: "100%",
    height: "100%"
  },
  varList: {
    gridColumn: 1,
    padding: "0.5em",
    overflow: "auto"
  },
  varListItem: {
    margin: "0.5em"
  },
  selectionList: {
    gridColumn: 2,
    margin: 0,
    padding: "0.5em",
    listStyle: "none",
    border: "1px solid #ccc",
    overflow: "auto"
  },
  selectionListItem: {
    margin: "0.5em"
  },
  errorMessage: {
    color: "red",
    marginLeft: "1em"
  }
}

const numberVariables = [
  Variable.X,
  Variable.SIGMA_X,
  Variable.Y,
  Variable.SIGMA_Y,
  Variable.RHO
]

type Props = {
  columns: [],
  varMap: {},
  unctFormat: string,
  requiredVars: [],

  onSubmit: Function
};

type State = {
  selections: [],
  collapse: {},
  unctFormat: string,
  errorMessage: string
}

class VariableChooser extends Component<Props, State> {
  constructor(props) {
    super(props);

    const { variables, columns, unctFormat } = this.props,
          selections = {};
    for (let key in variables) {
      if (variables.hasOwnProperty(key)) {
        selections[variables[key]] = key;
      }
    }

    this.state = {
      selections,
      collapse: getInitialCollapseState(columns),
      unctFormat,
      errorMessage: ""
    };

    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleChangeUnctFormat = this.handleChangeUnctFormat.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelectionChange(colName, varName) {
    const selections = { ...this.state.selections };
    
    // If this variable is already selected for a different column, delete that selection
    for (let col in selections) {
      if (selections.hasOwnProperty(col) && selections[col] === varName) {
        delete selections[col];
      }
    }

    // If the new selection for this column is empty, remove it from selections
    if (varName === "") {
      delete selections[colName];
    } else {
      selections[colName] = varName;
    }

    this.setState({ selections });
  }

  handleChangeUnctFormat(event) {
    this.setState({ unctFormat: event.target.value });
  }

  handleSubmit() {
    const { selections, unctFormat } = this.state,
          variables = {};
    for (let colName in selections) {
      if (selections.hasOwnProperty(colName)) {
        variables[selections[colName]] = colName;
      }
    }

    const { requiredVars } = this.props;
    if (requiredVars) {
      for (let v of requiredVars) {
        if (!(v in variables)) {
          this.setState({ errorMessage: "Missing required variable: " + v })
          return;
        }
      }
    }

    this.props.onSubmit(variables, unctFormat);
  }

  handleToggleCollapse(colName) {
    const collapse = {...this.state.collapse};
    collapse[colName] = !collapse[colName];
    this.setState({ collapse });
  }

  render() {
    const { selections } = this.state,
          selectionItems = [];
    for (let column in selections) {
      if (selections.hasOwnProperty(column)) {
        const variable = selections[column];
        selectionItems.push(
          <li 
            key={`${variable}-selected-item`}
            style={styles.selectionListItem}
          >
            {`${variable} => ${column}`}
          </li>
        );
      }
    }

    let errorMessage;
    if (this.state.submitInvalid) {

    }

    return (
      <div>
        <div style={styles.grid}>
          <div style={styles.varList}>
            {this.props.columns.map(column => {
              if (column.columns) {
                return this.renderBranchColumnItem(column);
              } else {
                return this.renderLeafColumnItem(column);
              }
            })}
          </div>
          <ul style={styles.selectionList}>
            {selectionItems.length === 0 ? "No selections." : selectionItems}
          </ul>
        </div>
        <br />
        <Select
          label="Error Format"
          value={this.state.unctFormat}
          onChange={this.handleChangeUnctFormat}
        >
          <option value="abs">abs</option>
          <option value="%">%</option>
        </Select>
        <br />
        <button onClick={this.handleSubmit}>Submit</button>
        <span style={styles.errorMessage}>{this.state.errorMessage}</span>
      </div>
    );
  }

  renderBranchColumnItem(column) {
    const { title: colName } = column;
    return (
      <Collapse
        key={`${colName}-collapse`}
        collapsed={this.state.collapse[colName]}
        label={colName}
        onClick={() => this.handleToggleCollapse(colName)}
      >
        {column.columns.map(child => {
          if (child.columns) {
            return this.renderBranchColumnItem(child);
          } else {
            return this.renderLeafColumnItem(child);
          }
        })}
      </Collapse>
    );
  }

  renderLeafColumnItem(column) {
    const { title: colName } = column,
          { selections } = this.state;
    return (
      <Select
        key={`${colName}-select`}
        label={colName}
        value={selections.hasOwnProperty(colName) ? selections[colName] : ""}
        onChange={event => this.handleSelectionChange(colName, event.target.value)}
        style={{ margin: "10px" }}
      >
        <option key={`${colName}-option-default`} value=""></option>
        {numberVariables.map(v => <option key={`${colName}-option-${v}`} value={v}>{v}</option>)}
      </Select>
    );
  }


}

export default VariableChooser;

function getInitialCollapseState(columns, rtnval) {
  rtnval = rtnval || {};
  columns.forEach(col => {
    if (col.columns) {
      rtnval[col.title] = true;
      getInitialCollapseState(col.columns, rtnval);
    }
  });
  return rtnval;
}