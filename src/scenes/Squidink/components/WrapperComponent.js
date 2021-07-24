import React from 'react';
import ReactLoading from 'react-loading';
import ResizePanel from "./ResizePanel";
import style from 'styles/Squidink/Main.scss';
import classNames from 'classnames/bind';
import Image from "img/logos/SquidInk.svg"
import axios from 'axios';
import DropdownCustom from "./DropdownCustom";
import "constants/api";
import {dropdownOptions} from "../util/constants";
import {connect} from "react-redux";
import {FILEBROWSER_URL, SQUIDINK_ENDPOINT} from "constants/api";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

let cx = classNames.bind(style);

function WrapperComponent(props) {
    let fOvd = new Map()
    fOvd.set('2', {function: props.openAction})
    fOvd.set('4', {function: props.openAction})
    return(
        <>{props.isLoading ?
            <div>
                <div style={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%'
                }}>
                    <div>
                        <ReactLoading type={'spin'} color={'#000000'}/>
                    </div>
                </div>
                <div style={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100% + 8em)',
                    width: '100%'
                }}>
                    <h1>Your file is loading</h1>
                </div>
            </div>
            : <div className={cx('container-custom')}>
                <Modal open={props.modalOpen} onClose={props.handClose}>{body}</Modal>
                <div className={cx('body')}>
                    {props.showfbr ?
                        <ResizePanel onDragStart={props.hideinternal} onDragEnd={props.showinternal} direction="e"
                                     style={{id: 'fbr', flexGrow: '1'}}>
                            <div className={cx('sidebar', 'withMargin', 'panel')}>
                                <iframe id='iframee'
                                        style={{
                                            display: 'flex',
                                            flexGrow: '1',
                                            overflow: 'auto',
                                            height: '100%',
                                            width: '100%'
                                        }}
                                        src={FILEBROWSER_URL}></iframe>
                            </div>
                        </ResizePanel>
                        : null}
                    <div className={cx('content')}
                         style={{display: 'flex', overflow: 'scroll !important'}}>
                        <div className={cx('header-custom', 'panel-custom')}
                             style={{position: 'fixed', top: '40', zIndex: 10}}>
                            <div className="rownav" style={{display: 'flex'}}>
                                <DropdownCustom dropdownName="Filebrowser"
                                                dropdownOptions={props.toggleFilebrowserFunc}></DropdownCustom>
                                <DropdownCustom dropdownName="Project"
                                                dropdownOptions={dropdownOptions[0]} functionOverride={fOvd}></DropdownCustom>
                                <DropdownCustom dropdownName="Data"
                                                dropdownOptions={dropdownOptions[1]}></DropdownCustom>
                                <DropdownCustom dropdownName="Task"
                                                dropdownOptions={dropdownOptions[2]}></DropdownCustom>
                                <DropdownCustom dropdownName="Isotopes"
                                                dropdownOptions={dropdownOptions[3]}></DropdownCustom>
                                <DropdownCustom dropdownName="Expressions"
                                                dropdownOptions={dropdownOptions[4]}></DropdownCustom>
                                <DropdownCustom dropdownName="Common Pb"
                                                dropdownOptions={dropdownOptions[5]}></DropdownCustom>
                                <DropdownCustom dropdownName="Interpretations"
                                                dropdownOptions={dropdownOptions[6]}></DropdownCustom>
                                <DropdownCustom dropdownName="Reports"
                                                dropdownOptions={dropdownOptions[7]}></DropdownCustom>
                                <DropdownCustom dropdownName="Archiving"
                                                dropdownOptions={dropdownOptions[8]}></DropdownCustom>
                                <DropdownCustom dropdownName="Parameter"
                                                dropdownOptions={dropdownOptions[9]}></DropdownCustom>
                                <DropdownCustom dropdownName="About"
                                                dropdownOptions={dropdownOptions[10]}></DropdownCustom>
                            </div>
                        </div>

                        {props.children}
                    </div>

                </div>
            </div>}
            </>
            )
}
const body = (
    <div style={{
        position: 'absolute',
        width: '400',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '2px solid #000',
        backgroundColor: 'white',
        padding: '4px'
    }}
         className={'paper'}>
        <p id="simple-modal-description">
            Open / New File Actions are handled in the Filebrowser! Try double-clicking an appropriate file or
            viewing the context-menu with right-click.
        </p>
    </div>
);
export default WrapperComponent;