// @flow
import React, { Component } from "react";
import * as Topsoil from "../../../../libs/topsoil";

type Props = {
  data: {}[],
  options: {}
};

class TopsoilPlot extends Component<Props> {
  componentDidMount() {
    if (this.props.data) {
      this.createPlot();
    }
  }

  componentDidUpdate() {
    if (! this.props.data) {
      this.destroyPlot();
      return;
    }

    if (this.plot = null) {
      this.createPlot();
    }

    this.plot.setData(this.props.data);
    this.plot.setOptions(this.props.options);
  }

  render() {
    return (
      <div>
        <div id="#plot" />
      </div>
    );
  }

  createPlot() {
    this.plot = new Topsoil.ScatterPlot(
      document.getElementById("plot"),
      this.props.data,
      this.props.options
    );
  }

  destroyPlot() {
    this.plot.root.innerHTML = "";
    this.plot = null;
  }
}

export default TopsoilPlot;
