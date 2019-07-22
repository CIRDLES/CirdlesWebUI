// @flow
import React, { Component } from "react";
import * as Topsoil from "topsoil-js";
import { OptionsContext } from "../options";
import { svgElementToBlob } from "../../../actions";
import "../../../styles/topsoil/plot.scss";

type Props = {
  plot: {},

  onZoom: Function
};

type State = {
  instance: Topsoil.ScatterPlot,
  root: HTMLElement
};

class TopsoilPlot extends Component<Props, State> {
  constructor(props) {
    super(props);

    this._rootRef = React.createRef();

    this.root = null;
    this.instance = null;
    
    this.handleResetView = this.handleResetView.bind(this);
    this.handleExportSVG = this.handleExportSVG.bind(this);
    this.handlePlotZoomed = this.handlePlotZoomed.bind(this);
    this.handleFitToConcordia = this.handleFitToConcordia.bind(this);
  }

  componentDidMount() {
    this.root = this._rootRef.current;

    if (this.shouldCreatePlot()) {
      this.createPlot();
    }
  }

  componentDidUpdate() {

    if (this.shouldCreatePlot()) {
      this.createPlot();
      return;
    }

    if (this.instance) {
      if (this.shouldDestroyPlot()) {
        this.destroyPlot();
        return;
      }

      this.instance.data = this.props.plot.data;
      this.instance.options = this.props.plot.options;
    }
  }

  handleResetView() {
    if (!this.instance) return;
    this.instance.resetView();
  }

  handleExportSVG() {
    if (!this.instance) return;

    const blob = svgElementToBlob(this.instance.svg.node()),
      url = URL.createObjectURL(blob),
      link = document.createElement("a");

    link.href = url;
    link.download = this.context.title || "download";

    const onClick = () => {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        link.removeEventListener("click", onClick);
      }, 150);
    };
    link.addEventListener("click", onClick);
    link.click();
  }

  handlePlotZoomed(plot) {
    this.props.onZoom(plot);
  }

  handleFitToConcordia() {
    console.log(this);
    if (! this.instance) return;
    this.instance.snapToConcordia();
  }

  render() {
    return (
      <div className="topsoil-plot-container">
        <div className="topsoil-plot-button-bar">
          {this.renderButton("Reset View", this.handleResetView)}
          {this.renderButton("Download SVG", this.handleExportSVG)}
          {this.renderButton("Fit to Concordia", this.handleFitToConcordia)}
        </div>
        <div ref={this._rootRef} className="topsoil-plot-root" />
      </div>
    );
  }

  renderButton(label, onClick) {
    return (
      <button
        onClick={onClick}
        disabled={! this.instance}
      >
        {label}
      </button>
    );
  }

  shouldCreatePlot() {
    return dataPresent(this.props.plot.data) && !this.instance;
  }

  createPlot() {
    this.instance = new Topsoil.ScatterPlot(
      this.root,
      this.props.plot.data,
      this.props.plot.options
    );
    this.instance.onZoom = this.props.onZoom;
    this.forceUpdate();
  }

  shouldDestroyPlot() {
    return !dataPresent(this.props.plot.data) && this.instance;
  }

  destroyPlot() {
    this.root.innerHTML = "";
    this.instance = null;
    this.forceUpdate();
  }
}

TopsoilPlot.contextType = OptionsContext;

function dataPresent(arr) {
  return arr && arr.length > 0;
}

export default TopsoilPlot;
