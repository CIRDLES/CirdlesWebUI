// @flow
import React, { Component } from "react";
import * as Topsoil from "topsoil-js";
import { svgElementToBlob } from "../../../actions";
import { colors } from "../../../constants";

const styles = {
  container: {
    width: "100%",
    height: "100%"
  },
  buttonBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // subtract padding and mainSplit border from width
    width: "calc(100% - 1em)",
    height: "2em",
    padding: "0.5em",
    backgroundColor: colors.lightGray,
    border: "solid " + colors.darkGray,
    borderWidth: "0 0 1px 0"
  },
  button: {
    margin: "0.5em"
  },
  root: {
    // subtract mainSplit border from width
    width: "calc(100%)",
    // subtract buttonBar from height
    height: "calc(100% - 3em)",
    backgroundColor: colors.white
  }
}

type Props = {
  plot: {},
  onZoomEnd: Function
};

type State = {
  instance: Topsoil.ScatterPlot,
  root: HTMLElement
};

class TopsoilPlot extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.rootRef = React.createRef();

    this.instance = null;
    
    this.handleResetView = this.handleResetView.bind(this);
    this.handleExportSVG = this.handleExportSVG.bind(this);
  }

  componentDidMount() {
    // this.root = this.rootRef.current;

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

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.buttonBar}>
          {this.renderButton("Reset View", this.handleResetView)}
          {this.renderButton("Download SVG", this.handleExportSVG)}
        </div>
        <div ref={this.rootRef} style={styles.root} />
      </div>
    );
  }

  renderButton(label, onClick) {
    return (
      <button
        onClick={onClick}
        disabled={! this.instance}
        style={styles.button}
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
      this.rootRef.current,
      this.props.plot.data,
      this.props.plot.options
    );
    this.instance.onZoomEnd = this.props.onZoomEnd;
    this.forceUpdate();
  }

  shouldDestroyPlot() {
    return !dataPresent(this.props.plot.data) && this.instance;
  }

  destroyPlot() {
    this.rootRef.current.innerHTML = "";
    this.instance = null;
    this.forceUpdate();
  }
}

function dataPresent(arr) {
  return arr && arr.length > 0;
}

export default TopsoilPlot;
