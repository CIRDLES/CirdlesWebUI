import React, {createRef, useRef, useState} from "react";
import '../../../styles/Squidink/dropdown-custom.scss';
export default class DropdownCustom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            listenerActive: false,
            hoverState: false
        }
        this.dropdownRef = createRef();
        this.toggleHover = this.toggleHover.bind(this);
        this.setIsActive = this.setIsActive.bind(this);
        this.clickAction = this.clickAction.bind(this);
        this.pageClick = this.pageClick.bind(this);
    }

    toggleHover() {
        this.setState({hoverState: !this.state.hoverState})
    }
    setIsActive(isActive) {
        this.setState({isActive: !isActive})
    }
    clickAction() {
        setTimeout(() =>{
            this.setIsActive(this.state.isActive);
            if(!this.state.listenerActive) {
                this.setState({listenerActive: !this.state.listenerActive})
                window.addEventListener('click', this.pageClick)
            }
            else {
                this.setState({listenerActive: !this.state.listenerActive})
                window.removeEventListener('click', this.pageClick)
            }
        }, 100)


    }
    pageClick = (e) => {
        if (this.dropdownRef.current !== null && !this.dropdownRef.current.contains(e.target)) {
            this.setIsActive(this.state.isActive);
            window.removeEventListener('click', this.pageClick)
        }
    }

    render() {
        return (
            this.props.onClickOveride != null ?
                <div  ref={this.dropdownRef}className="menu-container-custom">
                    <button onClick={this.props.onClickOveride} className="menu-trigger-custom">
                        <span>{this.props.dropdownName}</span>
                    </button>
                </div>
                :
            <div  ref={this.dropdownRef}className="menu-container-custom">
                <button onClick={this.clickAction} className="menu-trigger-custom">
                    <span>{this.props.dropdownName}</span>
                </button>
                <nav className={`menu-custom ${this.state.isActive ? "active" : "inactive"}`}>
                    <ul onClick={this.clickAction}>
                        {

                            this.props.dropdownOptions.map((options) => {
                                if(this.props.functionOverride != undefined) {
                                    if(this.props.functionOverride.has(options.id.toString())) {
                                        return(

                                            <li className={"dropdown-context-custom"}key={options.id}>
                                                <a className={"dropdown-context-custom"}key={options.id}onClick={this.props.functionOverride.get(options.id.toString()).function}>{options.title} </a>
                                            </li>
                                        );
                                    }
                                    else {
                                        return(
                                            <li className={"dropdown-context-custom"}key={options.id}>
                                                <a className={"dropdown-context-custom"}key={options.id}onClick={options.onclick}>{options.title}</a>
                                            </li>
                                        );
                                    }
                                }
                                else {
                                    return(
                                        <li className={"dropdown-context-custom"}key={options.id}>
                                            <a className={"dropdown-context-custom"}key={options.id}onClick={options.onclick}>{options.title}</a>
                                        </li>
                                );
                        }})}
                    </ul>
                </nav>
            </div>

        );
    }
}

