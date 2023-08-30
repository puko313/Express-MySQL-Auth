const User = require('../models/user.model');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken } = require('../utils/token');
const { _db } = require('../helpers/db_helper');

exports.createUser = async (req, res) => {
  const { firstname, lastname, company, url, tax_number, role, email } = req.body;
  const password = "1234";
  const hashedPassword = hashPassword(password.trim());

  const user = new User(firstname.trim(), lastname.trim(), company.trim(), url.trim(), tax_number.trim(), email.trim(), role, hashedPassword);

  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err.message
      });

    } else {
      const token = generateToken(data.id);
      res.status(201).send({
        status: "success",
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
    }
  });
}

exports.getUsers = async (req, res) => {
  _db('SELECT * FROM users', (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.send({
          status: 'error',
          message: 'No matching data found'
        });
        return;
      }
      res.status(500).send({
        status: 'error',
        message: err.message
      });
      return;
    } else {
      res.status(200).send({
        status: "success",
        data
      });
    }
  })
}
exports.getUser = async (req, res) => {
  let id = req.params.id;
  _db('SELECT * FROM users WHERE id=?', id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.send({
          status: 'error',
          message: 'No matching data found'
        });
        return;
      }
      res.status(500).send({
        status: 'error',
        message: err.message
      });
      return;
    } else {
      console.log(data)
      res.status(200).send({
        status: "success",
        data: data[0]
      });
    }
  })
}

exports.updateUser = async (req, res) => {
  let id = req.params.id;
  const { firstname, lastname, company, url, tax_number, role, email, password } = req.body;
  const hashedPassword = hashPassword(password.trim());
  let data = [
    firstname.trim(),
    lastname.trim(),
    company.trim(),
    url.trim(),
    tax_number.trim(),
    email.trim(),
    role,
    hashedPassword,
    id
  ]
  _db('UPDATE users SET firstname=?, lastname=?, company=?, url=?, tax_number=?, email=?, role=?, password=? WHERE id=?',
    data,
    (err, data) => {
      if (err) {
        console.log(err)
        if (err.kind === 'not_found') {
          res.status(404).send({
            status: 'error',
            message: 'No matching data found'
          });
          return;
        }
        res.status(500).send({
          status: 'error',
          message: err.message
        });
        return;
      } else {
        res.status(204).send({
          status: "success",
          data: {
            data
          }
        });
      }
    })
}
exports.destroyUser = async (req, res) => {
  let id = req.params.id;
  _db('DELETE FROM users WHERE id=?', id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          status: 'error',
          message: 'No matching data found'
        });
        return;
      }
      res.status(500).send({
        status: 'error',
        message: err.message
      });
      return;
    } else {
      res.status(204).send({
        status: "success",
        data: {
          data
        }
      });
    }
  })
}
