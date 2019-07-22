// @flow
import React, { Component } from "react";
import { TabPane, Tab } from "../../../components";
import { ScatterPlot, Option } from "topsoil-js";
import { OptionsConsumer, OptionsContext } from "../options";
import AxisForm from "./plot-panel/axis-form";
import "../../../styles/topsoil/plot-panel.scss";
import OptionTextInput from "./plot-panel/option-text-input";

const styles = {
  optionList: {
    margin: "5px",
    listStyle: "none"
  },
  optionListLabel: {
    display: "inline-block",
    margin: 0
  }
};

type Props = {
  plot: {},
  onOptionChanged: Function
};

export class TopsoilPlotPanel extends Component<Props> {
  render() {
    const { plot: { options }, onOptionChanged } = this.props;
    return (
      <TabPane>
        <Tab label="Axis Styling">
          {/* <OptionsConsumer> */}
            {AxisStylingPanel(options, onOptionChanged)}
          {/* </OptionsConsumer> */}
        </Tab>
        <Tab label="Data Options">
          {/* <OptionsConsumer> */}
            {DataOptionsPanel(options, onOptionChanged)}
          {/* </OptionsConsumer> */}
        </Tab>
        <Tab label="Plot Features">
          {/* <OptionsConsumer> */}
            {PlotFeaturesPanel(options, onOptionChanged)}
          {/* </OptionsConsumer> */}
        </Tab>
        <Tab label="Constants">
          {/* <OptionsConsumer> */}
            {ConstantsPanel(options, onOptionChanged)}
          {/* </OptionsConsumer> */}
        </Tab>
      </TabPane>
    );
  }
}
TopsoilPlotPanel.contextType = OptionsContext;

const AxisStylingPanel = (options, onOptionChanged) => {
  return (
    <div className="subpanel-flex-container">

      <OptionTextInput
        value={options[Option.TITLE]}
        label="Title"
        onChange={e => onOptionChanged(Option.TITLE, e.target.value)}
      />

      <AxisForm
        axisType="X Axis"
        axisName={options[Option.X_AXIS]}
        axisMin={options[Option.X_AXIS_MIN]}
        axisMax={options[Option.X_AXIS_MAX]}
        onOptionChanged={onOptionChanged}
        onSetExtents={e => {}}
      />

      <AxisForm
        axisType="Y Axis"
        axisName={options[Option.Y_AXIS]}
        axisMin={options[Option.Y_AXIS_MIN]}
        axisMax={options[Option.Y_AXIS_MAX]}
        onOptionChanged={onOptionChanged}
        onSetExtents={e => {}}
      />
    </div>
  );
};

const DataOptionsPanel = (options, onOptionChanged) => {
  return (
    <div className="subpanel-flex-container">
      <div>
        <label>Isotope System: </label>
        <select
          value={options[Option.ISOTOPE_SYSTEM]}
          onChange={e => onOptionChanged(Option.ISOTOPE_SYSTEM, e.target.value)}
        >
          <option value="Generic">Generic</option>
          <option value="Uranium Lead">U-Pb</option>
          <option value="Uranium Thorium">U-Th</option>
        </select>
      </div>

      <div>
        <label>Uncertainty: </label>
        <select
          value={options[Option.UNCERTAINTY]}
          onChange={e => onOptionChanged(Option.UNCERTAINTY, e.target.value)}
        >
          <option value={1.0}>1σ</option>
          <option value={2.0}>2σ</option>
        </select>
      </div>

      <div>
        <div style={styles.optionListLabel}>
          <input
            type="checkbox"
            checked={options[Option.POINTS]}
            onChange={e => onOptionChanged(Option.POINTS, e.target.checked)}
          />
          <label>Points: </label>
        </div>

        <ul style={styles.optionList}>
          <li>
            <label>Fill: </label>
            <input
              type="color"
              value={options[Option.POINTS_FILL]}
              onChange={e =>
                onOptionChanged(Option.POINTS_FILL, e.target.value)
              }
            />
          </li>
        </ul>
      </div>

      <div>
        <div>
          <input
            type="radio"
            name="error"
            checked={options[Option.ELLIPSES]}
            onChange={e => {
              onOptionChanged(Option.UNCTBARS, !e.target.checked);
              onOptionChanged(Option.ELLIPSES, e.target.checked);
            }}
          />
          <label>Error Ellipses</label>
        </div>
        <ul style={styles.optionList}>
          <li>
            <label>Fill: </label>
            <input
              type="color"
              value={options[Option.ELLIPSES_FILL]}
              onChange={e =>
                onOptionChanged(Option.ELLIPSES_FILL, e.target.value)
              }
            />
          </li>
        </ul>
      </div>

      <div>
        <div>
          <input
            type="radio"
            name="error"
            checked={options[Option.UNCTBARS]}
            onChange={e => {
              onOptionChanged(Option.ELLIPSES, !e.target.checked);
              onOptionChanged(Option.UNCTBARS, e.target.checked);
            }}
          />
          <label>Error Bars</label>
        </div>
        <ul style={styles.optionList}>
          <li>
            <label>Fill: </label>
            <input
              type="color"
              value={options[Option.UNCTBARS_FILL]}
              onChange={e =>
                onOptionChanged(Option.UNCTBARS_FILL, e.target.value)
              }
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

const PlotFeaturesPanel = (options, onOptionChanged) => {
  let systemControls = "";
  switch (options[Option.ISOTOPE_SYSTEM]) {
    case "Uranium Lead":
      systemControls = UPbFeatures(options, onOptionChanged);
      break;
    case "Uranium Thorium":
      systemControls = UThFeatures(options, onOptionChanged);
      break;
  }

  return <div className="subpanel-flex-container">{systemControls}</div>;
};

const UPbFeatures = (options, onOptionChanged) => {
  return (
    <React.Fragment>
      <div>
        <div style={styles.optionListLabel}>
          <input
            type="checkbox"
            checked={options[Option.CONCORDIA_LINE]}
            onChange={e =>
              onOptionChanged(Option.CONCORDIA_LINE, e.target.checked)
            }
          />
          <label>Concordia: </label>
        </div>
        <ul style={styles.optionList}>
          <li>
            <input
              type="checkbox"
              checked={options[Option.CONCORDIA_ENVELOPE]}
              onChange={e =>
                onOptionChanged(Option.CONCORDIA_ENVELOPE, e.target.checked)
              }
            />
            <label> Error Envelope</label>
          </li>
          <li>
            <input
              type="radio"
              name="concordia-type"
              checked={options[Option.CONCORDIA_TYPE] === "wetherill"}
              onChange={e => {
                onOptionChanged(Option.CONCORDIA_TYPE, "wetherill");
              }}
            />
            <label>Wetherill</label>
          </li>
          <li>
            <input
              type="radio"
              name="concordia-type"
              checked={options[Option.CONCORDIA_TYPE] === "tera-wasserburg"}
              onChange={e => {
                onOptionChanged(Option.CONCORDIA_TYPE, "tera-wasserburg");
              }}
            />
            <label>Tera-Wasserburg</label>
          </li>
          <li>
            <label>Line Fill: </label>
            <input
              type="color"
              value={options[Option.CONCORDIA_LINE_FILL]}
              onChange={e =>
                onOptionChanged(Option.CONCORDIA_LINE_FILL, e.target.value)
              }
            />
          </li>
          <li>
            <label>Envelope Fill: </label>
            <input
              type="color"
              value={options[Option.CONCORDIA_ENVELOPE_FILL]}
              onChange={e =>
                onOptionChanged(Option.CONCORDIA_ENVELOPE_FILL, e.target.value)
              }
            />
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

const UThFeatures = (options, onOptionChanged) => {
  return (
    <React.Fragment>
      <div>
        <div style={styles.optionListLabel}>
          <input
            type="checkbox"
            checked={options[Option.EVOLUTION]}
            onChange={e => onOptionChanged(Option.EVOLUTION, e.target.checked)}
          />
          <label>Evolution Matrix</label>
        </div>
      </div>
    </React.Fragment>
  );
};

const ConstantsPanel = (options, onOptionChanged) => {
  return (
    <div className="subpanel-flex-container">
      <form
        className="lambda-form"
        onSubmit={e => {
          event.preventDefault();
          onOptionChanged(
            Option.LAMBDA_230,
            e.nativeEvent.target.children.l230.value
          );
        }}
      >
        <label>Lambda 230:</label>
        <input
          className="lambda-field"
          name="l230"
          type="text"
          defaultValue={options[Option.LAMBDA_230]}
        />
        <button type="submit">Set</button>
      </form>
      <form
        className="lambda-form"
        onSubmit={e => {
          event.preventDefault();
          onOptionChanged(
            Option.LAMBDA_234,
            e.nativeEvent.target.children.l234.value
          );
        }}
      >
        <label>Lambda 234:</label>
        <input
          className="lambda-field"
          name="l234"
          type="text"
          defaultValue={options[Option.LAMBDA_234]}
        />
        <button type="submit">Set</button>
      </form>
      <form
        className="lambda-form"
        onSubmit={e => {
          event.preventDefault();
          onOptionChanged(
            Option.LAMBDA_235,
            e.nativeEvent.target.children.l235.value
          );
        }}
      >
        <label>Lambda 235:</label>
        <input
          className="lambda-field"
          name="l235"
          type="text"
          defaultValue={options[Option.LAMBDA_235]}
        />
        <button type="submit">Set</button>
      </form>
      <form
        className="lambda-form"
        onSubmit={e => {
          event.preventDefault();
          onOptionChanged(
            Option.LAMBDA_238,
            e.nativeEvent.target.children.l238.value
          );
        }}
      >
        <label>Lambda 238:</label>
        <input
          className="lambda-field"
          name="l238"
          type="text"
          defaultValue={options[Option.LAMBDA_238]}
        />
        <button type="submit">Set</button>
      </form>
    </div>
  );
};
