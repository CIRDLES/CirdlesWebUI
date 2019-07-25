// @flow
import React, { Component } from "react";
import { Variable } from "topsoil-js";
import { Select } from "../../../components";
import { UID } from "react-uid";
import Collapse from "../../../components/collapse";

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 15em",
    width: "100%"
  },
  varList: {
    gridColumn: 1,
    padding: "0.5em",
    border: "1px solid #ccc",
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

  onSubmit: Function
};

class VariableChooser extends Component<Props> {
  constructor(props) {
    super(props);

    const { variables } = this.props,
          selections = {};
    for (let key in this.props.variables) {
      if (variables.hasOwnProperty(key)) {
        selections[variables[key]] = key;
      }
    }

    this.state = {
      selections,
      collapse: getInitialCollapseState(this.props.columns)
    };

    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelectionChange(colName, varName) {
    const selections = { ...this.state.selections };
    
    for (let col in selections) {
      if (selections.hasOwnProperty(col) && selections[col] === varName) {
        delete selections[col];
      }
    }

    if (varName === "") {
      delete selections[colName];
    } else {
      selections[colName] = varName;
    }
    this.setState({ selections });
  }

  handleSubmit() {
    const { selections } = this.state,
          variables = {};
    for (let colName in selections) {
      if (selections.hasOwnProperty(colName)) {
        variables[selections[colName]] = colName;
      }
    }
    this.props.onSubmit(variables);
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
            {selectionItems}
          </ul>
        </div>
        <br />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }

  renderBranchColumnItem(column) {
    const { title: colName } = column;
    return (
      <Collapse
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