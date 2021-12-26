import React from 'react';
import style from 'styles/Squidink/TaskLibrary.scss';
import classNames from 'classnames/bind';
import "constants/api";
import {connect} from "react-redux";
import WrapperComponent from "./WrapperComponent";
import {requestSender} from "../util/constants";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";

let cx = classNames.bind(style);

export class TaskLibrary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //State-initializer, initialize state vars here for reference from html
            mount: false,
            taskName: "",
            taskDesc: "",
            taskAuthor: "",
            taskLab: "",
            taskProv: "",
            taskParentNuc: "",
            taskDirect: "",
            audit: "",
            primaryRadio: "232",
            secondaryRadio: "direct",
            Uncor206: "",
            Uncor208: "",
            THU: "",
            ParEle: "",
            Uncor206Styling: true,
            Uncor208Styling: true,
            THUStyling: true,
            ParEleStyling: true,
            taskList: [],
            selectedTask: null,

        };
        //If a component requires 'this.' context, it's easiest to bind it, i.e.
        this.pullTaskList = this.pullTaskList.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)

    }
    componentDidMount() {
        this.pullTaskList()
    }
    pullTaskList() {
        return requestSender('/tasklibrary', localStorage.getItem('user')).then((response) => {
            let body = response.data.substring(1, response.data.length - 1).split(',')
            console.log(body)
            this.setState({mount: true, taskList: body})
            //this.setState({
            //    taskName: body[0],
            //    taskDesc: body[1],
            //    taskAuthor: body[2],
            //    taskLab: body[3],
            //    taskProv: body[4],
            //    primaryRadio: body[5].toString().trim(),
            //    secondaryRadio: body[6].trim(),
            //    Uncor206: body[7],
            //    Uncor208: body[8],
            //    THU: body[9],
            //    ParEle: body[10],
            //    Uncor206Styling: eval(body[11].trim()),
            //    Uncor208Styling: eval(body[12].trim()),
            //    THUStyling: eval(body[13].trim()),
            //    ParEleStyling: eval(body[14].trim()),
            //})
            //requestSender('/curtaskaudit', localStorage.getItem('user')).then((response) => {
            //    let body = response.data.replace("�", "±").replace("�","±")
            //    this.setState({audit: body, mount: true})
            //})
        })
    }

    saveStrings = () => {
        let bodyData = localStorage.getItem("user") + "!@#" + this.state.taskName + "!@#" + this.state.taskDesc + "!@#" + this.state.taskAuthor + "!@#" +
            this.state.taskLab + "!@#" + this.state.taskProv + "!@#" + this.state.primaryRadio + "!@#" + this.state.secondaryRadio
        requestSender('/settaskstrings', bodyData).then((r) => {
            this.pullStrings().then(() => {
                this.changeBoxStyling()
            })

        })
    }

    changeBoxStyling = () => {
        document.getElementsByClassName("uncor-uranium-box")[0].style.backgroundColor = (this.state.Uncor206Styling ? "#00FF0033" : "#ff00004d")
        document.getElementsByClassName("uncor-thor-box")[0].style.backgroundColor = (this.state.Uncor208Styling ? "#00FF0033" : "#ff00004d")
        document.getElementsByClassName("thor-ur-box")[0].style.backgroundColor = (this.state.THUStyling ? "#00FF0033" : "#ff00004d")
        document.getElementsByClassName("p-ele-const-box")[0].style.backgroundColor = (this.state.ParEleStyling ? "#00FF0033" : "#ff00004d")
    }

    taskListSelect = (e) => {
        if(this.state.selectedTask) {
            document.getElementById(this.state.selectedTask).style.backgroundColor = ""
        }
        this.setState({selectedTask: e.target.id})
        document.getElementById(e.target.id).style.backgroundColor = "#4982F4"
    }

    render() {
        return (
            this.state.mount ?
                //All functions are self-contained to the wrapper with the exception of the history.push to reroute the user, which requires a reference to the React-Router
                //Because WrapperComponent is not instantiated from the router but from its child, we have to pass in the history as a prop
                <WrapperComponent stateNum={1}history={this.props.history}>
                    <div className={cx('grid-container-custom-tl')}>
                        <div className={cx('task-list')}>
                            {this.state.taskList.map((entry) => {
                                return (
                                    <div id={entry.trimStart().trim()}onClick={this.taskListSelect} className={cx('task-list-item')}>
                                        {entry.trimStart().trim()}
                                    </div>
                                )
                            })}
                        </div>
                        <div className={cx('task-info')}>
                            <div className={cx('task-name-label-t')}>
                                <h5>Task Name:</h5>
                            </div>
                            <div className={cx('task-name-text-t')}>
                                <TextField style={{width: "75%"}} defaultValue={this.state.taskName} disabled={true}></TextField>
                                <div style={{display: "inline", paddingLeft: "50px", paddingTop: "10px"}}>
                                    <h5 className={cx('geochron-text')} style={{display: "inline", color: "#ff9800 !important"}}>GEOCHRON</h5>
                                </div>
                            </div>
                            <div className={cx('description-label-t')}>
                                <h5>Description:</h5>
                            </div>
                            <div className={cx('description-text-t')}>
                                <TextField style={{width: "100%"}} defaultValue={this.state.taskDesc} disabled={true}></TextField>
                            </div>
                            <div className={cx('author-lab-label-t')}>
                                <h5>Author & Lab:</h5>
                            </div>
                            <div className={cx('author-name-text-t')}>
                                <TextField style={{width: "100%"}} defaultValue={this.state.taskDesc} disabled={true}></TextField>
                            </div>
                            <div className={cx('lab-name-label-t')}>
                                <h5>Lab Name:</h5>
                            </div>
                            <div className={cx('lab-name-text-t')}>
                                <TextField style={{width: "75%"}} defaultValue={this.state.taskDesc} disabled={true}></TextField>
                            </div>
                            <div className={cx('provenance-label-t')}>
                                <h5>Provenance:</h5>
                            </div>
                            <div className={cx('provenance-text-t')}>
                                <TextField style={{width: "100%"}} defaultValue={this.state.taskDesc} disabled={true}></TextField>
                            </div>
                            <div className={cx('directives-label-t')}>
                                <h5>Directives:</h5>
                            </div>
                            <div className={cx('directives-content-t')}>
                                <div className={cx('directives-internal-grid')}>
                                    <p className={cx('pd-ratio')}>Primary daughter / parent ratio:</p>
                                        <div className={cx('pd-ratio-content')}>
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    row
                                                    aria-label="primary-radio"
                                                    name="controlled-radio-buttons-group"
                                                    value={this.state.primaryRadio}
                                                    onChange={() => {}}
                                                >
                                                    <FormControlLabel disabled={this.state.primaryRadio == "238" ? false: true}value="238" control={<Radio />} label="206Pb/238U" />
                                                    <FormControlLabel disabled={this.state.primaryRadio == "232" ? false: true}value="232" control={<Radio />} label="208Pb/232Th" />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                        <div className={cx('spd-ratio-content')}>
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    row
                                                    aria-label="primary-radio"
                                                    name="controlled-radio-buttons-group"
                                                    value={this.state.secondaryRadio}
                                                    onChange={() => {}}
                                                >
                                                    <FormControlLabel disabled={this.state.secondaryRadio == "direct" ? false: true}value="direct" control={<Radio />} label="Directly" />
                                                    <FormControlLabel disabled={this.state.secondaryRadio == "indirect" ? false: true}value="indirect" control={<Radio />} label="Indirectly" />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>

                                    <p className={cx('value-206238')}>Uncor_206Pb238U_CalibConst:</p>

                                    <div className={cx('generic-box box-206238')}/>

                                    <p className={cx('value-208232')}>Uncor_208Pb232Th_CalibConst:</p>

                                    <div className={cx('generic-box box-208232')}/>

                                    <p className={cx('sdp-ratio')}>Calculate secondary d/p ratio:</p>


                                    <p className={cx('value-232238')}>232Th238U_RM:</p>

                                    <div className={cx('generic-box  box-232238')}/>

                                    <p className={cx('value-parele')}>ParentElement_ConcenConst:</p>

                                    <div className={cx('generic-box box-parele')}/>

                                </div>
                            </div>
                            <div className={cx('mass-label-t')}>
                                <h5>Mass Labels:</h5>
                            </div>
                            <div className={cx('mass-box-t')}/>
                            <div className={cx('mass-box-grey-t')}/>


                            <div className={cx('ratio-label-t')}>
                                <h5>Ratios:</h5>
                            </div>

                            <div className={cx('ratio-box-t')}/>
                            <div className={cx('ratio-box-grey-t')}/>

                            <div className={cx('custom-exp-label-t')}>
                                <h5>Custom Exp:</h5>
                            </div>

                            <div className={cx('custom-exp-box-t')}/>

                            <div className={cx('actions-label-t')}>
                                <h5>Actions:</h5>
                            </div>
                            <div className={cx('actions-content')}>
                                <div style={{paddingRight: "10px",display: "inline"}}>
                                    <Button variant="contained" color={"primary"}
                                            onClick={() => {console.log("")}}>
                                        Edit Task
                                    </Button>
                                </div>
                                <Button variant="contained" color={"primary"} style={{display: "inline"}}
                                        onClick={() => {console.log("")}}>
                                    Save Current Task as a Squid3 Task '.xml' file
                                </Button>
                            </div>
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

export default connect()(TaskLibrary);

