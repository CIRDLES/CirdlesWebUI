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
                            {
                                this.props.contextContent.map((val) => {
                                    return(<li key={Math.random()}className="menuOpt">{val}</li>)
                                })
                            }
                        </ul>
                        : null
                }
            </>
        )
    }
}

