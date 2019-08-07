import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import histroy from "../../history/History";
import demoGif from "../../image/demo.gif";

import Footer from "./Footer";

const Landing = ({ isLoggedIn }) => {
  useEffect(() => {
    if (isLoggedIn) histroy.push("/hub");
  }, [isLoggedIn]);

  return (
    <Container fluid={true} className="landing text-center p-0">
      <div className="landing-contianer">
        <div className="m-auto">
          <div className="phone-container">
            <img src={demoGif} alt="Demo" id="demo-gif" />
          </div>
        </div>
      </div>

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
