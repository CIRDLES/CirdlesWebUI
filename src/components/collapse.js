import React, { Component } from "react";

const styles = {
  labelGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer"
  },
  icon: {
    width: "1.5em",
    height: "1.5em",
    textAlign: "center"
  },
  label: {
    cursor: "pointer"
  },
  content: {
    marginLeft: "2em",
    display: "block",
    overflow: "auto"
  },
  contentCollapsed: {
    display: "none",
    overflow: "auto"
  }
};

type Props = {
  collapsed: boolean,
  label: string,
  onClick: Function
};

class Collapse extends Component<Props> {

  render() {
    const { collapsed, label } = this.props;
    return (
      <div>
        <div 
          onClick={this.props.onClick}
          style={styles.labelGroup}
        >
          <span style={styles.icon}>{collapsed ? "+" : "-"}</span>
          <label>{label}</label>
        </div>
        <div style={collapsed ? styles.contentCollapsed : styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }

}

export default Collapse;
