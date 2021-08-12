import React from "react";
import {connect} from "react-redux";
import DropdownCustom from "./DropdownCustom";
import {dropdownOptions} from "../util/constants";
import classNames from "classnames/bind";
import style from "styles/Squidink/ManageSpots.scss";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import WrapperComponent from "./WrapperComponent";
import {FILEBROWSER_URL, SQUIDINK_ENDPOINT} from "constants/api";
import axios from "axios";
let cx = classNames.bind(style);

export class ManageSpots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //State-initializer, initialize state vars here for reference from html
            filterSpotsSelector: "All Samples",
            filterSpotsOptions: [],
            rmSpots: [],
            rmCount: 0,
            rmFilter: "N/A",
            crmSpots: [],
            crmCount: 0,
            crmFilter: "N/A",
            spotName: "no spot selected",
            isotopicRM: "Model1",
            crmModel: "Model1",
            spotsTable: [],
            maxSampleCount: 0,
            currentSampleCount: 0,
            showfbr: true,
            adragging: false,
            loading: false,
            modalOpen: false,
            mount: false,

        };
        //If a component requires 'this.' context, it's easiest to bind it, i.e.
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.generateTable = this.generateTable.bind(this);
        this.copyRMButton = this.copyRMButton.bind(this);
        this.copyCRMButton = this.copyCRMButton.bind(this);
    }
    handleChange = (event) => {
        switch(event.target.name) {
            case "filterSpotsSelector":
                this.updateTable(event.target.value);
                this.setState({filterSpotsSelector: event.target.value})
                break;
            case "isotopicRM":
                this.setState({isotopicRM: event.target.value})
                break;
        }
    }
    generateRMTable(value) {
        return(
            <tr>
                <td>
                    {value[0]}
                </td>
                <td>
                    {value[1]}
                </td>
                <td>
                    {value[2]}
                </td>
            </tr>
        )
    }
    generateTable(value) {
            {
                return(
                    <tr>
                        <td>
                            {value[0]}
                        </td>
                        <td>
                            {value[1]}
                        </td>
                        <td>
                            {value[2]}
                        </td>
                        <td>
                            {value[3]}
                        </td>
                        <td>
                            {value[4]}
                        </td>
                    </tr>
                )
            }
        }
    updateTable(event) {
        axios.post(SQUIDINK_ENDPOINT + '/spotsupdate', localStorage.getItem("user") + "!@#" + event, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( (body) => {
            this.setState({spotsTable: body.data})
            this.setState({currentSampleCount: body.data.length})
        }).catch((err) => {
            console.log(err)
        })

    }
    componentDidMount() {
        axios.post(SQUIDINK_ENDPOINT + '/spotspull', localStorage.getItem("user"), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((body) => {
            //Because all of the responses come from a single servlet, must split/remove new line
            let arr = (body.data.split("\n"))
            this.setState({filterSpotsOptions: JSON.parse(arr[0].trim())})
            this.setState({spotsTable: JSON.parse(arr[1].trim())})
            this.setState({rmSpots: JSON.parse(arr[2].trim())})
            this.setState({crmSpots: JSON.parse(arr[3].trim())})
            this.setState({rmCount: JSON.parse(arr[2].trim()).length})
            this.setState({crmCount: JSON.parse(arr[3].trim()).length})
            this.setState({rmFilter: arr[4]})
            this.setState({crmFilter: arr[5]})
            this.setState({maxSampleCount: JSON.parse(arr[1].trim()).length})
            this.setState({currentSampleCount: JSON.parse(arr[1].trim()).length})
            this.setState({mount: true})
        }).catch((err) => {
            console.log(err);
        })
    }
    copyRMButton() {
        this.setState({rmSpots: this.state.spotsTable})
        this.setState({rmCount: this.state.currentSampleCount})
        this.setState({rmFilter: this.state.filterSpotsSelector})

    }
    copyCRMButton() {
        this.setState({crmSpots: this.state.spotsTable})
        this.setState({crmCount: this.state.currentSampleCount})
        this.setState({crmFilter: this.state.filterSpotsSelector})
    }

    render() {
        return(
            <>
            {

                //Dont generate elements until project spots pull is complete for defaultVal generation
                this.state.mount ?
            <WrapperComponent  style={{overflow: "scroll"}}history={this.props.history}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%"}}>
                    <div className={cx('grid-container-spots')}>
                        <div className={cx('filter-spots-label')}>
                            <h6 style={{display: "inline"}}>Filter Spots by Sample name:</h6>
                            <FormControl style={{padding: "0 0 0 40px"}}>
                                <Select
                                    labelId="filterSpotsSelector-label"
                                    id="filterSpotsSelector"
                                    name="filterSpotsSelector"
                                    value={this.state.filterSpotsSelector}
                                    onChange={this.handleChange}
                                >
                                    {
                                        this.state.filterSpotsOptions.map((value) => {
                                            return (<MenuItem value={value}>{value}</MenuItem>)
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <p style={{padding: "0 0 0 40px", display: "inline", fontSize: "smaller"}}>{this.state.currentSampleCount + "/" + this.state.maxSampleCount} shown</p>

                        </div>
                        <div className={cx('table-left-custom')} style={{display: 'inline'}}>
                            <div style={{overflowY: "auto", height: "40em"}}>
                                <table style={{width: "100%"}}>
                                    <thead>
                                    <tr>
                                        <th>
                                            Spot Name
                                        </th>
                                        <th>
                                            Date
                                        </th>
                                        <th>
                                            Time
                                        </th>
                                        <th>
                                            Peaks
                                        </th>
                                        <th>
                                            Scans
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.spotsTable.map(this.generateTable.bind(null))
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <div className={cx('hint-wrapper')}>
                                <p style={{fontSize: "smaller", display: "block", paddingRight: "10px", float: "none", clear:"right"}}>Hint:
                                    To remove a spot or split session, right mouse-click on spot for menu.</p>
                                <h6 style={{display: "inline", paddingRight: "5%"}}> Edit Spot Name: </h6>
                                <TextField defaultValue={this.state.spotName} style={{paddingRight: "5%"}}/>
                                <Button variant="contained" color="primary">Save Name</Button>
                            </div>
                        </div>
                        <div className={cx('rm-spots-label')}>
                            <h5 style={{fontSize: "17px"}}>Isotopic Reference Material (RM) Spots</h5>
                        </div>
                        <div className={cx('rm-spots-label-selected')}>
                            <h6 style={{color: "#000000"}}>
                                <b>{this.state.rmCount + " "}</b>
                                RM Spots selected using filter
                                <b>{" " + this.state.rmFilter}</b>
                            </h6>
                        </div>
                        <div className={cx('rm-spots-table')} style={{display: "inline"}}>
                            <div style={{overflowY: "scroll", maxHeight: "12em"}}>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>
                                            Ref Mat Name
                                        </th>
                                        <th>
                                            Date
                                        </th>
                                        <th>
                                            Time
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { this.state.rmSpots.map(this.generateRMTable.bind(null))
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <div className={cx('hint-wrapper')}>
                                <p style={{fontSize: "smaller", display: "inline"}}>Hint: To clear the list, right mouse-click on it anywhere for menu.</p>
                                <Button variant="contained" color="primary" onClick={this.copyRMButton}>Copy Filtered Spots to RM Spots.</Button>
                            </div>
                        </div>
                        <div className={cx('crm-spots-label')}>
                            <h5 style={{fontSize: "17px"}}>Concentration Reference Material (CRM) Spots:</h5>
                        </div>
                        <div className={cx('crm-spots-label-selected')}>
                            <b>{this.state.crmCount + " "}</b>
                            CRM Spots selected using filter
                            <b>{" " + this.state.crmFilter}</b>
                        </div>
                        <div className={cx('crm-spots-table')} style={{display: "inline"}}>
                            <div style={{overflowY: "scroll", maxHeight: "12em"}}>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>
                                            Ref Mat Name
                                        </th>
                                        <th>
                                            Date
                                        </th>
                                        <th>
                                            Time
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { this.state.crmSpots.map(this.generateRMTable.bind(null))
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <div className={cx('hint-wrapper')}>
                                <p style={{fontSize: "smaller", display: "inline"}}>Hint: To clear the list, right mouse-click on it anywhere for menu.</p>
                                <Button variant="contained" color="primary" onClick={this.copyCRMButton}>Copy Filtered Spots to CRM Spots.</Button>
                            </div>
                        </div>
                        <div className={cx('isotopic-rm-label')}>
                            <h6>Select Isotopic RM Model:</h6>
                            <FormControl style={{width: "90%"}}>
                                <Select
                                    labelId="isotopic-RM-label"
                                    id="isotopicRM"
                                    name="isotopicRM"
                                    value={this.state.isotopicRM}
                                    onChange={this.handleChange}
                                >
                                    <MenuItem value={"Model1"}>Model1</MenuItem>
                                    <MenuItem value={"Model2"}>Model2</MenuItem>
                                    <MenuItem value={"Model3"}>Model3</MenuItem>
                                    <MenuItem value={"Model4"}>Model4</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={cx('isotopic-rm-list')}>
                            <div className={cx('grid-list')}>
                                <h5 className={cx('grid-list-item-left')}>
                                    206Pb/238U date (Ma):
                                </h5>
                                <b className={cx('grid-list-item-right')}>
                                    value
                                </b>
                            </div>
                            <div className={cx('grid-list')}>
                                <h5 className={cx('grid-list-item-left')}>
                                    207Pb/206Pb date (Ma):
                                </h5>
                                <b className={cx('grid-list-item-right')}>
                                    value
                                </b>
                            </div>
                            <div className={cx('grid-list')}>
                                <h5 className={cx('grid-list-item-left')}>
                                    208Pb/232Th date (Ma):
                                </h5>
                                <b className={cx('grid-list-item-right')}>
                                    value
                                </b>
                            </div>
                            <div className={cx('grid-list')}>
                                <h5 className={cx('grid-list-item-left')}>
                                    238U/235U (nat abun):
                                </h5>
                                <b className={cx('grid-list-item-right')}>
                                    value
                                </b>
                            </div>
                            <div className={cx('grid-list-crm')}>
                                <div className={cx('grid-list-button-crm')}>
                                    <Button variant="contained" color="primary">Manage RM Model</Button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('crm-model-label')}>
                            <h6>Select CRM Model:</h6>
                            <FormControl style={{width: "90%"}}>
                                <Select
                                    labelId="crm-model-label"
                                    id="crmModel"
                                    name="crmModel"
                                    value={this.state.crmModel}
                                    onChange={this.handleChange}
                                >
                                    <MenuItem value={"Model1"}>Model1</MenuItem>
                                    <MenuItem value={"Model2"}>Model2</MenuItem>
                                    <MenuItem value={"Model3"}>Model3</MenuItem>
                                    <MenuItem value={"Model4"}>Model4</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={cx('crm-list')}>
                            <div className={cx('grid-list-crm')}>
                                <h5 className={cx('grid-list-item-left-crm')}>
                                    U (ppm):
                                </h5>
                                <b className={cx('grid-list-item-right-crm')}>
                                    value
                                </b>
                            </div>
                            <div className={cx('grid-list-crm')}>
                                <h5 className={cx('grid-list-item-left-crm')}>
                                    Th (ppm):
                                </h5>
                                <b className={cx('grid-list-item-right-crm')}>
                                    value
                                </b>
                            </div>
                            <div className={cx('grid-list-crm')}>
                                <div className={cx('grid-list-button-crm')}>
                                    <Button variant="contained" color="primary">Manage CRM Model</Button>
                                </div>
                            </div>
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
            }
            </>
        )
    }
}
export default connect()(ManageSpots)