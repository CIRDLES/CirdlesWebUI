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
            spotName: "no spot selected",
            isotopicRM: "Model1",
            crmModel: "Model1",
            spotsTable: [],
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
    }
    handleChange = (event) => {
        switch(event.target.name) {
            case "filterSpotsSelector":
                this.setState({filterSpotsSelector: event.target.value})
                break;
            case "isotopicRM":
                this.setState({isotopicRM: event.target.value})
                break;
        }
    }
    generateTable(sampleType, value) {
        console.log(value[0])
        console.log()
            if(value[0].toUpperCase().indexOf(sampleType) >= 0 || sampleType == "All Samples") {
                return(
                    <tr>
                        <td>
                            {value[0].trim()}
                        </td>
                        <td>
                            {value[1].trim()}
                        </td>
                        <td>
                            {value[2].trim()}
                        </td>
                        <td>
                            {value[3].trim()}
                        </td>
                        <td>
                            {value[4].trim()}
                        </td>
                    </tr>
                )
            }
        }
    componentDidMount() {
        axios.post(SQUIDINK_ENDPOINT + '/spotspull', localStorage.getItem("user"), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((body) => {
            //Because all of the responses come from a single servlet, must split/remove new line
            let arr = (body.data.split("\n"))
            this.setState({filterSpotsOptions: JSON.parse(arr[0])})
            this.setState({spotsTable: JSON.parse(arr[1])})
            console.log(this.state.spotsTable)
            this.setState({mount: true})
        }).catch((err) => {
            console.log(err);
        })

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
                            <p style={{padding: "0 0 0 40px", display: "inline", fontSize: "smaller"}}>{"115/115"} shown</p>

                        </div>
                        <div className={cx('table-left-custom')} style={{display: 'inline'}}>
                            <div style={{overflowY: "scroll", maxHeight: "40em"}}>
                                <table style={{width: "100%"}}>
                                    <thead>
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
                                    </thead>
                                    <tbody>
                                    { this.state.spotsTable.map(this.generateTable.bind(null, this.state.filterSpotsSelector))
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
                                <b>{"COUNT "}</b>
                                RM Spots selected using filter
                                <b>{" FILTER"}</b>
                            </h6>
                        </div>
                        <div className={cx('rm-spots-table')} style={{display: "inline"}}>
                            <div style={{overflowY: "scroll", maxHeight: "12em"}}>
                                <table style={{width: "100%"}}>
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
                                    <tr>
                                        <td>
                                            Temora-1.1
                                        </td>
                                        <td>
                                            2011-10-19
                                        </td>
                                        <td>
                                            02:43:18
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Temora-2.1
                                        </td>
                                        <td>
                                            2012-01-23
                                        </td>
                                        <td>
                                            07:12:54
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Temora-1.1
                                        </td>
                                        <td>
                                            2011-10-19
                                        </td>
                                        <td>
                                            02:43:18
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Temora-2.1
                                        </td>
                                        <td>
                                            2012-01-23
                                        </td>
                                        <td>
                                            07:12:54
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Temora-1.1
                                        </td>
                                        <td>
                                            2011-10-19
                                        </td>
                                        <td>
                                            02:43:18
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Temora-2.1
                                        </td>
                                        <td>
                                            2012-01-23
                                        </td>
                                        <td>
                                            07:12:54
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Temora-1.1
                                        </td>
                                        <td>
                                            2011-10-19
                                        </td>
                                        <td>
                                            02:43:18
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Temora-2.1
                                        </td>
                                        <td>
                                            2012-01-23
                                        </td>
                                        <td>
                                            07:12:54
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Temora-1.1
                                        </td>
                                        <td>
                                            2011-10-19
                                        </td>
                                        <td>
                                            02:43:18
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Temora-2.1
                                        </td>
                                        <td>
                                            2012-01-23
                                        </td>
                                        <td>
                                            07:12:54
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Temora-1.1
                                        </td>
                                        <td>
                                            2011-10-19
                                        </td>
                                        <td>
                                            02:43:18
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Temora-2.1
                                        </td>
                                        <td>
                                            2012-01-23
                                        </td>
                                        <td>
                                            07:12:54
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Temora-1.1
                                        </td>
                                        <td>
                                            2011-10-19
                                        </td>
                                        <td>
                                            02:43:18
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Temora-2.1
                                        </td>
                                        <td>
                                            2012-01-23
                                        </td>
                                        <td>
                                            07:12:54
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Temora-1.1
                                        </td>
                                        <td>
                                            2011-10-19
                                        </td>
                                        <td>
                                            02:43:18
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Temora-2.1
                                        </td>
                                        <td>
                                            2012-01-23
                                        </td>
                                        <td>
                                            07:12:54
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Temora-1.1
                                        </td>
                                        <td>
                                            2011-10-19
                                        </td>
                                        <td>
                                            02:43:18
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Temora-2.1
                                        </td>
                                        <td>
                                            2012-01-23
                                        </td>
                                        <td>
                                            07:12:54
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Temora-1.1
                                        </td>
                                        <td>
                                            2011-10-19
                                        </td>
                                        <td>
                                            02:43:18
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Temora-2.1
                                        </td>
                                        <td>
                                            2012-01-23
                                        </td>
                                        <td>
                                            07:12:54
                                        </td>
                                    </tr>

                                </table>
                            </div>
                            <div className={cx('hint-wrapper')}>
                                <p style={{fontSize: "smaller", display: "inline"}}>Hint: To clear the list, right mouse-click on it anywhere for menu.</p>
                                <Button variant="contained" color="primary">Copy Filtered Spots to RM Spots.</Button>
                            </div>
                        </div>
                        <div className={cx('crm-spots-label')}>
                            <h5 style={{fontSize: "17px"}}>Concentration Reference Material (CRM) Spots:</h5>
                        </div>
                        <div className={cx('crm-spots-label-selected')}>
                            <b>{"COUNT "}</b>
                            CRM Spots selected using filter
                            <b>{" FILTER"}</b>
                        </div>
                        <div className={cx('crm-spots-table')} style={{display: "inline"}}>
                            <div style={{overflowY: "scroll", maxHeight: "12em"}}>
                                <table>
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
                                    <tr>
                                        <td>
                                            6266-1.1
                                        </td>
                                        <td>
                                            2012-02-08
                                        </td>
                                        <td>
                                            9:18:18
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            6266-1.1
                                        </td>
                                        <td>
                                            2012-02-08
                                        </td>
                                        <td>
                                            9:18:18
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            6266-1.1
                                        </td>
                                        <td>
                                            2012-02-08
                                        </td>
                                        <td>
                                            9:18:18
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            6266-1.1
                                        </td>
                                        <td>
                                            2012-02-08
                                        </td>
                                        <td>
                                            9:18:18
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            6266-1.1
                                        </td>
                                        <td>
                                            2012-02-08
                                        </td>
                                        <td>
                                            9:18:18
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            6266-1.1
                                        </td>
                                        <td>
                                            2012-02-08
                                        </td>
                                        <td>
                                            9:18:18
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            6266-1.1
                                        </td>
                                        <td>
                                            2012-02-08
                                        </td>
                                        <td>
                                            9:18:18
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            6266-1.1
                                        </td>
                                        <td>
                                            2012-02-08
                                        </td>
                                        <td>
                                            9:18:18
                                        </td>
                                    </tr>


                                </table>
                            </div>
                            <div className={cx('hint-wrapper')}>
                                <p style={{fontSize: "smaller", display: "inline"}}>Hint: To clear the list, right mouse-click on it anywhere for menu.</p>
                                <Button variant="contained" color="primary">Copy Filtered Spots to CRM Spots.</Button>
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