import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Router, Route, Switch } from "react-router-dom";
//import io from "socket.io-client";
import { Container } from "reactstrap";
import history from "./history/History";

import NavBar from "./components/navbar/NavBar";
import Landing from "./components/layouts/Landing";
import TestRegister from "./components/testComp/TestRegister";

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
    <Provider store={store}>
      <Router history={history}>
        <Container fluid={true} className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route
              exact
              path="/register"
              component={() => <TestRegister isAuthenticated={false} />}
            />
          </Switch>
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
