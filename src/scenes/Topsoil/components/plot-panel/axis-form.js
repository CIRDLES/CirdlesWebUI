// @flow
import React, { Component } from "react";
import OptionTextInput from "./option-text-input";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  extentsGroup: {
    margin: "0.5em 0"
  },
  extentsField: {
    width: "5em"
  }
};

type Props = {
  axisType: string,
  axisName: String,
  axisMin: number,
  axisMax: number,
  onOptionChanged: Function,
  onSetExtents: Function
};

class AxisForm extends Component<Props> {
  constructor(props) {
    super(props);

    this.minField = React.createRef();
    this.maxField = React.createRef();

    this.handleSetExtents = this.handleSetExtents.bind(this);
  }

  handleSetExtents() {
    this.props.onSetExtents(
      this.minField.current.value,
      this.maxField.current.value
    );
  }

  render() {
    const {
      axisType,
      axisName,
      axisMin,
      axisMax,
      onOptionChanged
    } = this.props;

    return (
      <div style={styles.container}>
        <OptionTextInput
          value={axisName}
          label={axisType}
          onChange={onOptionChanged}
        />
        <div style={styles.extentsGroup}>
          <input
            style={styles.extentsField}
            type="text"
            defaultValue={axisMin}
          />
          <span> to </span>
          <input
            style={styles.extentsField}
            type="text"
            defaultValue={axisMax}
          />
        </div>
        <button onClick={this.handleSetExtents}>Set Extents</button>
      </div>
    );
  }
}

export default AxisForm;
