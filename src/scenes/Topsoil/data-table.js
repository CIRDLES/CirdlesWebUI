// @flow
import React, { Component } from 'react';

type Props = {
  data: { rows: {}[], columns: {}[] }
}

class DataTable extends Component<Props> {
  
  constructor(props) {
    super(props);

    this.state = {
      rows: props.data.rows,
      columns: props.data.columns
    };
  }

  componentDidMount() {
    this.tabulator = new Tabulator("#tabulator", {
      layout: "fitDataFill",
      reactiveData: true,
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

  render() { 
    return (
      <div id="tabulator" />
    );
  }

  
}
 
export default DataTable;