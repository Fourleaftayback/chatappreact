import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
//import PropTypes from "prop-types";
import { Container } from "reactstrap";

const Hub = () => {
  return (
    <Container>
      <h3>Landing after auth</h3>
    </Container>
  );
};

Hub.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hub);
