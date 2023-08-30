const User = require('../models/user.model');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken } = require('../utils/token');

exports.signup = (req, res) => {
    const { firstname, lastname, company, url, tax_number, email, password } = req.body;
    const hashedPassword = hashPassword(password.trim());
    const role = 0;
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
};

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
            res.status(401).send({
                status: 'error',
                message: 'Incorrect password'
            });
        }
    });

}