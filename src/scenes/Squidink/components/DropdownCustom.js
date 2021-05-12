import React, {useRef, useState} from "react";
import '../../../styles/Squidink/dropdown-custom.scss';
export default class DropdownCustom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        }
        this.setIsActive = this.setIsActive.bind(this);
        this.clickAction = this.clickAction.bind(this);
    }
    setIsActive(isActive) {
        this.setState({isActive: !isActive})
    }
    clickAction() {
        this.setIsActive(this.state.isActive);
    }
    render() {
        return (
            <div className="menu-container-custom" >
                <button onClick={this.clickAction} className="menu-trigger-custom">
                    <span>{this.props.dropdownName}</span>
                </button>
                <nav className={`menu-custom ${this.state.isActive ? "active" : "inactive"}`}>
                    <ul>
                        {
                            this.props.dropdownOptions.map(options => {

                            return(
                                <li key={options.id}>
                                    <a key={options.id}onClick={options.onclick}>{options.title}</a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>

        );
    }
}

