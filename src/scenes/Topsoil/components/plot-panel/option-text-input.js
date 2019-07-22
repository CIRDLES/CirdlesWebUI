import React, { Component } from "react";
import { OptionsProvider, OptionsConsumer } from "../../options";

type Props = {
  value: string,
  label: string,
  onChange: Function
};

class OptionTextInput extends Component {
  render() {
    const { value, label, onChange } = this.props;

    return (
      <div>
        <label>{label}: </label>
        <input
          type="text"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default OptionTextInput;
