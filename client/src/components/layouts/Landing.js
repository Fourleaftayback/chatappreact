import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import histroy from "../../history/History";

import Footer from "./Footer";

const Landing = ({ isLoggedIn }) => {
  useEffect(() => {
    if (isLoggedIn) histroy.push("/hub");
  }, [isLoggedIn]);

  return (
    <Container className="landing text-center">
      main laning page here
      <Footer />
    </Container>
  );
};

Landing.propTypes = {
  isLoggedIn: PropTypes.bool
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(Landing);
