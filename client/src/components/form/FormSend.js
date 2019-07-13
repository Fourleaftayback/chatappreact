import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Button
} from "reactstrap";

const FormSend = ({ name, type, placeholder, value, error, onChange , onClick}) => {
  return (
    <React.Fragment>
      <FormGroup>
        <InputGroup>
          <Input
            type={type}
            className={classnames("form-control", {
              "is-invalid": error
            })}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
          />
          <InputGroupAddon addonType="append">
            <Button
              color="info"
              block={false}
              onClick={onClick}>
              Send
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
    </React.Fragment>
  );
};

FormSend.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string
};

export default FormSend;
