import React, { Component } from 'react';
import { UID } from 'react-uid';

type Props = {
  label: string,
  value: string,
  style: {},
  onChange: Function
}

export class Select extends Component<Props> {

  render() { 
    const { label, value, onChange } = this.props;
    return (
      <UID name={id => `Select_${id}`}>
        {id => 
          <div style={this.props.style}>
            <label htmlFor={id}>{label}: </label>
            <select
              id={id}
              value={value}
              onChange={onChange}
            >
              {this.props.children}
            </select>
          </div>
        }
      </UID>
    );
  }

}
