// @flow
import React, { Component } from "react";

const styles = {
  varSelector: {
    marginBottom: "10px"
  }
}

type Props = {
  columns: [],
  varMap: {},

  onSubmit: Function
};

class VariableChooser extends Component<Props> {
  constructor(props) {
    super(props);

    const getVarIfExists = key => {
      if (props.variables && props.variables[key]) return props.variables[key];
      return null;
    }

    this.state = {
      variables: {
        x: getVarIfExists("x"),
        sigma_x: getVarIfExists("sigma_x"),
        y: getVarIfExists("y"),
        sigma_y: getVarIfExists("sigma_y"),
        rho: getVarIfExists("rho")
      }
    };

    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  handleSelectionChange(colName, varName) {
    const variables = { ...this.state.variables };
    if (varName === null && variables[varName]) {
      delete variables[varName];
    } else {
      variables[varName] = colName;
    }
    this.setState({ variables });
  }

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        {this.props.columns.map(col => {
          return (
            <div key={`variableFor${col.title}`} style={styles.varSelector}>
              <label>{col.title + ": "}</label>
              <select
                name={col.title}
                defaultValue={null}
                onChange={event => this.handleSelectionChange(col.title, event.value)}
              >
                <option value={null}></option>
                <option value="x">X</option>
                <option value="sigma_x">sigma_X</option>
                <option value="y">Y</option>
                <option value="sigma_y">sigma_Y</option>
                <option value="rho">corr coef (rho)</option>
              </select>
            </div>
          );
        })}
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default VariableChooser;
