import React, { Component } from "react";
import axios from "axios";

import jsPDF from "jspdf";
import "jspdf-autotable";

class UploadCSV extends Component {
  state = {
    file: "",
    imagePreviewUrl: "",
    jsonData: []
  };

  exportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(14);

    const title = `Company: ${this.state.jsonData[0].name} `;
    const headers = Object.entries(this.state.jsonData[0])[1];

    console.log(headers);

    const data = this.state.jsonData.map(el => [
      el.field1,
      el.field2,
      el.field3,
      el.field4,
      el.field5,
      el.field6
    ]);

    let content = {
      startY: 50,
      // head:
      body: data
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

