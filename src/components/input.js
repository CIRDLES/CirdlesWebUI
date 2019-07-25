import React, { Component } from "react";
import { UID } from "react-uid";

type Props = {
  label: string,
  type?: string,
  value: string,
  onChange: Function
};

export class Input extends Component<Props> {
  render() {
    const { label, type, value, onChange } = this.props;

    return (
      <UID name={id => `Input_${id}`}>
        {id =>
          <div>
            <label htmlFor={id}>{label}: </label>
            <input
              id={id}
              type={type || "text"}
              value={value}
              onChange={onChange}
            />
          </div>
        }
      </UID>
    );
  }
}
