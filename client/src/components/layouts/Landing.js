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
    <Container className="landing text-center p-0">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Id porta nibh
        venenatis cras sed. Nisl suscipit adipiscing bibendum est. Blandit
        libero volutpat sed cras. Volutpat consequat mauris nunc congue. Est
        ullamcorper eget nulla facilisi etiam. Enim ut sem viverra aliquet eget
        sit amet tellus cras. Nisi quis eleifend quam adipiscing vitae. Nunc
        pulvinar sapien et ligula. Sit amet luctus venenatis lectus magna
        fringilla urna porttitor rhoncus. Aliquam sem et tortor consequat id
        porta nibh venenatis cras. Ornare lectus sit amet est placerat. Et
        malesuada fames ac turpis. Enim praesent elementum facilisis leo vel
        fringilla est ullamcorper.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Id porta nibh
        venenatis cras sed. Nisl suscipit adipiscing bibendum est. Blandit
        libero volutpat sed cras. Volutpat consequat mauris nunc congue. Est
        ullamcorper eget nulla facilisi etiam. Enim ut sem viverra aliquet eget
        sit amet tellus cras. Nisi quis eleifend quam adipiscing vitae. Nunc
        pulvinar sapien et ligula. Sit amet luctus venenatis lectus magna
        fringilla urna porttitor rhoncus. Aliquam sem et tortor consequat id
        porta nibh venenatis cras. Ornare lectus sit amet est placerat. Et
        malesuada fames ac turpis. Enim praesent elementum facilisis leo vel
        fringilla est ullamcorper.
      </p>

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
