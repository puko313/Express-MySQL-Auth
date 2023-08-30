const express = require('express');
const authRoutes = require('./auth.route');
const pieRoutes = require('./pie.route');
const authAdminRoutes = require("./auth.admin.route")
const userAdminRoutes = require("./user.admin.route")

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/pies', pieRoutes);
router.use("/admin/auth", authAdminRoutes);
router.use("/admin/user", userAdminRoutes);

module.exports = router;