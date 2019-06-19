const EmailErrors = require("../models/EmailErrors");

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

export default function (email, errorPath) {
  sgMail
    .send(email)
    .then(() => {
      return res.status(200).json({
        email: "Confirmation sent to cient"
      });
    })
    .catch(err => {
      let emailErr = new EmailErrors(data.client_info.email, errorPath, err);
      emailErr.save();
      return res.status(400).json({
        errors: "Email was not sent"
      });
    });
}