const Joi = require('joi');
const validatorHandler = require('../middlewares/validatorHandler');

const signup = (req, res, next) => {
    const schema = Joi.object().keys({
        firstname: Joi.string()
            .trim()
            .alphanum()
            .max(50)
            .required(),
        lastname: Joi.string()
            .trim()
            .alphanum()
            .max(50)
            .required(),
        company: Joi.string()
            .trim()
            .max(50),
        url: Joi.string()
            .trim()
            .max(50),
        tax_number: Joi.string()
            .trim()
            .max(50),
        email: Joi.string()
            .trim()
            .email()
            .required(),
        password: Joi.string()
            .trim()
            .pattern(new RegExp('^[a-zA-Z0-9]{1,30}$'))
            .required()
    });
    validatorHandler(req, res, next, schema);
};
const signupAdmin = (req, res, next) => {
    const schema = Joi.object().keys({
        firstname: Joi.string()
            .trim()
            .alphanum()
            .max(50)
            .required(),
        lastname: Joi.string()
            .trim()
            .alphanum()
            .max(50)
            .required(),
        company: Joi.string()
            .trim()
            .max(50),
        url: Joi.string()
            .trim()
            .max(50),
        tax_number: Joi.string()
            .trim()
            .max(50),
        email: Joi.string()
            .trim()
            .email()
            .required(),
        role: Joi.number()
            .required(),
        password: Joi.string()
            .trim()
            .pattern(new RegExp('^[a-zA-Z0-9]{1,30}$'))
            .required()
    });
    validatorHandler(req, res, next, schema);
};

const signin = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string()
            .trim()
            .email()
            .required(),
        password: Joi.string()
            .trim()
            .pattern(new RegExp('^[a-zA-Z0-9]{1,30}$'))
            .required()
    });
    validatorHandler(req, res, next, schema);
};

module.exports = {
    signup,
    signin,
    signupAdmin
};