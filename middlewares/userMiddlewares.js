exports.updatePasswordValidation = (req, res, next) => {
  if (req.body.newPassword && req.body.confirmPassword) {
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({ msg: "Password didnt match" });
    } else if (req.body.newPassword.length < 8) {
      return res
        .status(400)
        .json({ errors: [{ msg: "password must be 8 characters long" }] });
    }
  }
  next();
};
