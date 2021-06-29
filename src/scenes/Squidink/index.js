import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";


// Components
import Main from "./components/Main"
import SkeletonExample from "./components/SkeletonExample"
import ManageSpots from "./components/ManageSpots"
import 'styles/Squidink/Main.scss';



class SquidInkPage extends Component {
    render() {
        return (
            <div className="squidink">
                <main>
                    <Route exact path="/squidink" component={Main} />
                    <Route exact path="/squidink/skeleton" component={SkeletonExample} />
                    <Route exact path="/squidink/managespots" component={ManageSpots} />
                </main>
            </div>
        );
    }
}


export default connect()(SquidInkPage);
