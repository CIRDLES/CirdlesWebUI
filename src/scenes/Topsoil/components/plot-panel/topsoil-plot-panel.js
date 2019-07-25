// @flow
import React, { Component } from "react";
import { TabPane, Tab } from "../../../../components";
import { Option } from "topsoil-js";
import AxisExtents from "./axis-extents";
import "../../../../styles/topsoil/plot-panel.scss";
import { Input, Select, RadioButton, CheckBox } from "../../../../components";
import Lambda from "./lambda";

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
  onOptionChanged: Function,
  onSetExtents: Function,
  fitToWetherillConcordia: Function
};

export class TopsoilPlotPanel extends Component<Props> {
  constructor(props) {
    super(props);
    
    this.handleSetExtents = this.handleSetExtents.bind(this);
  }

  handleSetExtents(xMin, xMax, yMin, yMax) {
    const {
      plot: { options },
      onSetExtents
    } = this.props;

    onSetExtents(
      xMin || options[Option.X_MIN],
      xMax || options[Option.X_MAX],
      yMin || options[Option.Y_MIN],
      yMax || options[Option.Y_MAX]
    );
  }

  render() {
    const {
      plot: { options },
      onOptionChanged,
      fitToWetherillConcordia
    } = this.props;
    return (
      <TabPane>
        <Tab label="Axis Styling">
          <AxisStylingPanel
            options={options}
            onOptionChanged={onOptionChanged}
            onSetExtents={this.handleSetExtents}
          />
        </Tab>
        <Tab label="Data Options">
          <DataOptionsPanel
            options={options}
            onOptionChanged={onOptionChanged}
          />
        </Tab>
        <Tab label="Plot Features">
          <PlotFeaturesPanel
            options={options}
            onOptionChanged={onOptionChanged}
            fitToWetherillConcordia={fitToWetherillConcordia}
          />
        </Tab>
        <Tab label="Constants">
          <ConstantsPanel options={options} onOptionChanged={onOptionChanged} />
        </Tab>
      </TabPane>
    );
  }
}

const AxisStylingPanel = ({ options, onOptionChanged, onSetExtents }) => {
  return (
    <div className="subpanel-flex-container">
      <Input
        value={options[Option.TITLE]}
        label="Title"
        onChange={e => onOptionChanged(Option.TITLE, e.target.value)}
      />

      <div>
        <Input
          label="X Axis"
          value={options[Option.X_AXIS]}
          onChange={e => onOptionChanged(Option.X_AXIS, e.target.value)}
        />
        <AxisExtents
          axisMin={options[Option.X_MIN]}
          axisMax={options[Option.X_MAX]}
          onSetExtents={(min, max) => onSetExtents(min, max, null, null)}
        />
      </div>

      <div>
        <Input
          label="Y Axis"
          value={options[Option.Y_AXIS]}
          onChange={e => onOptionChanged(Option.Y_AXIS, e.target.value)}
        />
        <AxisExtents
          axisMin={options[Option.Y_MIN]}
          axisMax={options[Option.Y_MAX]}
          onSetExtents={(min, max) => onSetExtents(null, null, min, max)}
        />
      </div>
    </div>
  );
};

const DataOptionsPanel = ({ options, onOptionChanged }) => {
  return (
    <div className="subpanel-flex-container">
      <Select
        label="Isotope System"
        value={options[Option.ISOTOPE_SYSTEM]}
        onChange={e => onOptionChanged(Option.ISOTOPE_SYSTEM, e.target.value)}
      >
        <option value="Generic">Generic</option>
        <option value="Uranium Lead">U-Pb</option>
        <option value="Uranium Thorium">U-Th</option>
      </Select>

      <Select
        label="Uncertainty"
        value={options[Option.UNCERTAINTY]}
        onChange={e => onOptionChanged(Option.UNCERTAINTY, e.target.value)}
      >
        <option value={1.0}>1σ</option>
        <option value={2.0}>2σ</option>
      </Select>

      <div>
        <CheckBox
          label="Points"
          checked={options[Option.POINTS]}
          onChange={e => onOptionChanged(Option.POINTS, e.target.checked)}
        />
        <ul style={styles.optionList}>
          <li>
            <Input
              label="Fill"
              value={options[Option.POINTS_FILL]}
              type="color"
              onChange={e =>
                onOptionChanged(Option.POINTS_FILL, e.target.value)
              }
            />
          </li>
        </ul>
      </div>

      <div>
        <CheckBox
          label="Error Ellipses"
          checked={options[Option.ELLIPSES]}
          onChange={e => onOptionChanged(Option.ELLIPSES, e.target.checked)}
        />
        <ul style={styles.optionList}>
          <li>
            <Input
              label="Fill"
              value={options[Option.ELLIPSES_FILL]}
              type="color"
              onChange={e =>
                onOptionChanged(Option.ELLIPSES_FILL, e.target.value)
              }
            />
          </li>
        </ul>
      </div>

      <div>
        <CheckBox
          label="Error Bars"
          checked={options[Option.UNCTBARS]}
          onChange={e => onOptionChanged(Option.UNCTBARS, e.target.checked)}
        />
        <ul style={styles.optionList}>
          <li>
            <Input
              label="Fill"
              value={options[Option.UNCTBARS_FILL]}
              type="color"
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

const PlotFeaturesPanel = ({ options, onOptionChanged, fitToWetherillConcordia }) => {
  let systemControls = "";
  switch (options[Option.ISOTOPE_SYSTEM]) {
    case "Uranium Lead":
      systemControls = UPbFeatures(options, onOptionChanged, fitToWetherillConcordia);
      break;
    case "Uranium Thorium":
      systemControls = UThFeatures(options, onOptionChanged);
      break;
  }

  return <div className="subpanel-flex-container">{systemControls}</div>;
};

const UPbFeatures = (options, onOptionChanged, fitToWetherillConcordia) => {
  return (
    <React.Fragment>
      <div>
        <CheckBox
          label="Concordia"
          checked={options[Option.CONCORDIA_LINE]}
          onChange={e =>
            onOptionChanged(Option.CONCORDIA_LINE, e.target.checked)
          }
        />
        <ul style={styles.optionList}>
          <li>
            <CheckBox
              label="Error Envelope"
              checked={options[Option.CONCORDIA_ENVELOPE]}
              onChange={e =>
                onOptionChanged(Option.CONCORDIA_ENVELOPE, e.target.checked)
              }
            />
          </li>
          <li>
            <RadioButton
              label="Wetherill"
              group="concordia-type"
              selected={options[Option.CONCORDIA_TYPE] === "wetherill"}
              onSelected={e => {
                onOptionChanged(Option.CONCORDIA_TYPE, "wetherill");
              }}
            />
            <ul style={styles.optionList}>
              <li>
                <button onClick={fitToWetherillConcordia}>Fit to Concordia</button>
              </li>
            </ul>
          </li>
          <li>
            <RadioButton
              label="Tera-Wasserburg"
              group="concordia-type"
              selected={options[Option.CONCORDIA_TYPE] === "tera-wasserburg"}
              onSelected={e => {
                onOptionChanged(Option.CONCORDIA_TYPE, "tera-wasserburg");
              }}
            />
          </li>
          <li>
            <Input
              label="Line Fill"
              type="color"
              value={options[Option.CONCORDIA_LINE_FILL]}
              onChange={e =>
                onOptionChanged(Option.CONCORDIA_LINE_FILL, e.target.value)
              }
            />
          </li>
          <li>
            <Input
              label="Envelope Fill"
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
        <CheckBox
          label="Evolution Matrix"
          checked={options[Option.EVOLUTION]}
          onChange={e => onOptionChanged(Option.EVOLUTION, e.target.checked)}
        />
      </div>
    </React.Fragment>
  );
};

const ConstantsPanel = ({ options, onOptionChanged }) => {
  return (
    <div className="subpanel-flex-container">
      <Lambda
        label="Lambda 230"
        defaultValue={options[Option.LAMBDA_230]}
        onSetValue={newValue => onOptionChanged(Option.LAMBDA_230, newValue)}
      />
      <Lambda
        label="Lambda 234"
        defaultValue={options[Option.LAMBDA_234]}
        onSetValue={newValue => onOptionChanged(Option.LAMBDA_234, newValue)}
      />
      <Lambda
        label="Lambda 235"
        defaultValue={options[Option.LAMBDA_235]}
        onSetValue={newValue => onOptionChanged(Option.LAMBDA_235, newValue)}
      />
      <Lambda
        label="Lambda 238"
        defaultValue={options[Option.LAMBDA_238]}
        onSetValue={newValue => onOptionChanged(Option.LAMBDA_238, newValue)}
      />
    </div>
  );
};
