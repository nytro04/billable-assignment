import React, { Component } from "react";
import axios from "axios";
import slugify from "slugify";

class UploadCSV extends Component {
  state = {
    file: "",
    imagePreviewUrl: "",
    jsonData: []
  };

  renderTableData = () => {
    return this.state.jsonData.map((report, index) => {
      console.log(report);

      // console.log(JSON.parse(report));
      const { field1, field2, field3, field4, field5, field6 } = report;

      // console.log("employee id", employeeId);
      // console.log("company name", name);

      return (
        <tr key={index}>
          <td>{field1}</td>
          <td>{field2}</td>
          <td>{field3}</td>
          <td>{field4}</td>
          <td>{field5}</td>
          <td>{field6}</td>
        </tr>
      );
    });
  };

  handleUpload = e => {
    e.preventDefault();

    let data = new FormData();

    data.append("file", this.uploadInput.files[0]);

    axios
      .post("http://localhost:8080/api/v1/upload", data)
      .then(res => {
        console.log(res.data.data.csvData);

        const jsonData = res.data.data.csvData;
        this.setState({ jsonData });
      })
      .catch(error => {
        console.log(error);
      });

    // let reader = new FileReader();
    // let file = e.target.files[0];

    // reader.onloadend = () => {
    //   this.setState({
    //     file,
    //     imagePreviewUrl: reader.result
    //   });
    // };

    // reader.readAsDataURL(file);

    // console.log(file);
  };

  handleSubmit = e => {
    e.preventDefault();

    // do render html
  };

  render() {
    const { jsonData } = this.state;
    console.log(jsonData);
    return (
      <div className="container py-5">
        <h3 className="text-center mb-5">CSV TO HTML</h3>
        <form onSubmit={this.handleUpload}>
          <div className="form-group">
            <input
              type="file"
              className="form-control"
              ref={ref => {
                this.uploadInput = ref;
              }}
            />
          </div>
          <button className="btn btn-info">Upload</button>
        </form>

        <h2>HTML REPORT</h2>
        <div>
          <table>
            <tbody>{this.renderTableData()}</tbody>
            {/* <tbody>
              {jsonData.map((report, index) => (
                <tr key={index}>
                  <td>test this</td>
                  <td>{report.employeeId}</td>
                  <td>{report.billableRate}</td>
                  <td>{report.name}</td>
                  <td>{report.date}</td>
                  <td>{report.timeIn}</td>
                  <td>{report.timeOut}</td>
                </tr>
              ))}
            </tbody> */}
          </table>
        </div>
        {/* <form onSubmit={this.handleSubmit}>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={this.handleChange}
              name="file"
            />
            <label className="custom-file-label" htmlFor="customFile"></label>
          </div>
        </form> */}
      </div>
    );
  }
}

export default UploadCSV;
