// @flow
import React, { Component } from "react";
import * as Topsoil from "topsoil-js";

type Props = {
  data: {}[],
  options: {}
};

type State = {
  plot: Topsoil.ScatterPlot,
  root: HTMLElement
}

class TopsoilPlot extends Component<Props, State> {

  constructor(props) {
    super(props);
    this._rootRef = React.createRef();
  }

  componentDidMount() {
    let root = this._rootRef.current,
        plot = null;
    if (this.shouldCreatePlot()) {
      plot = createPlot(this);
    }
    this.setState({root, plot});
  }

  componentDidUpdate() {
    let { plot, root } = this.state;

    if (this.shouldCreatePlot()) {
      plot = new Topsoil.ScatterPlot(
        root,
        this.props.data,
        this.props.options
      );
      this.setState({ plot });
      return;
    }

    if (plot) {
      if (this.shouldDestroyPlot()) {
        plot = null;
        root.innerHTML = "";
        this.setState({ plot });
        return;
      }
      plot.data = this.props.data;
      plot.options = this.props.options;
    }
  }

  render() {
    return <div id="plot-root" ref={this._rootRef} />;
  }

  shouldCreatePlot() {
    return (dataPresent(this.props.data) && ! this.state.plot);
  }

  shouldDestroyPlot() {
    return (! dataPresent(this.props.data) && this.state.plot);
  }
  
}

function dataPresent(arr) {
  return arr && arr.length > 0;
}

function createPlot(component) {
  return new Topsoil.ScatterPlot(
    component.root,
    component.props.data,
    component.props.options
  );
}

function destroyPlot(component) {
  component.plot = null;
  component.root.innerHTML = "";
}

export default TopsoilPlot;
