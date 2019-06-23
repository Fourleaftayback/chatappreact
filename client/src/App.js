import React from "react";
//import io from "socket.io-client";
import { Container } from "reactstrap";

import NavBar from "./components/navbar/NavBar";
import Landing from "./components/layouts/Landing";

import "./sass/App.scss";

/*
constructor() {
    super();
    this.state = {
      ///
    };
    if (window.location.pathname === "/chat") {
      const socket = io("localhost:5000");
    }
  }
*/
const App = () => {
  return (
    <Container fluid={true} className="App">
      <NavBar />
      <Landing />
    </Container>
  );
};

export default App;
