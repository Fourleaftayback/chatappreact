import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Col, Row } from "reactstrap";

const Message = ({ error, message }) => {
  return (
    <React.Fragment>
      <Row className="mt-2">
        <Col>
          <p
            className={classnames("text-center", {
              "text-danger": error,
              "text-dark": message
            })}>
            {message ? message : null}
            {error ? error : null}
          </p>
        </Col>
      </Row>
    </React.Fragment>
  );
};

Message.propTypes = {
  error: PropTypes.string,
  message: PropTypes.string
};

export default Message;
