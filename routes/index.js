const router = require("express").Router();

router.use("/subjects", require("./subjects"));
router.use("/teachers", require("./teachers"));

module.exports = router;
