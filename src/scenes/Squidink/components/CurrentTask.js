import React from 'react';
import style from 'styles/Squidink/CurrentTask.scss';
import classNames from 'classnames/bind';
import "constants/api";
import {connect} from "react-redux";
import WrapperComponent from "./WrapperComponent";
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

export class CurrentTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //State-initializer, initialize state vars here for reference from html
            mount: true,
        };
        //If a component requires 'this.' context, it's easiest to bind it, i.e.

    }
    render() {
        return (
            this.state.mount ?
            //All functions are self-contained to the wrapper with the exception of the history.push to reroute the user, which requires a reference to the React-Router
            //Because WrapperComponent is not instantiated from the router but from its child, we have to pass in the history as a prop
            <WrapperComponent stateNum={1}history={this.props.history}>
                <div className={cx('grid-container-custom-t')}>
                    <div className={cx('task-name-label')}>
                        <h3>Task Name:</h3>
                    </div>
                    <div className={cx('task-name-text')}>
                        <TextField style={{width: '80%'}}/>
                        <h5 className={cx('geochron-label')} style={{display: "inline", paddingTop: "10px", paddingLeft: "30px"}}>Geochron Mode</h5>
                    </div>
                    <div className={cx('description-label')}>
                        <h3>Description:</h3>
                    </div>
                    <div className={cx('description-text')}>
                        <TextField style={{width: '100%'}}/>
                    </div>
                    <div className={cx('author-lab-label')}>
                        <h3>Author & Lab:</h3>
                    </div>
                    <div className={cx('author-name-text')}>
                        <TextField style={{width: '100%'}}/>
                    </div>
                    <div className={cx('lab-name-label')}>
                        <h3>Lab Name:</h3>
                    </div>
                    <div className={cx('lab-name-text')}>
                        <TextField style={{width: '85%'}}/>
                    </div>
                    <div className={cx('provenance-label')}>
                        <h3>Provenance:</h3>
                    </div>
                    <div className={cx('provenance-text')}>
                        <TextField style={{width: '95%'}}/>
                    </div>
                    <div className={cx('directives-label')}>
                        <h3>Directives:</h3>
                    </div>
                    <div className={cx('directives-content')}>
                        <div className={cx('directives-grid-wrapper')}>
                            <div className={cx('primary-ratio')}>
                                <div style={{display: "inline"}}>
                                    <p style={{margin: "0 0 0 0 !important", fontSize: "14px"}}>Primary daughter/parent ratio:</p>
                                </div>
                            </div>
                            <div className={cx('secondary-ratio')}>
                                <div style={{display: "inline"}}>
                                    <p style={{margin: "0 0 0 0 !important", fontSize: "14px"}}>Calculate secondary d/p ratio:</p>
                                </div>
                            </div>
                            <div className={cx('uranium-check')}>
                                <div style={{display: "inline"}}>
                                    <p style={{margin: "0 0 0 0 !important", fontSize: "12px", display: "inline"}}>Uncor_206PB238U_CalibConst:</p>
                                </div>
                            </div>
                            <div className={cx('uncor-uranium-box')}>

                            </div>
                            <div className={cx('thorium-uranium-check')}>
                                <div style={{display: "inline"}}>
                                    <p style={{margin: "0 0 0 0 !important", fontSize: "12px"}}>232Th238U_RM:</p>
                                </div>
                            </div>
                            <div className={cx('thor-ur-box')}>

                            </div>
                            <div className={cx('thorium-check')}>
                                <div style={{display: "inline"}}>
                                    <p style={{margin: "0 0 0 0 !important", fontSize: "12px"}}>Uncor_208Pb232Th_CalibConst:</p>
                                </div>
                            </div>
                            <div className={cx('uncor-thor-box')}>

                            </div>
                            <div className={cx('parent-check')}>
                                <div style={{display: "inline"}}>
                                    <p style={{margin: "0 0 0 0 !important", fontSize: "12px"}}>ParentElement_ConcenConst:</p>
                                </div>
                            </div>
                            <div className={cx('p-ele-const-box')}>

                            </div>
                        </div>
                    </div>
                    <div className={cx('task-audit-label')}>
                        <h3>Task Audit:</h3>
                    </div>
                    <div className={cx('task-audit-content')}>

                    </div>
                    <div className={cx('actions-label')}>
                        <h3>Actions:</h3>
                    </div>
                    <div className={cx('actions-content')}>
                        <div style={{paddingRight: "10px",display: "inline"}}>
                            <Button variant="contained" color={"primary"}
                                    onClick={() => {console.log("")}}>
                                Edit Current Task
                            </Button>
                        </div>
                        <Button variant="contained" color={"primary"} style={{display: "inline"}}
                                onClick={() => {console.log("")}}>
                            Save Current Task as a Squid Task '.xml' file
                        </Button>
                    </div>
                </div>
            </WrapperComponent>
            :
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%"
        }}>
            <h1>No File Selected</h1>
        </div>
        )
    }
}

export default connect()(CurrentTask);

