function PasswordResetMessageUser(toEmail, token, url) {
  (this.to = toEmail),
  (this.from = process.env.SEND_GRID_EMAIL),
  (this.subject = `Reset Password Request from ChatApp`),
  (this.html = `<p>Please click on the following link, or paste this into your browser to complete the process: https://${url}/reset/${token}</p>`);
}

module.exports = {
  PasswordResetMessageUser
};