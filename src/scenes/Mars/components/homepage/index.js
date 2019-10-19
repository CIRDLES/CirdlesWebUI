import React, { Component } from "react";
import marsbackground from "img/marsBackground.jpg";
import "../../../../styles/mars.scss";

class HomePage extends Component {
  render() {
    return (
      <div
        className="home"
        style={{ backgroundImage: `url(${marsbackground})` }}
      >
        <div className="header">
          MARS BETA
          <div className="subtitle">
            Middleware for Assisting the Registration of Samples
          </div>
        </div>
      </div>
    );
  }
}
export default HomePage;
