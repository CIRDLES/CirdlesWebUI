// @flow
import React, { Component } from 'react';
import logo from "../../../img/logos/Topsoil.svg";

const styles = {
  toolbar: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexGrow: 0,
    padding: "0.25em",
    height: "100%"
  },
  toolbarTail: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0.25em"
  },
  logo: {
    backgroundImage: `url(${logo})`,
    width: "5em",
    height: "5em",
    margin: "0.25em"
  },
  toolbarItem: {
    display: "block",
    width: "6.25rem",
    margin: "0.25em"
  },
  tailLink: {
    textAlign: "center",
    margin: "0.25em 0"
  }
}

type Props = {
  children: []
}

class Toolbar extends Component<Props> {

  render() { 

    return (
      <div style={styles.toolbar}>
        
        {React.Children.map(this.props.children, child => {
          return React.cloneElement(child, { style: styles.toolbarItem });
        })}

        <div style={styles.toolbarTail}>
          <div style={styles.logo} />
          <a
            href="http://cirdles.org/projects/topsoil/"
            style={styles.tailLink}
          >
            CIRDLES.org
          </a>
          <a
            href="https://github.com/CIRDLES/Topsoil"
            style={styles.tailLink}
          >
            GitHub
          </a>
        </div>
      </div>
    );
  }
}
 
export default Toolbar;