import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Router, Route, Switch } from "react-router-dom";
//import io from "socket.io-client";
import { Container } from "reactstrap";
import history from "./history/History";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logOutUser } from "./redux/actions/authActions";

import NavBar from "./components/navbar/NavBar";
import Landing from "./components/layouts/Landing";
import PrivateRoute from "./components/common/PrivateRoute";
import Hub from "./components/layouts/Hub";
import NewChat from "./components/layouts/NewChat.js";

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

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logOutUser());
    window.location.href = "/";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Container fluid={true} className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <PrivateRoute exact path="/hub" component={Hub} />
            <PrivateRoute exact path="/chat" component={NewChat} />
          </Switch>
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
