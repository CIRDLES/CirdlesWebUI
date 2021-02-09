////////////////////////////////////////////////////////////////////////////////////////
// DIALOG.JS //////////////////////////////////////////////////////////////////////////
// This component displays a preview of your map as you are creating it //////////////
// When "preview map" in the toolbar is clicked, a small window opens with content //
////////////////////////////////////////////////////////////////////////////////////

import React, { Component } from "react";

/////////////////////////////////////////////////
////////////////////////////////////////////////

// CSS & Styling

let dialogCloseButtonStyles = {
  marginBottom: "15px",
  padding: "3px 8px",
  cursor: "pointer",
  borderRadius: "50%",
  border: "none",
  width: "30px",
  height: "30px",
  fontWeight: "bold",
  alignSelf: "flex-end"
};

class Dialog extends Component {
  render() {
    let dialog = (
      <div className="dialog">
        <button className="dialog_close" onClick={this.props.onClose}>
          x
        </button>
        <div>{this.props.children}</div>
      </div>
    );
    if (!this.props.isOpen) {
      dialog = null;
    }
    if (this.props.isOpen) {
      return <div>{dialog}</div>;
    }
  }
}

export default Dialog;
