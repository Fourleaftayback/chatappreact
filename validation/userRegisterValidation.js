const Validator = require("validator");
const isEmpty = require("./isEmptyChecker");

module.exports = function validateRegInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.user_name = !isEmpty(data.user_name) ? data.user_name : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.email)) errors.email = "Email is required";

  if (!Validator.isEmail(data.email)) errors.email = "Email is invalid";

  if (Validator.isEmpty(data.user_name))
    errors.user_name = "User Name field is required";

  if (Validator.isEmpty(data.password))
    errors.password = "Password field is required";

  if (!Validator.isLength(data.password, {
      min: 6,
      max: 12
    }))
    errors.password = "Password must be at least 6 characters";

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  } else {
    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = "Passwords must match";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};