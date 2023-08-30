const Joi = require('joi');
const validatorHandler = require('../middlewares/validatorHandler');

const save = (req, res, next) => {
    const schema = Joi.object().keys({
        user_id: Joi.string()
            .trim()
            .max(50)
            .required(),
        project_name: Joi.string()
            .trim()
            .max(50)
            .required(),
        pies:Joi.array()
    });
    validatorHandler(req, res, next, schema);
};

module.exports = {
    save
};