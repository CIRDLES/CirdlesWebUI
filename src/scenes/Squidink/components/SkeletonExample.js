import React from 'react';
import {connect} from "react-redux";
import DropdownCustom from "./DropdownCustom";
import {dropdownOptions} from "../util/constants";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from "@material-ui/core/TextField";
import classNames from "classnames/bind";
import style from "styles/Squidink/Skeleton.scss";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ButtonGroup from "@material-ui/core/ButtonGroup";
let cx = classNames.bind(style);
export class SkeletonExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //State-initializer, initialize state vars here for reference from html
            sbmVal: "Yes",
            ratioCalc: "spot",
            prefIndex: "204Pb",
            weightedMeans: "false",
            defaultCommon: "something",
            physConstant: "somethingElse",
            minSigPbU: .8,
            minSigPbTh: .75,
        };
        //If a component requires 'this.' context, it's easiest to bind it, i.e.
        this.handleChange = this.handleChange.bind(this)
        this.pbCounterUp = this.pbCounterUp.bind(this)
        this.pbCounterDown = this.pbCounterDown.bind(this)
        this.thCounterUp = this.thCounterUp.bind(this)
        this.thCounterDown = this.thCounterDown.bind(this)
    }
    handleChange = (event) => {
        switch(event.target.name) {
            case "SBM":
                this.setState({sbmVal: event.target.value});
                break;
            case "ratioCalc":
                this.setState({ratioCalc: event.target.value});
                break;
            case "prefIndex":
                this.setState({prefIndex: event.target.value});
                break;
            case "weightedMeans":
                if(this.state.weightedMeans == "true") {
                    this.setState({weightedMeans: "false"})
                }
                else {
                    this.setState({weightedMeans: "true"})
                }
                break;
            case "defaultCommonSelect":
                this.setState({defaultCommon: event.target.value})
                break;
            case "physConstant":
                this.setState({physConstant: event.target.value})
                break;

        }
    }
    //Can't resolve event by name because internal spans of buttons are unnamed
    pbCounterUp() {
        this.setState({minSigPbU: this.state.minSigPbU + .01})
    }
    pbCounterDown() {
        this.setState({minSigPbU: this.state.minSigPbU - .01})
    }
    thCounterUp() {
        this.setState({minSigPbTh: this.state.minSigPbTh + .01})
    }
    thCounterDown() {
        this.setState({minSigPbTh: this.state.minSigPbTh - .01})
    }

    render() {
        return (
        <div className={cx('container-custom')}>
            <div className={cx('body')}>
                <div className={cx('content')} style={{display: 'flex', overflow: 'hidden'}}>
                    <div className={cx('header-custom', 'panel-custom')} style={{position: 'absolute', top: '40'}}>
                        <div className="rownav" style={{display: 'flex'}}>
                            <DropdownCustom dropdownName = "Project" dropdownOptions = {dropdownOptions[0]}></DropdownCustom>
                            <DropdownCustom dropdownName = "Data" dropdownOptions = {dropdownOptions[1]}></DropdownCustom>
                            <DropdownCustom dropdownName = "Task" dropdownOptions = {dropdownOptions[2]}></DropdownCustom>
                            <DropdownCustom dropdownName = "Isotopes" dropdownOptions = {dropdownOptions[3]}></DropdownCustom>
                            <DropdownCustom dropdownName = "Expressions" dropdownOptions = {dropdownOptions[4]}></DropdownCustom>
                            <DropdownCustom dropdownName = "Common Pb" dropdownOptions = {dropdownOptions[5]}></DropdownCustom>
                            <DropdownCustom dropdownName = "Interpretations" dropdownOptions = {dropdownOptions[6]}></DropdownCustom>
                            <DropdownCustom dropdownName = "Reports" dropdownOptions = {dropdownOptions[7]}></DropdownCustom>
                            <DropdownCustom dropdownName = "Archiving" dropdownOptions = {dropdownOptions[8]}></DropdownCustom>
                            <DropdownCustom dropdownName = "Parameter" dropdownOptions = {dropdownOptions[9]}></DropdownCustom>
                            <DropdownCustom dropdownName = "About" dropdownOptions = {dropdownOptions[10]}></DropdownCustom>
                        </div>
                    </div>

                    <div className={cx('grid-container-custom')}>
                        <div className={cx('project-name-label')}>
                            <h3>Project Name:</h3>
                        </div>
                        <div className={cx('project-file-label')}>
                            <h3>Project File:</h3>
                        </div>
                        <div className={cx('data-file-label')}>
                            <h3>Data File:</h3>
                        </div>
                        <div className={cx('software-label')}>
                            <h3>Software:</h3>
                        </div>
                        <div className={cx('parameters-label')}>
                            <h3>Parameters:</h3>
                            <Button variant="contained" color={"primary"} style={{float: "right"}}>
                                Set Defaults
                            </Button>
                        </div>
                        <div className={cx('session-label')}>
                            <h3>Session:</h3>
                        </div>
                        <div className={cx('analyst-name-label')}>
                            <h3>Analyst Name:</h3>
                        </div>
                        <div className={cx('project-name-text')}>
                            <TextField defaultValue={"placeholderValue.squid"}style={{width: '100%'}}/>
                        </div>
                        <div className={cx('analyst-name-text')}>
                            <TextField defaultValue={"Name Here"}style={{width: '100%'}}/>
                        </div>
                        <div className={cx('project-file-text')}>
                            <TextField value={"C:/User/hard/set/route/project.squid"}style={{width: '100%'}}/>
                        </div>
                        <div className={cx('data-file-text')}>
                            <TextField value={"C:/User/some/other/hard/set/route/with.xml"}style={{width: '100%'}}/>
                        </div>
                        <div className={cx('software-text')}>
                            <h4 style={{color: "#000000 !important"}}>Version: some stuff here</h4>
                        </div>
                        <div className={cx('parameters-content1')}>
                            <p style={{color: "#000000 !important", display: "inline", paddingRight: "3%"}}> Normalize Ion Counts for SBM?</p>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="SBM" name="SBM" value={this.state.sbmVal} onChange={this.handleChange} style={{display: "inline"}}>
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes"/>
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className={cx('parameters-content2')}>
                            <p style={{color: "#000000 !important", display: "inline", paddingRight: "3%"}}>Ratio Calculation Method:</p>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="ratioCalc" name="ratioCalc" value={this.state.ratioCalc} onChange={this.handleChange} style={{display: "inline"}}>
                                    <FormControlLabel value="linear" control={<Radio />} label="Linear regression to burn mid-time"/>
                                    <FormControlLabel value="spot" control={<Radio />} label="Spot Average (time-invariant)" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className={cx('parameters-content3')}>
                            <p style={{color: "#000000 !important", display: "inline", paddingRight: "3%"}}>Preferred index isotope:</p>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="prefIndex" name="prefIndex" value={this.state.prefIndex} onChange={this.handleChange} style={{display: "inline"}}>
                                    <FormControlLabel value="204Pb" control={<Radio />} label="204Pb"/>
                                    <FormControlLabel value="207Pb" control={<Radio />} label="207Pb" />
                                    <FormControlLabel value="208Pb" control={<Radio />} label="208Pb" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className={cx('parameters-content4')}>
                            <p style={{color: "#000000 !important", display: "inline", paddingRight: "3%"}}>Weighted Means of Ret Mat:</p>
                            <FormControl component="fieldset">
                                    <FormControlLabel value="true" control={<Checkbox checked={this.state.weightedMeans == "true" ? true : false} onChange={this.handleChange}/>}
                                                      name="weightedMeans" label="Allow Squid to auto-reject spots"/>
                            </FormControl>
                            <p style={{display: "inline"}}><b>Minimum external 1sigma % err for 206Pb/238U: </b></p>
                            <TextField value={this.state.minSigPbU} style={{width: "4ch", marginLeft: "1%"}}></TextField>
                            <ButtonGroup orientation="vertical" style={{maxHeight: "15px"}}>
                                <Button  style={{maxHeight: "15px"}}name="incPbU" onClick={this.pbCounterUp}>+</Button>
                                <Button  style={{maxHeight: "15px"}}name="decPbU" onClick={this.pbCounterDown}>-</Button>
                            </ButtonGroup>
                            <p style={{display: "inline", marginLeft: "1%"}}><b>for 208Pb/232Th: </b></p>
                            <TextField value={this.state.minSigPbTh} style={{width: "4ch", marginLeft: "1%"}}></TextField>
                            <ButtonGroup orientation="vertical" style={{maxHeight: "15px"}}>
                                <Button  style={{maxHeight: "15px"}}name="incPbTh" onClick={this.thCounterUp}>+</Button>
                                <Button  style={{maxHeight: "15px"}}name="decPbTh" onClick={this.thCounterDown}>-</Button>
                            </ButtonGroup>

                        </div>
                        <div className={cx('parameters-content5')}>
                            <p style={{color: "#000000 !important", display: "inline", paddingRight: "3%", float: "left"}}>Parameter Models:</p>
                            <p color={"#f59542"} style={{ display: "inline"}}>Specify Default Common Pb Model:</p>
                            <FormControl style={{minWidth: "50%", float: "right", right: "32%", clear: "both"}}>
                                <Select
                                    labelId="defaultCommonSelect-label"
                                    id="defaultCommonSelect"
                                    name="defaultCommonSelect"
                                    value={this.state.defaultCommon}
                                    onChange={this.handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={cx('parameters-content6')}>
                            <p color={"#f59542"} style={{ display: "inline", float: "left"}}>Specify Physical Constants Model:</p>
                            <FormControl style={{minWidth: "60%", clear: "both", paddingRight: "3%"}}>
                                <Select
                                    labelId="physConstant-label"
                                    id="physConstant"
                                    name="physConstant"
                                    value={this.state.physConstant}
                                    onChange={this.handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color={"primary"}>
                                Refresh Models
                            </Button>
                        </div>
                        <div className={cx('notes-label')}>
                            <h3>Notes:</h3>
                        </div>
                        <div className={cx('notes-content')}>
                            <TextField label="Notes" placeholder="Notes" multiline rows={16} fullWidth={true}></TextField>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     )

    }

}
export default connect()(SkeletonExample);