import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";


// Components
import Main from "./components/Main"
import 'styles/Squidink/Main.scss';


class SquidInkPage extends Component {
    render() {
        return (
            <div className="squidink">
                    <Route exact path="/squidink" component={Main} />
            </div>
        );
    }
}


export default connect()(SquidInkPage);
