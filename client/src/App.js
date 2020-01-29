import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import UploadCSV from "./components/UploadCSV";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={UploadCSV} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
