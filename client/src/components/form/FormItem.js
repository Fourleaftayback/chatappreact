import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { FormGroup, Input, Label } from "reactstrap";

const FormItem = ({
  name,
  type,
  placeholder,
  value,
  error,
  info,
  onChange,
  label
}) => {
  return (
    <FormGroup>
      {label && <Label>{label}</Label>}
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
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </FormGroup>
  );
};

FormItem.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string
};

export default FormItem;
