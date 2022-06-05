import React from 'react';
import style from 'styles/Squidink/Main.scss';
import classNames from 'classnames/bind';
import "constants/api";
import {connect} from "react-redux";
import WrapperComponent from "./WrapperComponent";
import {requestSender} from "../util/constants";
import Button from "@material-ui/core/Button";
import ContextMenu from "./ContextMenu";

let cx = classNames.bind(style);

export class Isotopes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableArr: null,
            previousEleId: 0,
            tableId: 0,
            contextContentFunctions: [],
            contextContent: [],
            xPos: -1,
            yPos: -1,
            menuActive: false,
            curAmu: -1
        }
        this.onClickEvent = this.onClickEvent.bind(this)
        this.nonEditOnClickEvent = this.nonEditOnClickEvent.bind(this)
        this.pullIsotopes = this.pullIsotopes.bind(this)
        this.setBackground = this.setBackground.bind(this)
        this.contextMenuFunc = this.contextMenuFunc.bind(this)
    }

    componentDidMount() {
        this.pullIsotopes()
        document.getElementById("table").addEventListener("contextmenu", this.contextMenuFunc)
    }

    componentWillUnmount() {
        document.getElementById("table").removeEventListener("contextmenu", this.contextMenuFunc)
    }

    contextMenuFunc(e) {
        try {
            e.preventDefault()
            let clicked = document.getElementById(e.target.id);
            clicked.parentElement.style.backgroundColor = "#4982F4"
            //Row must be an actual row/ cell
            if(clicked.id != "table" && clicked.name != "msl" && clicked.name != "el" && clicked.name != "uth" && clicked.name != "dil" && clicked.name != "til" && clicked.name != "amu") {
                let amu;
                switch(clicked.id%6) {
                    case 1:
                        amu = clicked.nextElementSibling.nextElementSibling.nextElementSibling.textContent
                        break;
                    case 2:
                        amu = clicked.nextElementSibling.nextElementSibling.textContent
                        break;
                    case 3:
                        amu = clicked.nextElementSibling.textContent
                        break;
                    case 4:
                        amu = clicked.textContent
                        break;
                    case 5:
                        amu = clicked.previousElementSibling.textContent
                        break;
                    case 0:
                        amu = clicked.previousElementSibling.previousElementSibling.textContent
                        break;
                }
                console.log(amu)
                console.log(clicked.id)
                console.log(clicked.id%6)
                console.log(clicked)
                this.setState({
                    curAmu: amu,
                    xPos: e.pageX + 'px',
                    yPos: (e.pageY - 40) + 'px',
                    contextContent: ["Select as Background Isotope", "De-select as Background Isotope"],
                    contextContentFunctions: [() => {
                        this.setBackground(true, false, amu)
                        this.setState({menuActive: false})
                    }, () => {
                        this.setBackground(false, false, amu)
                        this.setState({menuActive: false})
                    }],
                    menuActive: true
                })
            }

        } catch(e) {
            //if they didnt click on a row, its not our fault
        }
    }

    pullIsotopes() {
        requestSender('/isotopes', localStorage.getItem("user")).then(r => {
            this.setState({tableArr: r.data});
        })
    }

    setBackground(isSelect, isCopy, amu) {
        if(isCopy) {
            requestSender('/background', localStorage.getItem("user") + `:.:.:copy`).then(r => {
                this.pullIsotopes()
            })
        }
        else{
            requestSender('/background', localStorage.getItem("user") + `:${amu}:${isSelect}:${isCopy}`).then(r => {
                this.pullIsotopes()
            })
        }
    }
    onClickEvent = (e) => {
        if (this.state.previousEleId) {
            let prevEle = document.getElementById(this.state.previousEleId)
            if(prevEle) {
                prevEle.parentElement.style.backgroundColor = ""
                prevEle.contentEditable = false
            }
        }
        let curEle = document.getElementById(e.target.id)

        curEle.parentElement.style.backgroundColor = "#4982F4"
        curEle.contentEditable = true

        setTimeout(() => {
            curEle.focus()
            curEle.addEventListener("focusout", (e) => {
                let prevEle = document.getElementById(e.target.id)
                let type;
                let amu;
                let val = prevEle.textContent
                switch(prevEle.id%6) {
                    case 2:
                        type="el"
                        amu = prevEle.nextElementSibling.nextElementSibling.textContent
                        break;
                    case 3:
                        type="uth"
                        amu = prevEle.nextElementSibling.textContent
                        break;
                    case 5:
                        type="dil"
                        amu = prevEle.previousElementSibling.textContent
                        break;
                }
                requestSender("/isotopesetter", localStorage.getItem("user") + ":" + amu + ":" + type + ":" + val )
            })
        }, 0)

        this.setState({previousEleId: e.target.id})
    }
    nonEditOnClickEvent = (e) => {
        if (this.state.previousEleId) {
            let prevEle = document.getElementById(this.state.previousEleId)
            prevEle.parentElement.style.backgroundColor = ""
            prevEle.contentEditable = false
        }
        let curEle = document.getElementById(e.target.id)

        curEle.parentElement.style.backgroundColor = "#4982F4"

        this.setState({previousEleId: e.target.id})
    }
    render() {
        let counter = 0;
        return (
            //All functions are self-contained to the wrapper with the exception of the history.push to reroute the user, which requires a reference to the React-Router
            //Because WrapperComponent is not instantiated from the router but from its child, we have to pass in the history as a prop
            <WrapperComponent stateNum={1} history={this.props.history}>
                <ContextMenu functions={this.state.contextContentFunctions}
                             contextContent={this.state.contextContent} xPos={this.state.xPos}
                             yPos={this.state.yPos} menuActive={this.state.menuActive}/>
                <div style={{
                    width: "100%", position: "relative", background: "#dce3e6",
                    border: "2px solid #e1e4e8", margin: "60px 60px 0px 60px"
                }}>
                    <div style={{width: "100%", height: "10%", display: "flex"}}>
                        <b style={{textAlign: "center", color: "#c45003"}}>BUTTON will copy Task Isotope Labels from
                            Column T to Data Isotope Labels in Column D.
                            Or, you can edit Data Isotope Labels in Column D to match Task Isotope Labels in Column T.
                            Right-mouse click a row to (de)select Background Isotope.</b>
                    </div>
                    <div style={{width: '100%', height: '60%', position: 'relative'}}>
                        <table id={"table"}>
                            <tr>
                                <th name="msl">
                                    Mass Station Label
                                </th>
                                <th name="el">
                                    Element Label (edit)
                                </th>
                                <th name="uth">
                                    U- or Th-Bearing (edit)
                                </th>
                                <th name="amu">
                                    AMU
                                </th>
                                <th name="dil">
                                    (D) Data Isotope Label (edit)
                                </th>
                                <th name="til">
                                    (T) Task Isotope Label
                                </th>
                            </tr>
                            {
                                this.state.tableArr ? this.state.tableArr.map((entry) => {
                                    return (
                                        <tr>
                                            <td id={++counter} onClick={this.nonEditOnClickEvent}>{entry.msl}</td>
                                            <td id={++counter} onClick={this.onClickEvent}>{entry.el}</td>
                                            <td id={++counter} onClick={this.onClickEvent}>{entry.uth}</td>
                                            <td id={++counter} onClick={this.nonEditOnClickEvent}>{entry.amu}</td>
                                            <td id={++counter} onClick={this.onClickEvent}>{entry.dil}</td>
                                            <td id={++counter} onClick={this.nonEditOnClickEvent}>{entry.til}</td>
                                        </tr>
                                    )
                                }) : null
                            }
                        </table>
                        <div style={{position: 'relative', width: "50%", display: "inline-block"}}>
                        </div>
                        <div style={{position: 'relative', width: '50%', display: "inline-block"}}>
                            <b style={{textAlign: "center", color: "#c45003", display: "block"}}>Background Status: Selected</b>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <Button onClick={() => this.setBackground(false, true)}style={{backgroundColor: "#ff6e3c"}}> &lt;&lt;Copy Task
                                    Isotope Labels (T) to Data Isotope Labels (D)</Button>
                            </div>
                        </div>
                    </div>

                </div>
            </WrapperComponent>
        )
    }
}

export default connect()(Isotopes);

