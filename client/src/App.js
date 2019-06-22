import React, { Component } from "react";
import io from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      ///
    };
    if (window.location.pathname === "/chat") {
      const socket = io("localhost:5000");
    }
  }

  render() {
    // testing for socket connections

    return (
      <div
        style={{
          textAlign: "center"
        }}>
        test
      </div>
    );
  }
}
export default App;
