const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/projects", require("./projects.routes"));
router.use("/user", require("./user.routes"));

module.exports = router;
