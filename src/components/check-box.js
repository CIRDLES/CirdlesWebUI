// @flow
import React, { Component } from 'react';
import { UID } from 'react-uid';

type Props = {
  label: String,
  checked: boolean,
  onChange: Function
}

export class CheckBox extends Component<Props> {

  render() {
    const { label, checked, onChange } = this.props;
    return (
      <UID>
        {id =>
          <div>
            <input 
              id={id}
              type="checkbox"
              checked={checked}
              onChange={onChange}
            />
            <label htmlFor={id}>{label}</label>
          </div>
        }
      </UID>
    );
  }
}
 