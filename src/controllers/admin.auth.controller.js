const User = require('../models/user.model');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken } = require('../utils/token');
const {ADMIN_ROLE, SUPER_ADMIN_ROLE, USER_ROLE} = require("../const/index");

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email.trim(), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: 'error',
          message: `User with email ${email} was not found`
        });
        return;
      }
      res.status(500).send({
        status: 'error',
        message: err.message
      });
      return;
    }
    if (data) {
      if (data.role < ADMIN_ROLE) {
        return res.status(401).send({
          status: 'error',
          message: "UnAuthorized User"
        });
      }
      if (comparePassword(password.trim(), data.password)) {
        const token = generateToken(data.id);
        res.status(200).send({
          status: 'success',
          data: {
            token,
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            company: data.company,
            url: data.url,
            tax_number: data.tax_number,
            email: data.email
          }
        });
        return;
      }
      res.status(499).send({
        status: 'error',
        message: 'Incorrect password'
      });
    }
  });

}