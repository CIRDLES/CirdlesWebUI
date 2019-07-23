import React, { Component } from 'react';
import { UID } from 'react-uid';

type Props = {
  label: string,
  value: string,
  onChange: Function
}

class Select extends Component<Props> {

  render() { 
    const { label, value, onChange } = this.props;
    return (
      <UID name={id => `Select_${id}`}>
        {id => 
          <div>
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
 
export default Select;