import React, {createRef, useRef, useState} from "react";
import '../../../styles/Squidink/ContextMenu.scss';
export default class DropdownCustom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }



    render() {
        return (
            <>
                {
                    this.props.menuActive ?
                        <ul className="menu" style={{top: this.props.yPos, left: this.props.xPos, position: "absolute"}}>
                            <li className="menuOpt">Login</li>
                            <li className="menuOpt">Register</li>
                            <li className="menuOpt">Open Profile</li>
                        </ul>
                        : null
                }
            </>
        )
    }
}

