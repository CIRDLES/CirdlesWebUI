// @flow
import React, { Component } from "react";
import { Tab } from "./Tab";

type Props = {
  children: [],
  childProps: {}
};

type State = {
  activeTab: string
};

export class TabPane extends Component<Props, State> {
  constructor(props) {
    super(props);

    const activeTab = props.children[0];

    this.state = {
      activeTab
    };
  }

  handleClickTab(tab) {
    this.setState({ activeTab: tab });
  }

  handleChildUpdate() {

  }

  render() {
    const {
      props: { childProps, children },
      state: { activeTab }
    } = this;

    return (
      <div>
        <ol className="tab-list">
          {children.map(tab => {
            const { label } = tab.props;
            return (
              <Tab
                key={label}
                isActive={activeTab.props.label === label}
                label={label}
                onClick={() => this.handleClickTab(tab)}
              />
            );
          })}
        </ol>
        <div className="tab-content">
          {activeTab.props.children}
        </div>
      </div>
    );
  }
}
