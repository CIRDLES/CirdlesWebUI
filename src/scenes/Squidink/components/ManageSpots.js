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
            spotName: "no spot selected",
            isotopicRM: "Model1",
            showfbr: true,
            adragging: false,
            loading: false,
            modalOpen: false

        };
        //If a component requires 'this.' context, it's easiest to bind it, i.e.
        this.handleChange = this.handleChange.bind(this);
        this.hidediv = this.hidediv.bind(this);
        this.hideinternal = this.hideinternal.bind(this);
        this.showinternal = this.showinternal.bind(this);
        this.handClose = this.handClose.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.openAction = this.openAction.bind(this);
        this.toggleFilebrowserFunc = this.toggleFilebrowserFunc.bind(this)
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
    async componentDidMount() {

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
                        this.props.history.push('/squidink/manageproject')

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

    async handClose() {
        this.setState({modalOpen: false})
    }

    async hidediv() {
        this.setState({showfbr: !this.state.showfbr});
    }

    async hideinternal() {
        console.log('hide')
        this.setState({adragging: true})
    }

    async showinternal() {
        console.log('show')
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
        return(
            <WrapperComponent openAction={this.openAction} isLoading={this.state.loading} modalOpen={this.state.modalOpen} handClose={this.handClose}
                              hideinternal={this.hideinternal} showinternal={this.showinternal} toggleFilebrowserFunc={this.toggleFilebrowserFunc()} showfbr={this.state.showfbr}>
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
                                        <MenuItem value={"All Samples"}>All Samples</MenuItem>
                                        <MenuItem value={"PropValHere1"}>Dynamically</MenuItem>
                                        <MenuItem value={"PropValHere2"}>Generated</MenuItem>
                                        <MenuItem value={"PropValHere3"}>Options Here</MenuItem>
                                    </Select>
                                </FormControl>
                                <p style={{padding: "0 0 0 40px", display: "inline", fontSize: "smaller"}}>{"115/115"} shown</p>

                            </div>
                            <div className={cx('table-left-custom')}>
                                <div style={{overflowY: "scroll", maxHeight: "70vh"}}>
                                    <table style={{width: "100%"}}>
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
                                        <tr>
                                            <td>
                                                6266-1.1
                                            </td>
                                            <td>
                                                2012-02-08
                                            </td>
                                            <td>
                                                10:58:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Temora-1.1
                                            </td>
                                            <td>
                                                2021-03-09
                                            </td>
                                            <td>
                                                12:21:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
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
                                                10:58:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Temora-1.1
                                            </td>
                                            <td>
                                                2021-03-09
                                            </td>
                                            <td>
                                                12:21:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
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
                                                10:58:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Temora-1.1
                                            </td>
                                            <td>
                                                2021-03-09
                                            </td>
                                            <td>
                                                12:21:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
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
                                                10:58:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Temora-1.1
                                            </td>
                                            <td>
                                                2021-03-09
                                            </td>
                                            <td>
                                                12:21:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
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
                                                10:58:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Temora-1.1
                                            </td>
                                            <td>
                                                2021-03-09
                                            </td>
                                            <td>
                                                12:21:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
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
                                                10:58:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Temora-1.1
                                            </td>
                                            <td>
                                                2021-03-09
                                            </td>
                                            <td>
                                                12:21:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
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
                                                10:58:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Temora-1.1
                                            </td>
                                            <td>
                                                2021-03-09
                                            </td>
                                            <td>
                                                12:21:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
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
                                                10:58:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Temora-1.1
                                            </td>
                                            <td>
                                                2021-03-09
                                            </td>
                                            <td>
                                                12:21:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
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
                                                10:58:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Temora-1.1
                                            </td>
                                            <td>
                                                2021-03-09
                                            </td>
                                            <td>
                                                12:21:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
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
                                                10:58:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Temora-1.1
                                            </td>
                                            <td>
                                                2021-03-09
                                            </td>
                                            <td>
                                                12:21:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
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
                                                10:58:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Temora-1.1
                                            </td>
                                            <td>
                                                2021-03-09
                                            </td>
                                            <td>
                                                12:21:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
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
                                                10:58:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Temora-1.1
                                            </td>
                                            <td>
                                                2021-03-09
                                            </td>
                                            <td>
                                                12:21:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
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
                                                10:58:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Temora-1.1
                                            </td>
                                            <td>
                                                2021-03-09
                                            </td>
                                            <td>
                                                12:21:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
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
                                                10:58:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Temora-1.1
                                            </td>
                                            <td>
                                                2021-03-09
                                            </td>
                                            <td>
                                                12:21:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
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
                                                10:58:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Temora-1.1
                                            </td>
                                            <td>
                                                2021-03-09
                                            </td>
                                            <td>
                                                12:21:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
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
                                                10:58:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Temora-1.1
                                            </td>
                                            <td>
                                                2021-03-09
                                            </td>
                                            <td>
                                                12:21:56
                                            </td>
                                            <td>
                                                11
                                            </td>
                                            <td>
                                                6
                                            </td>
                                        </tr>

                                    </table>
                                </div>

                            </div>
                            <div className={cx('edit-spot-name-hint')} style={{display: 'inline'}}>
                                <p style={{fontSize: "smaller"}}>Hint: To remove a spot or split session, right mouse-click on spot for menu.</p>
                            </div>
                            <div className={cx('edit-spot-name-label')}>
                                <h6 style={{display: "inline", paddingRight: "5%"}}> Edit Spot Name: </h6>
                                <TextField defaultValue={this.state.spotName} style={{paddingRight: "5%"}}/>
                                <Button variant="contained" color="primary">Save Name</Button>
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
                            <div style={{overflowY: "scroll", maxHeight: "25vh"}}className={cx('rm-spots-table')}>
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
                            <div className={cx('rm-spots-hint')}>
                                <p style={{fontSize: "x-small", display: "inline"}}>Hint: To clear the list, right mouse-click on it anywhere for menu.</p>
                                <Button variant="contained" color="primary">Copy Filtered Spots to RM Spots.</Button>
                            </div>
                            <div className={cx('crm-spots-label')}>
                                <h5 style={{fontSize: "17px"}}>Concentration Reference Material (CRM) Spots:</h5>
                            </div>
                            <div className={cx('crm-spots-label-selected')}>
                                <b>{"COUNT "}</b>
                                CRM Spots selected using filter
                                <b>{" FILTER"}</b>
                            </div>
                            <div className={cx('crm-spots-table')}>
                                <div style={{overflowY: "scroll", maxHeight: "25vh", zIndex: "2"}}>
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
                            </div>
                            <div className={cx('crm-spots-hint')}>
                                <p style={{fontSize: "x-small", display: "inline"}}>Hint: To clear the list, right mouse-click on it anywhere for menu.</p>
                                <Button variant="contained" color="primary">Copy Filtered Spots to CRM Spots.</Button>
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
                        </div>
            </WrapperComponent>
        )
    }
}
export default connect()(ManageSpots)