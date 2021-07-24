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
import axios from "axios";
import {FILEBROWSER_URL, SQUIDINK_ENDPOINT} from "constants/api";
import ResizePanel from "./ResizePanel";
import ReactLoading from "react-loading";
import WrapperComponent from "./WrapperComponent";

let cx = classNames.bind(style);

export class ManageProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //State-initializer, initialize state vars here for reference from html
            projectName: "placeholder",
            analystName: "placeholder",
            sbmVal: "Yes",
            ratioCalc: "spot",
            prefIndex: "204Pb",
            weightedMeans: "false",
            defaultCommon: "something",
            physConstant: "somethingElse",
            minSigPbU: .8,
            minSigPbTh: .75,
            version: "",
            dataFilePath: "",
            notes: "",
            pbArr: [],
            physArr: [],
            showfbr: true,
            loading: false,
            modalOpen: false,
            adragging: false,
            mount: false
        };
        //If a component requires 'this.' context, it's easiest to bind it, i.e.
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.pbCounterUp = this.pbCounterUp.bind(this)
        this.pbCounterDown = this.pbCounterDown.bind(this)
        this.thCounterUp = this.thCounterUp.bind(this)
        this.thCounterDown = this.thCounterDown.bind(this)
        this.pullFromServ = this.pullFromServ.bind(this)
        this.updateProject = this.updateProject.bind(this)
        this.toggleFilebrowserFunc = this.toggleFilebrowserFunc.bind(this)
        this.hideinternal = this.hideinternal.bind(this);
        this.showinternal = this.showinternal.bind(this);
        this.handClose = this.handClose.bind(this);
        this.openAction = this.openAction.bind(this);
    }

    async componentDidMount() {
        this.pullFromServ();

        window.addEventListener('message', (e) => {
            let apiCheck = e.data.toString().split(':');
            if (e.origin == FILEBROWSER_URL) {
                if (e.data.toString().length != 0 && apiCheck[0] != "api") {
                    this.setState({loading: true})
                    axios.post(SQUIDINK_ENDPOINT + '/OpenServlet/O', localStorage.getItem("user")
                        + ":" + e.data, {
                        headers: {
                            'Content-Type': 'text/plain'
                        }
                    }).then(() => {
                        this.setState({showfbr: false});
                        this.setState({loading: false});
                        localStorage.setItem("profileFilePath", e.data);
                        location.reload();

                    }).catch((er) => {
                        console.log(er)
                        this.setState({loading: false});
                    })
                } else if (apiCheck[0] == "api") {
                    localStorage.setItem("user", apiCheck[1]);
                    axios.post(SQUIDINK_ENDPOINT + '/api', apiCheck[1], {
                        headers: {
                            'Content-Type': 'text/plain'
                        }
                    })
                }
            }

        }, false)

    }

    handleChange = (event) => {
        switch (event.target.name) {
            case "SBM":
                this.setState({sbmVal: event.target.value});
                setTimeout(() => {
                    this.updateProject("SBM")
                }, 200)
                break;
            case "ratioCalc":
                this.setState({ratioCalc: event.target.value});
                this.updateProject("ratioCalc")
                break;
            case "prefIndex":
                this.setState({prefIndex: event.target.value});
                setTimeout(() => {
                    this.updateProject("PrefIso")
                }, 200)
                break;
            case "weightedMeans":
                if (this.state.weightedMeans == "true") {
                    this.setState({weightedMeans: "false"})
                } else {
                    this.setState({weightedMeans: "true"})
                }
                setTimeout(() => {
                    this.updateProject("autoExclude")
                }, 200)
                break;
            case "defaultCommonSelect":
                this.setState({defaultCommon: event.target.value})
                setTimeout(() => {
                    this.updateProject("defaultCommonSelect")
                }, 200)
                break;
            case "physConstant":
                this.setState({physConstant: event.target.value})
                setTimeout(() => {
                    this.updateProject("physConstant")
                }, 200)
                break;

        }
    }

    //Can't resolve event by name because internal spans of buttons are unnamed
    pbCounterUp() {
        this.setState({minSigPbU: this.state.minSigPbU + .01})
        setTimeout(() => {
            this.updateProject("minSigPbU")
        }, 200)
    }

    pbCounterDown() {
        this.setState({minSigPbU: this.state.minSigPbU - .01})
        setTimeout(() => {
            this.updateProject("minSigPbU")
        }, 200)
    }

    thCounterUp() {
        this.setState({minSigPbTh: this.state.minSigPbTh + .01})
        setTimeout(() => {
            this.updateProject("minSigPbTh")
        }, 200)
    }

    thCounterDown() {
        this.setState({minSigPbTh: this.state.minSigPbTh - .01})
        setTimeout(() => {
            this.updateProject("minSigPbTh")
        }, 200)
    }

    pullFromServ() {
        axios.post(SQUIDINK_ENDPOINT + '/pmpull', localStorage.getItem("user"), {
            headers: {
                'Content-Type': 'text/plain'
            }
        }).then((body) => {
            let arr = body.data.split('~!@')
            this.setState({projectName: arr[0]})
            this.setState({analystName: arr[1]})
            if (arr[2] == "true") {
                this.setState({sbmVal: "Yes"})
            } else {
                this.setState({sbmVal: "No"})
            }
            if (arr[3] == "true") {
                this.setState({ratioCalc: "linear"})
            } else {
                this.setState({ratioCalc: "spot"})
            }
            if (arr[4].charAt(arr[4].length - 1) == '4') {
                this.setState({prefIndex: "204Pb"})
            } else if (arr[4].charAt(arr[4].length - 1) == '7') {
                this.setState({prefIndex: "207Pb"})
            } else {
                this.setState({prefIndex: "208Pb"})
            }
            this.setState({minSigPbU: arr[6]})
            this.setState({minSigPbTh: arr[7]})
            this.setState({version: arr[12]})
            this.setState({dataFilePath: arr[13]})
            this.setState({notes: arr[11]})
            this.setState({weightedMeans: arr[5].toString()})
            this.setState({defaultCommon: arr[8]})
            this.setState({physConstant: arr[9]})
            this.setState({pbArr: arr[14].split('\*\&\^')})
            this.setState({physArr: arr[15].split('\*\&\^')})
            this.setState({mount: true})
            console.log(arr)
        }).catch(() => {
        })
    }

    toggleFilebrowserFunc() {
        let func = () => {
            this.setState({showfbr: !this.state.showfbr})
        }
        let out = [{
            title: 'Toggle Filebrowser',
            onclick: func,
            id: 34
        }]
        return out;
    }

    projectNameFilterandUpdate(event) {
        axios.post(SQUIDINK_ENDPOINT + '/pmset', localStorage.getItem("user") + ":" + "projectName" + ":" + event.target.value, {
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    }

    analystNameUpdate(event) {
        axios.post(SQUIDINK_ENDPOINT + '/pmset', localStorage.getItem("user") + ":" + "analystName" + ":" + event.target.value, {
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    }

    notesUpdate(event) {
        axios.post(SQUIDINK_ENDPOINT + '/pmset', localStorage.getItem("user") + ":" + "notes" + ":" + event.target.value, {
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    }

    updateProject(updateType) {
        switch (updateType) {
            case "SBM":
                let str = "";
                this.state.sbmVal == "Yes" ? str = "true" : str = "false"
                axios.post(SQUIDINK_ENDPOINT + '/pmset', localStorage.getItem("user") + ":" + "SBM" + ":" + str, {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                })
                break;
            case "ratioCalc":
                str = "";
                this.state.ratioCalc == "spot" ? str = "true" : str = "false"
                console.log(str);
                axios.post(SQUIDINK_ENDPOINT + '/pmset', localStorage.getItem("user") + ":" + "LinFit" + ":" + str, {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                })
                break;
            case "PrefIso":
                str = "";
                if (this.state.prefIndex == "204Pb") {
                    str = "204Pb"
                } else if (this.state.prefIndex == "207Pb") {
                    str = "207Pb"
                } else {
                    str = "208Pb"
                }
                axios.post(SQUIDINK_ENDPOINT + '/pmset', localStorage.getItem("user") + ":" + "PrefIso" + ":" + str, {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                })
                break;
            case "autoExclude":
                str = "";
                str = this.state.weightedMeans;
                axios.post(SQUIDINK_ENDPOINT + '/pmset', localStorage.getItem("user") + ":" + "autoExclude" + ":" + str, {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                })
                break;
            case "minSigPbU":
                let out = this.state.minSigPbU;
                axios.post(SQUIDINK_ENDPOINT + '/pmset', localStorage.getItem("user") + ":" + "minSig206" + ":" + out, {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                })
                break;
            case "minSigPbTh":
                out = this.state.minSigPbTh
                axios.post(SQUIDINK_ENDPOINT + '/pmset', localStorage.getItem("user") + ":" + "minSig208" + ":" + out, {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                })
                break;
            case "defaultCommonSelect":
                str = this.state.defaultCommon;
                axios.post(SQUIDINK_ENDPOINT + '/pmset', localStorage.getItem("user") + ":" + "commonPb" + ":" + str, {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                })
                break;
            case "physConstant":
                str = this.state.physConstant;
                axios.post(SQUIDINK_ENDPOINT + '/pmset', localStorage.getItem("user") + ":" + "physConstant" + ":" + str, {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                })
                break;
            case "setDefaultParam":
                axios.post(SQUIDINK_ENDPOINT + '/pmset', localStorage.getItem("user") + ":" + "setDefaultParam", {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                })
                break;
            case "refreshModel":
                axios.post(SQUIDINK_ENDPOINT + '/pmset', localStorage.getItem("user") + ":" + "refreshModel", {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                })
                break;
        }
    }

    async handClose() {
        this.setState({modalOpen: false})
    }

    async hideinternal() {
        this.setState({adragging: true})
    }

    async showinternal() {
        this.setState({adragging: false})
    }

    async openAction() {
        this.setState({modalOpen: true})
    }

    toggleFilebrowserFunc() {
        let func = () => {
            this.setState({showfbr: !this.state.showfbr})
        }
        let out = [{
            title: 'Toggle Filebrowser',
            onclick: func,
            id: 34
        }]
        return out;
    }
    render() {
        return (
            <>
                {
                    //Dont generate elements until project management pull is complete for defaultVal generation
                    this.state.mount ?
                        <WrapperComponent style={{overflow: "scroll"}}openAction={this.openAction} isLoading={this.state.loading} modalOpen={this.state.modalOpen} handClose={this.handClose}
                                          hideinternal={this.hideinternal} showinternal={this.showinternal} toggleFilebrowserFunc={this.toggleFilebrowserFunc()} showfbr={this.state.showfbr}>
                            <div className={cx('grid-container-custom')} >
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
                                    <div style={{padding: "10px"}}>
                                        <Button variant="contained" color={"primary"} style={{float: "right"}}
                                                onClick={() => this.updateProject("setDefaultParam")}>
                                            Set Defaults
                                        </Button>
                                    </div>
                                </div>
                                <div className={cx('refresh-button')} style={{padding: "10px"}}>
                                    <Button variant="contained" color={"primary"} style={{float: "right"}}
                                            onClick={() => this.updateProject("refreshModel")}>
                                        Refresh Models
                                    </Button>
                                </div>
                                <div className={cx('session-label')}>
                                    <h3>Session:</h3>
                                </div>
                                <div className={cx('analyst-name-label')}>
                                    <h3>Analyst Name:</h3>
                                </div>
                                <div className={cx('project-name-text')}>
                                    <TextField defaultValue={this.state.projectName}
                                               onChange={this.projectNameFilterandUpdate}
                                               style={{width: '100%'}}/>
                                </div>
                                <div className={cx('analyst-name-text')}>
                                    <TextField onChange={this.analystNameUpdate} defaultValue={this.state.analystName}
                                               style={{width: '100%'}}/>
                                </div>
                                <div className={cx('project-file-text')}>
                                    <h5 style={{color: "#000000 !important"}}>{localStorage.getItem("user") + localStorage.getItem("profileFilePath")}</h5>
                                </div>
                                <div className={cx('data-file-text')}>
                                    <h5 style={{color: "#000000 !important"}}>{this.state.dataFilePath}</h5>
                                </div>
                                <div className={cx('software-text')}>
                                    <h4 style={{color: "#000000 !important"}}>{this.state.version}</h4>
                                </div>
                                <div className={cx('parameters-content1')}>
                                    <p style={{
                                        color: "#000000 !important",
                                        display: "inline",
                                        paddingRight: "3%"
                                    }}> Normalize Ion Counts for SBM?</p>
                                    <FormControl component="fieldset">
                                        <RadioGroup aria-label="SBM" name="SBM" value={this.state.sbmVal}
                                                    onChange={this.handleChange}
                                                    style={{display: "inline"}}>
                                            <FormControlLabel value="Yes" control={<Radio/>} label="Yes"/>
                                            <FormControlLabel value="No" control={<Radio/>} label="No"/>
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className={cx('parameters-content2')}>
                                    <p style={{
                                        color: "#000000 !important",
                                        display: "inline",
                                        paddingRight: "3%"
                                    }}>Ratio Calculation Method:</p>
                                    <FormControl component="fieldset">
                                        <RadioGroup aria-label="ratioCalc" name="ratioCalc"
                                                    value={this.state.ratioCalc}
                                                    onChange={this.handleChange}
                                                    style={{display: "inline"}}>
                                            <FormControlLabel value="linear" control={<Radio/>}
                                                              label="Linear regression to burn mid-time"/>
                                            <FormControlLabel value="spot" control={<Radio/>}
                                                              label="Spot Average (time-invariant)"/>
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className={cx('parameters-content3')}>
                                    <p style={{
                                        color: "#000000 !important",
                                        display: "inline",
                                        paddingRight: "3%"
                                    }}>Preferred index isotope:</p>
                                    <FormControl component="fieldset">
                                        <RadioGroup aria-label="prefIndex" name="prefIndex"
                                                    value={this.state.prefIndex}
                                                    onChange={this.handleChange}
                                                    style={{display: "inline"}}>
                                            <FormControlLabel value="204Pb" control={<Radio/>}
                                                              label="204Pb"/>
                                            <FormControlLabel value="207Pb" control={<Radio/>}
                                                              label="207Pb"/>
                                            <FormControlLabel value="208Pb" control={<Radio/>}
                                                              label="208Pb"/>
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className={cx('parameters-content4')}>
                                    <p style={{
                                        color: "#000000 !important",
                                        display: "inline",
                                        paddingRight: "3%"
                                    }}>Weighted Means of Ret Mat:</p>
                                    <FormControl component="fieldset">
                                        <FormControlLabel value="true" control={<Checkbox
                                            checked={this.state.weightedMeans == "true" ? true : false}
                                            onChange={this.handleChange}/>}
                                                          name="weightedMeans"
                                                          label="Allow Squid to auto-reject spots"/>
                                    </FormControl>
                                    <p style={{display: "inline"}}><b>Minimum external 1sigma % err for
                                        206Pb/238U: </b></p>
                                    <TextField value={this.state.minSigPbU}
                                               style={{width: "4ch", marginLeft: "1%"}}></TextField>
                                    <ButtonGroup orientation="vertical" style={{maxHeight: "15px"}}>
                                        <Button style={{maxHeight: "15px"}} name="incPbU"
                                                onClick={this.pbCounterUp}>+</Button>
                                        <Button style={{maxHeight: "15px"}} name="decPbU"
                                                onClick={this.pbCounterDown}>-</Button>
                                    </ButtonGroup>
                                    <p style={{display: "inline", marginLeft: "1%"}}><b>for
                                        208Pb/232Th: </b></p>
                                    <TextField value={this.state.minSigPbTh}
                                               style={{width: "4ch", marginLeft: "1%"}}></TextField>
                                    <ButtonGroup orientation="vertical" style={{maxHeight: "15px"}}>
                                        <Button style={{maxHeight: "15px"}} name="incPbTh"
                                                onClick={this.thCounterUp}>+</Button>
                                        <Button style={{maxHeight: "15px"}} name="decPbTh"
                                                onClick={this.thCounterDown}>-</Button>
                                    </ButtonGroup>

                                </div>
                                <div className={cx('parameters-content5')}>
                                    <p style={{
                                        color: "#000000 !important",
                                        display: "inline",
                                        paddingRight: "3%",
                                        float: "left"
                                    }}>Parameter Models:</p>
                                    <p color={"#f59542"} style={{display: "inline"}}>Specify Default Common
                                        Pb Model:</p>
                                    <FormControl style={{
                                        minWidth: "50%",
                                        float: "right",
                                        right: "32%",
                                        clear: "both"
                                    }}>
                                        <Select
                                            labelId="defaultCommonSelect-label"
                                            id="defaultCommonSelect"
                                            name="defaultCommonSelect"
                                            value={this.state.defaultCommon}
                                            onChange={this.handleChange}
                                            style={{
                                                backgroundColor: "#d3d3d3"
                                            }}
                                        >
                                            {
                                                this.state.pbArr.map(item => {
                                                    return (
                                                        <MenuItem value={item}>{item}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className={cx('parameters-content6')}>
                                    <p color={"#f59542"} style={{display: "inline", float: "left"}}>Specify
                                        Physical Constants Model:</p>
                                    <FormControl
                                        style={{minWidth: "60%", clear: "both", paddingRight: "3%"}}>
                                        <Select
                                            labelId="physConstant-label"
                                            id="physConstant"
                                            name="physConstant"
                                            value={this.state.physConstant}
                                            onChange={this.handleChange}
                                            style={{
                                                backgroundColor: "#d3d3d3"
                                            }}
                                        >
                                            {
                                                this.state.physArr.map(item => {
                                                    return (
                                                        <MenuItem value={item}>{item}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className={cx('notes-label')}>
                                    <h3>Notes:</h3>
                                </div>
                                <div className={cx('notes-content')}>
                                    <TextField label="" defaultValue={this.state.notes}
                                               InputLabelProps={{shrink: false}} onChange={this.notesUpdate} multiline rows={8}
                                               fullWidth={true} style={{
                                        backgroundColor: "#d3d3d3"
                                    }}></TextField>
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

                }
            </>

        )

    }

}

export default connect()(ManageProject);