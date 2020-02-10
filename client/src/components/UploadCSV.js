import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

import jsPDF from "jspdf";
import "jspdf-autotable";

class UploadCSV extends Component {
  state = {
    file: "",
    // company: "",
    jsonData: []
  };

  exportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(14);

    const headers = [["Employee ID", "Number of Hours", "Unit Price", "Cost"]];

    // remove header from csv
    const data = this.state.jsonData.filter(el => {
      return el.field1 !== "Employee ID";
    });

    const newData = data.filter(el => {
      return el.field1 !== "2";
    });

    console.log(newData);

    let company;

    const newDataData = newData.map(el => {
      company = el.field3;

      const endTime = moment(el.field6, "HH:mm");
      const startTime = moment(el.field5, "HH:mm");

      const duration = moment.duration(endTime.diff(startTime));

      const hours = parseInt(duration.asHours());

      console.log(hours);

      const billable = el.field2 * hours;

      return [el.field1, hours, el.field2, billable];
    });

    const title = `Company: ${company}`;

    console.log(title);

    let content = {
      startY: 50,
      head: headers,
      body: newDataData
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("receipt.pdf");
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

        <button onClick={() => this.exportPDF()}>Generate Report</button>

        <div></div>
      </div>
    );
  }
}

export default UploadCSV;
