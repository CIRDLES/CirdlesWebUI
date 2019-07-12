// @flow
import React, { Component } from 'react';
import Tabulator from "tabulator-tables";

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
  data: { 
    rows: DataRow[], 
    columns: DataColumn[] 
  }
}
class DataTable extends Component<Props> {

  componentDidMount() {
    const columns = [...this.props.columns];
    this.addEditorToLeafColumns(columns);

    columns.unshift(labelColumn, selectedColumn);

    this.tabulator = new Tabulator("#tabulator", {
      layout: "fitDataFill",
      height: "100%",
      dataTree: true,
      data: this.props.rows,
      columns: columns,
      placeholder: "No data loaded.",
      reactiveData: true
    });
    
  }
  
  componentDidUpdate() {
    const columns = [...this.props.columns];
    this.addEditorToLeafColumns(columns);
    columns.unshift(labelColumn, selectedColumn);

    this.tabulator.setColumns(columns);
    this.tabulator.setData(this.props.rows)
      .catch(error => {
        console.error(error);
      });
  }

  render() { 
    return (
      <div id="tabulator" />
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
 
export default DataTable;