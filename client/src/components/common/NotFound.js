import React from "react";

import { Row, Col, Badge } from "reactstrap";

const NotFound = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <h3 className="text-center mt-4 cus-text-light">404...</h3>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <i className="far fa-thumbs-down fa-5x text-warning mt-4" />
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="text-center mt-4 cus-text-light">
            Sorry the page you are looking for does not exist.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 className="text-center mt-3">
            <Badge href="/" color="info">
              Home
            </Badge>
          </h3>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default NotFound;
