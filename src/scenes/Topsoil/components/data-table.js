// @flow
import React, { Component } from 'react';
import Tabulator from "tabulator-tables";
import isEqual from "lodash.isequal";

const styles = {
  loadBackground: {
    
  }
}

const labelColumn = {
  title: "Label",
  field: "title",
  width: 150,
  frozen: true
};

const selectedColumn = {
  title: "Selected",
  field: "selected",
  editor: true,
  formatter: "tickCross",
  align: "center",
  frozen: true
};

const numberEditor = function (cell, onRendered, success, cancel, editorParams) {
  let editor = document.createElement("input");

  editor.setAttribute("type", "string");

  // Create and style input
  editor.style.padding = "3px";
  editor.style.width = "100%";
  editor.style.boxSizing = "border-box";

  editor.value = cell.getValue();

  // Set focus on the select box when the editor is selected
  onRendered(() => {
    editor.focus();
    // editor.style.css = "100%";
  });

  // Commit edit only if value is a number
  editor.addEventListener("blur", () => {
    const value = +editor.value;
    if (isNaN(value)) cancel(); 
    else success(value);
  });
  return editor;
};

type DataRow = { label: string; selected: boolean; _children?: DataRow[]; }
type DataColumn = { name: string; field: string; columns?: DataColumn[]; }

type Props = {
  rows: DataRow[], 
  columns: DataColumn[],

  onCellEdited: Function
}
class DataTable extends Component<Props> {

  constructor(props) {
    super(props);

    this.tabulatorRef = React.createRef();

    this.state = {
      rows: [],
      columns: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const columns = [...nextProps.columns];
    addEditorToLeafColumns(columns);
    columns.unshift(labelColumn, selectedColumn);

    return {
      rows: nextProps.rows,
      columns
    }
  }

  componentDidMount() {
    this.tabulator = new Tabulator(this.tabulatorRef.current, {
      layout: "fitDataFill",
      height: "100%",
      dataTree: true,
      data: this.state.rows,
      columns: this.state.columns,
      placeholder: "No data loaded.",
      reactiveData: true,
      cellEdited: this.props.onCellEdited
    });
  }
  
  componentDidUpdate() {
    const { rows, columns } = this.state;

    // Only reload the tabulator if necessary
    if (! isEqual(columns, this.tabulator.getColumnDefinitions())) {
      this.tabulator.setColumns(columns);
    }
    // Only reload the tabulator if necessary
    if (! isEqual(rows, this.tabulator.getData())) {
      this.tabulator.setData(rows)
        .catch(error => {
          console.error(error);
        });
    }
  }

  render() { 
    return (
      <div ref={this.tabulatorRef} />
    );
  }

}
 
export default DataTable;

function addEditorToLeafColumns(columns) {
  columns.forEach(col => {
    if (col.columns) {
      addEditorToLeafColumns(col.columns);
      return;
    }
    col.editor = numberEditor;
  });
}