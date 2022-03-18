import React from 'react';
import style from 'styles/Squidink/TaskLibrary.scss';
import classNames from 'classnames/bind';
import "constants/api";
import {connect} from "react-redux";
import WrapperComponent from "./WrapperComponent";
import {BASE_ROUTE, requestSender} from "../util/constants";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import {FILEBROWSER_URL} from "constants/api";

let cx = classNames.bind(style);

export class CustomLibrary extends React.Component {
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
            audit: ["List of Custom Expression Names: "],
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
            mass: [],
            ratios: [],
            selected: false,
            modal: false,
            routeVal: "",

        };
        //If a component requires 'this.' context, it's easiest to bind it, i.e.
        this.pullTaskList = this.pullTaskList.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.saveCurrentXML = this.saveCurrentXML.bind(this)
        this.modal = this.modal.bind(this)
        this.closeBrowseAction = this.closeBrowseAction.bind(this)

    }
    componentDidMount() {
        this.pullTaskList()
    }
    pullTaskList() {
        return requestSender('/tasklibrary', localStorage.getItem('user') + ":" + localStorage.getItem("selected")).then((response) => {
            let body = response.data.substring(1, response.data.length - 1).split(',')
            this.setState({mount: true, taskList: body}, () => {this.taskListSelect(null, this.state.taskList[0].trimStart().trim())})
        })
    }
    saveCurrentXML(fileRoute) {

        //Pulls Filebrowser route from WrapperComponent, trims off everything from /files/ and before to get the raw path
       let presentRoute = localStorage.getItem("fborigin")
       //If present route has a legitimate value, concat with filename, otherwise just leave filename raw
       let finalRoute = presentRoute ? presentRoute + this.state.routeVal + ".xml" : this.state.routeVal + ".xml"
       requestSender('savexml', localStorage.getItem('user') + ":" + finalRoute).then((response) => {

       }).then(() => {
           this.closeBrowseAction();
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
    async modal() {
        this.setState({modal: true})
    }
    async closeBrowseAction() {
        this.setState({modal: false})
    }
    taskListSelect = (e, initialCall) => {
        if(this.state.selectedTask) {
            document.getElementById(this.state.selectedTask).style.backgroundColor = ""
        }
        let targetId;
        if(initialCall) {
            targetId = initialCall;
        } else {
            targetId = e.target.id
        }
        this.setState({selectedTask: targetId, selected: false})
        document.getElementById(targetId).style.backgroundColor = "#4982F4"
        requestSender('/tasklibrarydata', localStorage.getItem("user") + ":" + targetId + ":" + localStorage.getItem("selected")).then((data) => {
            data = data.data.split('\n')
            if(data[0] == "java.lang.NullPointerException"){
                window.location.href = BASE_ROUTE
            }

            if(data.length == 1) {
                data = data[0].split(',')
                //pulling mass and ratios
                let massArr = new Array();
                let ratioArr = new Array();
                let mass = true;
                for(let i = 7; i < data.length-4; i++) {
                    if(mass) {
                        if(data[i].includes('/')) {
                            mass = false;
                            ratioArr.push(data[i].trimStart().replace('[','').replace(']',''))
                        }
                        else {
                            massArr.push(data[i].trimStart().replace('[','').replace(']',''))
                        }
                    }
                    else {
                        ratioArr.push(data[i].trimStart().replace('[','').replace(']',''))
                    }

                }
                //console.log(data[data.length-4].trim().trimStart())

                this.setState({mass: massArr, ratios: ratioArr})
                this.setState({
                    taskName: data[0].substring(1),
                    taskDesc: data[1],
                    taskAuthor: data[2],
                    taskLab: data[3],
                    taskProv: data[4],
                    primaryRadio: data[5].toString().trim(),
                    secondaryRadio: data[6].trim(),
                    Uncor206: data[data.length-4].trim().trimStart(),
                    Uncor208: data[data.length-3].trim().trimStart(),
                    THU: data[data.length-2].trim().trimStart(),
                    ParEle: data[data.length-1].trim().trimStart(),
                    //    Uncor206Styling: eval(data[11].trim()),
                    //    Uncor208Styling: eval(data[12].trim()),
                    //    THUStyling: eval(data[13].trim()),
                    //    ParEleStyling: eval(data[14].trim()),
                    selected: true
                })
            }
            else {
                //Isolate name and description due to long-descrption
                let nameAndDesc = "";

                for(let i = 0; i < data.length - 1; i++) {
                    nameAndDesc += data[i];
                }
                nameAndDesc = nameAndDesc.split(',')
                let desc = "";
                for(let i = 1; i < nameAndDesc.length; i++) {
                    desc += nameAndDesc[i];
                }

                data = data[data.length-1].split(',');
                //pulling mass and ratios
                let massArr = new Array();
                let ratioArr = new Array();
                let mass = true;
                for(let i = 6; i < data.length-4; i++) {
                    if(mass) {
                        if(data[i].includes('/')) {
                            mass = false;
                            ratioArr.push(data[i].trimStart().replace('[','').replace(']',''))
                        }
                        else {
                            massArr.push(data[i].trimStart().replace('[','').replace(']',''))
                        }
                    }
                    else {
                        ratioArr.push(data[i].trimStart().replace('[','').replace(']',''))
                    }

                }
                this.setState({mass: massArr, ratios: ratioArr})
                //Generic Task stuff
                //console.log(data[data.length-4].trim().trimStart())
                this.setState({
                    taskName: nameAndDesc[0].substring(1),
                    taskDesc: desc,
                    taskAuthor: data[1],
                    taskLab: data[2],
                    taskProv: data[3],
                    primaryRadio: data[4].toString().trim(),
                    secondaryRadio: data[5].trim(),
                    Uncor206: data[data.length-4].trim().trimStart(),
                    Uncor208: data[data.length-3].trim().trimStart(),
                    THU: data[data.length-2].trim().trimStart(),
                    ParEle: data[data.length-1].trim().trimStart(),
                    selected: true
                })
            }
            this.state.Uncor206 != "Not Used" ?document.getElementsByClassName('box-206238')[0].style.border = "2px solid red" : ""
            this.state.Uncor208 != "Not Used" ?document.getElementsByClassName('box-208232')[0].style.border = "2px solid red":""
            this.state.THU != "Not Used" ?document.getElementsByClassName('box-232238')[0].style.border = "2px solid red":""
            this.state.ParEle != "Not Used" ?document.getElementsByClassName('box-parele')[0].style.border = "2px solid red":""
            this.generateMassLabels()
            this.generateRatios(localStorage.getItem("user") + ":" + targetId)
        }).catch((e) => {console.log(e)})
    }

    generateMassLabels = () => {
        let massBox = document.getElementById("massbox").getBoundingClientRect();
        let curX = 25
        for(let massVal in this.state.mass) {
            if(this.state.mass[massVal] == 204 || this.state.mass[massVal] == 206 || this.state.mass[massVal] == 207 || this.state.mass[massVal] == 208) {
                document.getElementById("massbox").innerHTML += `<svg style="height:${parseInt(massBox.height)}; width: 51px">
            <ellipse style="fill:#ff00004d; stroke: black; stroke-width: 1px"cx=${curX} cy=${massBox.height/2} rx=${25} ry=${Math.round(parseInt(massBox.height)/2)} />
            <text x=${curX} y=${massBox.height/2}
          text-anchor="middle" 
          stroke="black" 
          stroke-width="1px"
          font-size="14px" dy="5px">${this.state.mass[massVal]}</text>
            </svg>`
            }
            else if(this.state.mass[massVal] == 204.1) {
                document.getElementById("massbox").innerHTML += `<svg style="height:${parseInt(massBox.height)}; width: 51px">
            <ellipse style="fill: #00FF0033; stroke: black; stroke-width: 1px"cx=${curX} cy=${massBox.height/2} rx=${25} ry=${Math.round(parseInt(massBox.height)/2)} />
            <text x=${curX} y=${massBox.height/2}
          text-anchor="middle" 
          stroke="black" 
          stroke-width="1px"
          font-size="14px" dy="5px">${this.state.mass[massVal]}</text>
            </svg>`
            }
            else {
                document.getElementById("massbox").innerHTML += `<svg style="height:${parseInt(massBox.height)}; width: 51px">
            <ellipse style="fill:white; stroke: black; stroke-width: 1px"cx=${curX} cy=${massBox.height/2} rx=${25} ry=${Math.round(parseInt(massBox.height)/2)} />
            <text x=${curX} y=${massBox.height/2}
          text-anchor="middle" 
          stroke="black" 
          stroke-width="1px"
          font-size="14px" dy="5px">${this.state.mass[massVal]}</text>
            </svg>`
            }
        }
    }

    generateRatios = (customExpTarget) => {
        let massBox = document.getElementById("ratiobox").getBoundingClientRect();
        for(let ratioVal in this.state.ratios) {
            let splitRatio = this.state.ratios[ratioVal].split('/')
            if(splitRatio[0] == 204 && splitRatio[1] == 206 || splitRatio[0] == 207 && splitRatio[1] == 206 || splitRatio[0] == 208 && splitRatio[1] == 206) {
                document.getElementById("ratiobox").innerHTML += `<svg style="height:${parseInt(massBox.height)}; width: 51px">
            <rect style="fill:#ff00004d; stroke: black; stroke-width: 2px"x=${0} y=${0} width=${50} height=${parseInt(massBox.height)} />
                        <text x="50%" y="50%"
          text-anchor="middle" 
          stroke="black" 
          stroke-width="1px"
          font-size="14px"><tspan y="14"x="25">${splitRatio[0]}</tspan><tspan x="25" dy=".6em">⸻</tspan><tspan x="25"dy=".6em">${splitRatio[1]}</tspan></text>
            </svg>`
            }
            else {
                document.getElementById("ratiobox").innerHTML += `<svg style="height:${parseInt(massBox.height)}; width: 51px">
            <rect style="fill:white; stroke: black; stroke-width: 2px"x=${0} y=${0} width=${50} height=${parseInt(massBox.height)} />
                        <text x="50%" y="50%"
          text-anchor="middle" 
          stroke="black" 
          stroke-width="1px"
          font-size="14px"><tspan y="14"x="25">${splitRatio[0]}</tspan><tspan x="25" dy=".6em">⸻</tspan><tspan x="25"dy=".6em">${splitRatio[1]}</tspan></text>
            </svg>`
            }
        }
        requestSender('/customexp', customExpTarget + ":" + localStorage.getItem("selected")).then((response) => {
            this.setState({audit: ["List of Custom Expression Names: "].concat(response.data.replace('[','').replace(']','').split(',')), mount: true})
        })
    }

    render() {
        return (
            this.state.mount ?
                //All functions are self-contained to the wrapper with the exception of the history.push to reroute the user, which requires a reference to the React-Router
                //Because WrapperComponent is not instantiated from the router but from its child, we have to pass in the history as a prop
                <WrapperComponent stateNum={1}history={this.props.history}>
                <Modal open={this.state.modal} onClose={this.modal}>{
                    <div style={{position: 'absolute', width: '600px', height: "70%", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '2px solid #000', backgroundColor: 'white', padding: '4px'}} className={'paper'}>
                        <div style={{height: "90%", width: "100%"}}>
                            <div>
                                <iframe id='iframeee'
                                        style={{
                                            display: 'flex',
                                            flexGrow: '1',
                                            overflow: 'auto',
                                            height: '100%',
                                            width: `100%`
                                        }}
                                        src={FILEBROWSER_URL}></iframe>
                            </div>
                            <div style={{paddingRight: "10px", display: "inline"}}>
                                <TextField value={this.state.routeVal} onChange={(e) => {
                                    if (!e.target.value.includes('.')) {
                                        this.setState({
                                            routeVal: e.target.value
                                        })
                                    }
                                }}label="File Name Here:" />
                                <Button style={{marginTop: "10px"}}variant="contained" color="primary" onClick={this.saveCurrentXML}>Save</Button>
                            </div>
                            <Button style={{marginTop: "10px"}} variant="contained" color="primary"
                                    onClick={()=>this.setState({modal: false})}>Cancel</Button>
                        </div>
                    </div>}</Modal>
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
                        { !this.state.selected ? null :
                            <div className={cx('task-info')}>
                                <div className={cx('task-name-label-t')}>
                                    <h5 className={cx('tasklibrary-labels')}>Task Name:</h5>
                                </div>
                                <div className={cx('task-name-text-t')}>
                                    <TextField style={{width: "75%"}} defaultValue={this.state.taskName}
                                               disabled={true}></TextField>
                                    <div style={{display: "inline", paddingLeft: "50px", paddingTop: "10px"}}>
                                        <h5 className={cx('geochron-text')}
                                            style={{display: "inline", color: "#ff9800 !important"}}>GEOCHRON</h5>
                                    </div>
                                </div>
                                <div className={cx('description-label-t')}>
                                    <h5 className={cx('tasklibrary-labels')}>Description:</h5>
                                </div>
                                <div className={cx('description-text-t')}>
                                    <TextField style={{width: "100%"}} defaultValue={this.state.taskDesc}
                                               inputProps = {this.state.taskDesc.length > 80 ? {style: {fontSize: "15px"}}: ""}
                                               disabled={true}></TextField>
                                </div>
                                <div className={cx('author-lab-label-t')}>
                                    <h5 className={cx('tasklibrary-labels')}>Author & Lab:</h5>
                                </div>
                                <div className={cx('author-name-text-t')}>
                                    <TextField style={{width: "100%"}} defaultValue={this.state.taskAuthor}
                                               disabled={true}></TextField>
                                </div>
                                <div className={cx('lab-name-label-t')}>
                                    <h5 className={cx('tasklibrary-labels')}>Lab Name:</h5>
                                </div>
                                <div className={cx('lab-name-text-t')}>
                                    <TextField style={{width: "75%"}} defaultValue={this.state.taskLab}
                                               disabled={true}></TextField>
                                </div>
                                <div className={cx('provenance-label-t')}>
                                    <h5 className={cx('tasklibrary-labels')}>Provenance:</h5>
                                </div>
                                <div className={cx('provenance-text-t')}>
                                    <TextField style={{width: "100%"}} defaultValue={this.state.taskProv}
                                               disabled={true}></TextField>
                                </div>
                                <div className={cx('directives-label-t')}>
                                    <h5 className={cx('tasklibrary-labels')}>Directives:</h5>
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
                                                    sx={{marginTop: "10px"}}
                                                    value={this.state.primaryRadio}
                                                    onChange={() => {
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        disabled={this.state.primaryRadio == "238" ? false : true}
                                                        value="238" control={<Radio/>} label="206Pb/238U"/>
                                                    <FormControlLabel
                                                        disabled={this.state.primaryRadio == "232" ? false : true}
                                                        value="232" control={<Radio/>} label="208Pb/232Th"/>
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
                                                    onChange={() => {
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        disabled={this.state.secondaryRadio == "direct" ? false : true}
                                                        value="direct" control={<Radio/>} label="Directly"/>
                                                    <FormControlLabel
                                                        disabled={this.state.secondaryRadio == "indirect" ? false : true}
                                                        value="indirect" control={<Radio/>} label="Indirectly"/>
                                                </RadioGroup>
                                            </FormControl>
                                        </div>

                                        <p className={cx('value-206238')}>Uncor_206Pb238U_CalibConst:</p>

                                        <div className={cx('generic-box box-206238')}>
                                            <div className={cx('center-flex')}><p style={{fontSize: "12px", fontFamily: "monospace"}}>{this.state.Uncor206}</p></div>
                                        </div>

                                        <p className={cx('value-208232')}>Uncor_208Pb232Th_CalibConst:</p>

                                        <div className={cx('generic-box box-208232')}>
                                            <div className={cx('center-flex')}><p style={{fontSize: "12px", fontFamily: "monospace"}}>{this.state.Uncor208}</p></div>
                                        </div>

                                        <p className={cx('sdp-ratio')}>Calculate secondary d/p ratio:</p>


                                        <p className={cx('value-232238')}>232Th238U_RM:</p>

                                        <div className={cx('generic-box  box-232238')}>
                                            <div className={cx('center-flex')}><p style={{fontSize: "12px", fontFamily: "monospace"}}>{this.state.THU}</p></div>
                                        </div>

                                        <p className={cx('value-parele')}>ParentElement_ConcenConst:</p>

                                        <div className={cx('generic-box box-parele')}>
                                            <div className={cx('center-flex')}><p style={{fontSize: "12px", fontFamily: "monospace"}}>{this.state.ParEle}</p></div>
                                        </div>

                                    </div>
                                </div>
                                <div className={cx('mass-label-t')}>
                                    <h5 className={cx('tasklibrary-labels')}>Mass Labels:</h5>
                                </div>
                                <div id="massbox"className={cx('mass-box-t')}>
                                    <div>

                                    </div>
                                </div>
                                <div className={cx('mass-box-grey-t')}/>


                                <div className={cx('ratio-label-t')}>
                                    <h5 className={cx('tasklibrary-labels')}>Ratios:</h5>
                                </div>

                                <div id="ratiobox"className={cx('ratio-box-t')}/>
                                <div className={cx('ratio-box-grey-t')}/>

                                <div className={cx('custom-exp-label-t')}>
                                    <h5 className={cx('tasklibrary-labels')}>Custom Exp:</h5>
                                </div>

                                <div className={cx('custom-exp-box-t')}style={{overflow: "scroll", width: "100%", height:"100%"}}>
                                    <div>
                                        <p style={{wordWrap: "break-word", whiteSpace: "pre-wrap", fontFamily: "monospace"}}>
                                            {this.state.audit.map((data, index) => {
                                                if(index == 0) {
                                                    return <div style={{width: "100%", display: "block"}}>{data}</div>
                                                }
                                                return <div style={{width: "30%", display: "inline-block"}}>{data.trim()}</div>
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className={cx('actions-label-t')}>
                                    <h5 className={cx('tasklibrary-labels')}>Actions:</h5>
                                </div>
                                <div className={cx('actions-content')}>
                                    <div style={{paddingRight: "10px", display: "inline"}}>
                                        <Button variant="contained" color={"primary"}
                                                onClick={() => {
                                                    console.log("")
                                                }}>
                                            Edit Task
                                        </Button>
                                    </div>
                                    <div style={{paddingRight: "10px", display: "inline"}}>
                                        <Button variant="contained" color={"primary"} style={{display: "inline"}}
                                                onClick={() => {
                                                    console.log("")
                                                }}>
                                            Use to Replace Current Task
                                        </Button>
                                    </div>

                                    <Button variant="contained" color={"primary"} style={{display: "inline"}}
                                            onClick={this.modal}>
                                        Save Current Task as a Squid3 Task '.xml' file
                                    </Button>
                                </div>
                            </div>}
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

export default connect()(CustomLibrary);

