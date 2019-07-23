// @flow
import React, { Component } from 'react';

type Props = {
  label: string,
  defaultValue: number,
  onSetValue: Function
}

class Lambda extends Component<Props> {

  constructor(props) {
    super(props);

    this.field = React.createRef();

    this.handleSetValue = this.handleSetValue.bind(this);
  }

  componentDidUpdate() {
    // Set the value of the field if the lambda value is changed elsewhere
    this.field.current.value = this.field.current.defaultValue;
  }

  handleSetValue() {
    this.props.onSetValue(+this.field.current.value);
  }

  render() { 
    const { label, defaultValue, onSetValue } = this.props;
    return (
      <div>
        <label>{label}:</label>
        <input
          ref={this.field}
          type="text"
          defaultValue={defaultValue}
          style={{ margin: "0 0.5em", width: "10em" }}
        />
        <button onClick={this.handleSetValue}>Set</button>
      </div>
    );
  }
}
 
export default Lambda;