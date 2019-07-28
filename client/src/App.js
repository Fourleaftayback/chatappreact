import React, { Suspense } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import history from "./history/History";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logOutUser } from "./redux/actions/authActions";

import NavBar from "./components/navbar/NavBar";
import Landing from "./components/layouts/Landing";
import PrivateRoute from "./components/common/PrivateRoute";
import Hub from "./components/layouts/Hub";

import FallBack from "./components/common/FallBack";

import "./sass/App.scss";

const NewChat = React.lazy(() => import("./components/layouts/NewChat.js"));
const ResetRequest = React.lazy(() =>
  import("./components/layouts/ResetRequest.js")
);
const ResetPassword = React.lazy(() =>
  import("./components/layouts/ResetPassword.js")
);

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
            <Route
              exact
              path="/createchat"
              component={() => (
                <Suspense fallback={<FallBack />}>
                  <NewChat />
                </Suspense>
              )}
            />
            <Route
              exact
              path="/forgot"
              component={() => (
                <Suspense fallback={<FallBack />}>
                  <ResetRequest />
                </Suspense>
              )}
            />
            <Route
              path="/reset"
              component={() => (
                <Suspense fallback={<FallBack />}>
                  <ResetPassword />
                </Suspense>
              )}
            />
          </Switch>
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
