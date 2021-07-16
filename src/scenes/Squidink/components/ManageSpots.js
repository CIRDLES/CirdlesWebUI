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
let cx = classNames.bind(style);

export class ManageSpots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //State-initializer, initialize state vars here for reference from html
            filterSpotsSelector: "All Samples",
            spotName: "no spot selected",
            isotopicRM: "Model1"

        };
        //If a component requires 'this.' context, it's easiest to bind it, i.e.
        this.handleChange = this.handleChange.bind(this);
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
    render() {
        return(
            <div className={cx('container-custom')}>
                <div className={cx('body')}>
                    <div className={cx('content')} style={{display: 'flex', overflow: 'scroll'}}>
                        <div className={cx('header-custom', 'panel-custom')} style={{position: 'fixed', top: '40', zIndex: '20'}}>
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

                    </div>
                </div>
            </div>
        )
    }
}
export default connect()(ManageSpots)