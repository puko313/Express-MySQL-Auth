const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const { isAuthenticated } = require('../middlewares/authenticate');
const {save:saveValidator} = require("../validators/pie");
const pieController = require('../controllers/pie.controller');


router.route('/:user_id/:pro_id').get(isAuthenticated, asyncHandler(pieController.getProjectById));
router.route('/:user_id').get(isAuthenticated, asyncHandler(pieController.getProjectList));
router.route('/').post(isAuthenticated,saveValidator, asyncHandler(pieController.save));
router.route('/').put(isAuthenticated, asyncHandler(pieController.save));

module.exports = router;