const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const { isAdmin } = require('../middlewares/authenticate');
const {signupAdmin: saveValidator} = require("../validators/auth");
const UserAdminController = require('../controllers/admin.user.controller');

router.route('/').get(isAdmin, asyncHandler(UserAdminController.getUsers));
router.route('/:id').get(isAdmin, asyncHandler(UserAdminController.getUser));
router.route('/').post(isAdmin,saveValidator, asyncHandler(UserAdminController.createUser));
router.route('/:id').put(isAdmin, saveValidator, asyncHandler(UserAdminController.updateUser));
router.route('/:id').delete(isAdmin, asyncHandler(UserAdminController.destroyUser));

module.exports = router;