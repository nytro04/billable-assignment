import React, { Component } from "react";
import axios from "axios";

class UploadCSV extends Component {
  state = {
    file: "",
    imagePreviewUrl: ""
  };

  handleUpload = e => {
    e.preventDefault();

    let data = new FormData();

    data.append("file", this.uploadInput.files[0]);

    axios
      .post("http://localhost:8002/api/v1/upload", data)
      .then(res => {
        console.log(res.data);
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
