const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
const adminAuthController = require('../controllers/admin.auth.controller');


router.route('/login')
    .post(signinValidator, asyncHandler(adminAuthController.signin));

module.exports = router;