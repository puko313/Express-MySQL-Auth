
const validatorHandler = (req, res, next, schema) => {
    // next();
    const { error } = schema.validate(req.body);
    console.log(error)
    if (error) {
        res.status(400).json({
            status: 'error',
            message: "Invalid input"
        });
        return;
    }
    next();
};

module.exports = validatorHandler;