import React, {createRef, useRef, useState} from "react";
import '../../../styles/Squidink/dropdown-custom.scss';
export default class DropdownCustom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        }
        this.dropdownRef = createRef();
        this.setIsActive = this.setIsActive.bind(this);
        this.clickAction = this.clickAction.bind(this);
        this.pageClick = this.pageClick.bind(this);
    }


    setIsActive(isActive) {
        this.setState({isActive: !isActive})
    }
    clickAction() {
        setTimeout(() =>{
            this.setIsActive(this.state.isActive);
            window.addEventListener('click', this.pageClick)
        }, 100)

    }
    pageClick = (e) => {
        if (this.dropdownRef.current !== null && !this.dropdownRef.current.contains(e.target) && this.state.isActive) {
            console.log(e.target)
            this.setIsActive(this.state.isActive);
            window.removeEventListener('click', this.pageClick)
        }
    }

    render() {
        return (

            <div  ref={this.dropdownRef}className="menu-container-custom" >
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

