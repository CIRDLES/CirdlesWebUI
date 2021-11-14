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
                <div className={cx('grid-container-custom')}>
                    <div className={cx('task-name-label')}>
                        <h3>Task Name:</h3>
                    </div>
                    <div className={cx('description-label')}>
                        <h3>Description:</h3>
                    </div>
                    <div className={cx('data-file-label')}>
                        <h3>Author & Lab:</h3>
                    </div>
                    <div className={cx('software-label')}>
                        <h3>Provenance:</h3>
                    </div>
                    <div className={cx('parameters-label')}>
                        <h3>Directives:</h3>
                    </div>
                    <div className={cx('refresh-button')} style={{padding: "10px"}}>
                    </div>
                    <div className={cx('session-label')}>
                        <h3>Task Audit:</h3>
                    </div>
                    <div className={cx('session-content')}>
                    </div>
                    <div className={cx('analyst-name-label')}>
                    </div>
                    <div className={cx('task-name-text')}>
                        <TextField style={{width: '80%'}}/>
                        <h5 className={cx('geochron-label')} style={{display: "inline", paddingTop: "10px", paddingLeft: "30px"}}>Geochron Mode</h5>
                    </div>
                    <div className={cx('project-file-text')}>
                        <h5 style={{color: "#000000 !important"}}/>
                    </div>
                    <div className={cx('description-text')}>
                        <TextField style={{width: '100%'}}/>
                    </div>
                    <div className={cx('parameters-content1')}>
                    </div>
                    <div className={cx('parameters-content2')}>
                    </div>
                    <div className={cx('parameters-content3')}>
                    </div>
                    <div className={cx('parameters-content4')}>

                    </div>
                    <div className={cx('parameters-content5')}>

                    </div>
                    <div className={cx('parameters-content6')}>
                    </div>
                    <div className={cx('notes-label')}>
                        <h3>Notes:</h3>
                    </div>
                    <div className={cx('notes-content')}>
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

