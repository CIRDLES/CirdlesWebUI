import React, {useEffect} from 'react';
import ReactLoading from 'react-loading';
import ResizePanel from "./ResizePanel";
import style from 'styles/Squidink/Main.scss';
import classNames from 'classnames/bind';
import Image from "img/logos/SquidInk.svg"
import axios from 'axios';
import DropdownCustom from "./DropdownCustom";
import "constants/api";
import {dropdownOptions} from "../util/constants";
import {connect} from "react-redux";
import {SQUIDINK_ENDPOINT, FILEBROWSER_URL} from "constants/api";
import Modal from "@material-ui/core/Modal";

let cx = classNames.bind(style);

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showfbr: true,
            adragging: false,
            loading: false,
            modalOpen: false
        };
        this.hidediv = this.hidediv.bind(this);
        this.hideinternal = this.hideinternal.bind(this);
        this.showinternal = this.showinternal.bind(this);
        this.handClose = this.handClose.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.openAction = this.openAction.bind(this);


    }




    async componentDidMount() {

        window.addEventListener('message', (e) => {
                let apiCheck = e.data.toString().split(':');
               if(e.origin == FILEBROWSER_URL) {
                   if(e.data.toString().length != 0 && apiCheck[0] != "api") {
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
                    }
                    else if(apiCheck[0] == "api") {
                        localStorage.setItem("user", apiCheck[1]);
                        axios.post(SQUIDINK_ENDPOINT + '/api', apiCheck[1], {
                            headers: {
                                'Content-Type': 'text/plain'
                            }
                        })
                    }}

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


    render() {
        let fOvd = new Map()
        fOvd.set('2', {function: this.openAction})
        fOvd.set('4', {function: this.openAction})
        const body = (
            <div style={{
                position: 'absolute',
                width: '400',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                border: '2px solid #000',
                backgroundColor: 'white',
                padding: '4px'
            }}
                 className={'paper'}>
                <p id="simple-modal-description">
                    Open / New File Actions are handled in the Filebrowser! Try double-clicking an appropriate file or viewing the context-menu with right-click.
                </p>
            </div>
        );
        return (
            <>{this.state.loading ?
                <div>
                    <div style={{
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%'
                    }}>
                        <div>
                            <ReactLoading type={'spin'} color={'#000000'}/>
                        </div>
                    </div>
                    <div style={{
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'calc(100% + 8em)',
                        width: '100%'
                    }}>
                        <h1>Your file is loading</h1>
                    </div>
                </div>
                : <div className={cx('container-custom')}>
                    <Modal open={this.state.modalOpen} onClose={this.handClose}>{body}</Modal>
                    <div className={cx('body')}>

                        {this.state.showfbr ?
                            <ResizePanel onDragStart={this.hideinternal} onDragEnd={this.showinternal} direction="e"
                                         style={{id: 'fbr', flexGrow: '1'}}>
                                <div className={cx('sidebar', 'withMargin', 'panel')}>
                                    <iframe id='iframee'
                                            style={{display: 'flex', flexGrow: '1', overflow: 'auto', height: '100%', width: '100%'}}
                                            src={FILEBROWSER_URL}></iframe>
                                </div>
                            </ResizePanel>
                            : null}
                        <div className={cx('content')} style={{display: 'flex', overflow: 'hidden'}}>
                            <div className={cx('header-custom', 'panel-custom')} style={{position: 'absolute', top: '40'}}>
                                <div className="rownav" style={{display: 'flex'}}>
                                        <DropdownCustom dropdownName = "Project" dropdownOptions = {dropdownOptions[0]} functionOverride = {fOvd}></DropdownCustom>
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
                            <img className="center" style={{width: '50%'}} src={Image}/>
                            {this.state.loading ?
                                <h1 style={{zIndex: 1}}>Opening your file...</h1>
                                : null}
                            <p>
                            </p>
                        </div>
                    </div>
                </div>}

            </>


        )

    }
}

export default connect()(Main);

