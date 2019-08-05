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
    <Container fluid={true} className="landing text-center p-0">
      {/*video or Gif showing the chat page will be shown here*/}
      <p> add type animation for description???</p>
      <p>video or Gif component will be shown here </p>

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
