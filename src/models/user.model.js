const db = require('../config/db.config');
const { createNewUser: createNewUserQuery, findUserByEmail: findUserByEmailQuery, findUserById } = require('../database/queries');
const { logger } = require('../utils/logger');

class User {
    constructor(firstname, lastname,company, url, tax_number, email, role, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.company = company;
        this.url = url;
        this.tax_number = tax_number;
        this.email = email;
        this.role = role;
        this.password = password;
    }

    static create(newUser, cb) {
        db.query(createNewUserQuery, 
            [
                newUser.firstname, 
                newUser.lastname,
                newUser.company, 
                newUser.url, 
                newUser.tax_number, 
                newUser.email,
                newUser.role, 
                newUser.password
            ], (err, res) => {
                if (err) {                    
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    company: newUser.company,
                    url: newUser.url,
                    tax_number:newUser.tax_number,
                    role:newUser.role,
                    email: newUser.email
                });
        });
    }

    static findByEmail(email, cb) {
        db.query(findUserByEmailQuery, email, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }
    static findById(id, cb) {
        db.query(findUserById, id, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }
}

module.exports = User;