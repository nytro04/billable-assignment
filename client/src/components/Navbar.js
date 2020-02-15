import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <div className="container">
          <Link className="navbar-brand" to="/">
            CSV TO HTML
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;
