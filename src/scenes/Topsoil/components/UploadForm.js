import React, { Component } from 'react';
import { LeftLabelledSelect } from '../../../components/bootstrap';

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px"
  }
}

type Props = {
  tableFile: any,
  template: string,
  onSubmit: Function,
  onChangeTableFile: Function,
  onChangeTemplate: Function
}
class UploadForm extends Component<Props> {

  render() { 
    const {
      tableFile,
      template,
      onSubmit, 
      onChangeTableFile, 
      onChangeTemplate 
    } = this.props;
    return (
      <div className="d-flex flex-column align-items-center p-3">
        <label>Select a table file (.csv, .tsv):</label>
        <div className="custom-file">
          <input
            id="dataFileInput"
            className="custom-file-input"
            type="file" 
            name="tableFile" 
            onChange={onChangeTableFile} 
          />
          <label hmlFor="dataFileInput" className="custom-file-label">{(tableFile && tableFile.name) || "Choose File"}</label>
        </div>
        <br />
        <LeftLabelledSelect
          id="templateSelect"
          label="Data&nbsp;Template:"
          value={template}
          onChange={onChangeTemplate}
        >
          <option value="DEFAULT">Default</option>
          <option value="SQUID_3">Squid 3</option>
        </LeftLabelledSelect>
        <br />
        <button onClick={onSubmit}>Submit</button>
      </div>
    );
  }

}
 
export default UploadForm;