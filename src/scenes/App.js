// @flow
import React, { Component, Fragment } from "react";
import { Switch, Route, Link, NavLink } from "react-router-dom";
import Home from "./Home";
import Squid from "./Squid";
import Ambapo from "./Ambapo";
import Topsoil from "./Topsoil";
import squidLogo from "../img/logos/Squid.svg";
import ambapoLogo from "../img/logos/Ambapo.svg";
import topsoilLogo from "../img/logos/Topsoil.svg";
import { colors } from "constants";

import "styles/index.scss";

const routes = [
  {
    path: "/",
    title: "CIRDLES Web Services",
    exact: true,
    component: Home,
    logo: null
  },
  {
    path: "/ambapo",
    title: "Ambapo",
    component: Ambapo,
    logo: ambapoLogo
  },
  {
    path: "/squid",
    title: "Squid Ink: Squid's Reporting Service (Beta)",
    component: Squid,
    logo: squidLogo
  },
  {
    path: "/topsoil",
    title: "Topsoil",
    component: Topsoil,
    logo: topsoilLogo
  }
];

const Header = ({ title, logo }) => {
  const image = logo ? (
    <img src={logo} width="30" height="30" alt={`${title} logo`} className="d-inline-block align-top mr-2" />
  ) : null;
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="#">
          {image}
          {title}
        </Link>
        <div className="navbar-nav flex-row ml-auto">
            <NavLink className="nav-item nav-link ml-4" to="/"><strong>Home</strong></NavLink>
            <NavLink className="nav-item nav-link ml-4" to="/squid">Squid</NavLink>
            <NavLink className="nav-item nav-link ml-4" to="/ambapo">Ambapo</NavLink>
            <NavLink className="nav-item nav-link ml-4" to="/topsoil">Topsoil</NavLink>
          </div>
      </div>
    </nav>
  );
}

class App extends Component {

  render() {
    return (
      <div style={styles.wrapper}>
        {routes.map(route => {
          const { title, path, exact } = route;
          return (
            <Route 
              key={title + "-header-route"}
              path={path}
              exact={exact}
              render={() => Header(route)}
            />
          );
        })}
        <main style={styles.body}>
          <Switch>
            {routes.map(route => {
              const { title, ...rest } = route;
              return (
                <Route
                  key={title + "-main-route"}
                  {...rest}
                />
              );
            })}
          </Switch>
        </main>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    height: "100vh",
    width: "100%",
    backgroundColor: colors.primary,
  },
  body: {
    position: "absolute",
    top: "3.5em",
    right: "0",
    bottom: "0",
    left: "0",
    overflow: "auto",
    backgroundColor: colors.primary,
  }
};

export default App;
