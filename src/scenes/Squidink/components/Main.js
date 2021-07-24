import React from 'react';
import style from 'styles/Squidink/Main.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import "constants/api";
import {connect} from "react-redux";
import {FILEBROWSER_URL, SQUIDINK_ENDPOINT} from "constants/api";
import WrapperComponent from "./WrapperComponent";

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
        this.toggleFilebrowserFunc = this.toggleFilebrowserFunc.bind(this)


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
        return (
            /*
            Currently any state-manipulation has to be done from the page context and can't be invoked within the external function that is our
            wrapper,
            so the baseline functions and states are outlined in this file and serves as a sample page
            for further page development
            Simply duplicating this file and changing the class and filename gives the base structure for any further Squidink pages
            */
            <WrapperComponent openAction={this.openAction} isLoading={this.state.loading} modalOpen={this.state.modalOpen} handClose={this.handClose}
            hideinternal={this.hideinternal} showinternal={this.showinternal} toggleFilebrowserFunc={this.toggleFilebrowserFunc()} showfbr={this.state.showfbr}>

            </WrapperComponent>


        )

    }
}

export default connect()(Main);

