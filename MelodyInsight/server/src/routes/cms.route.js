const express = require("express");
const router = express.Router();
const routes = require('../config/route_config');

router.get("/", (_, res) => {
    res.send("Content Management System");
});

router.use(routes.USER_ROUTE, require("./user.route"));

module.exports = router;