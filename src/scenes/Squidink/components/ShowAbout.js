import React from "react";
import {connect} from "react-redux";
import DropdownCustom from "./DropdownCustom";
import {dropdownOptions} from "../util/constants";
import classNames from "classnames/bind";
import style from "styles/Squidink/ShowAbout.scss";
import ResizePanel from "./ResizePanel";
import {FILEBROWSER_URL} from "constants";
import squidInkLogo from "../../../img/logos/SquidInk.svg";
import squidLogo from "../../../img/logos/Squid.svg";

let cx = classNames.bind(style);

export class ShowAbout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //State-initializer, initialize state vars here for reference from html
            showfbr: true
        };
        //If a component requires 'this.' context, it's easiest to bind it, i.e.
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        switch (event.target.name) {
        }
    }

    render() {
        return (
            <div className={cx('container-custom')}>
                <div className={cx('body')} style={{overflow: 'scroll'}}>
                    {this.state.showfbr ?
                        <ResizePanel onDragStart={this.hideinternal} onDragEnd={this.showinternal}
                                     direction="e"
                                     style={{id: 'fbr', flexGrow: '1'}}>
                            <div className={cx('sidebar', 'withMargin', 'panel')}>
                                <iframe id='iframee'
                                        style={{
                                            display: 'flex',
                                            flexGrow: '1',
                                            overflow: 'auto',
                                            height: '100%',
                                            width: '100%'
                                        }}
                                        src={FILEBROWSER_URL}></iframe>
                            </div>
                        </ResizePanel>
                        : null}
                    <div className={cx('content')}
                         style={{display: 'flex', overflow: 'scroll !important'}}>
                        <div className={cx('body')}>
                            <div className={cx('content')} style={{display: 'flex', overflow: 'scroll'}}>
                                <div className={cx('header-custom', 'panel-custom')}
                                     style={{position: 'fixed', top: '40', zIndex: '20'}}>
                                    <div className="rownav" style={{display: 'flex'}}>
                                        <DropdownCustom dropdownName="Project"
                                                        dropdownOptions={dropdownOptions[0]}></DropdownCustom>
                                        <DropdownCustom dropdownName="Data"
                                                        dropdownOptions={dropdownOptions[1]}></DropdownCustom>
                                        <DropdownCustom dropdownName="Task"
                                                        dropdownOptions={dropdownOptions[2]}></DropdownCustom>
                                        <DropdownCustom dropdownName="Isotopes"
                                                        dropdownOptions={dropdownOptions[3]}></DropdownCustom>
                                        <DropdownCustom dropdownName="Expressions"
                                                        dropdownOptions={dropdownOptions[4]}></DropdownCustom>
                                        <DropdownCustom dropdownName="Common Pb"
                                                        dropdownOptions={dropdownOptions[5]}></DropdownCustom>
                                        <DropdownCustom dropdownName="Interpretations"
                                                        dropdownOptions={dropdownOptions[6]}></DropdownCustom>
                                        <DropdownCustom dropdownName="Reports"
                                                        dropdownOptions={dropdownOptions[7]}></DropdownCustom>
                                        <DropdownCustom dropdownName="Archiving"
                                                        dropdownOptions={dropdownOptions[8]}></DropdownCustom>
                                        <DropdownCustom dropdownName="Parameter"
                                                        dropdownOptions={dropdownOptions[9]}></DropdownCustom>
                                        <DropdownCustom dropdownName="About"
                                                        dropdownOptions={dropdownOptions[10]}></DropdownCustom>
                                    </div>
                                </div>
                                <div className={cx('label-container-custom')}>
                                    <h1></h1>
                                    <p><img src={squidLogo} alt="SquidInkLogo" width="150" height="150"/>
                                        &nbsp;&nbsp;spills&nbsp;&nbsp;
                                        <img src={squidInkLogo} alt="SquidInkLogo" width="150" height="150"/>
                                    </p>

                                    <h4>Squid Ink exposes <a
                                        href={"https://github.com/CIRDLES/Squid"}>Squid3</a> functionality as a
                                        webservice provided by <a href={"http://cirdles.org/"}>CIRDLES.org.</a></h4>
                                    <p>Users are encouraged to provide feedback via <a
                                        href={"https://github.com/CIRDLES/Squid/issues"}>this issues page</a> on GitHub.
                                    </p>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default connect()(ShowAbout)