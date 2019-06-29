import React from "react";
import { Col, Row } from "reactstrap";

const FallBack = () => {
  return (
    <React.Fragment>
      <Row>
        <Col lg="6" className="m-auto">
          <h5 className="text-center cus-text-light">Something went wrong</h5>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FallBack;
