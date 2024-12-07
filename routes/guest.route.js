const { Router } = require("express");
const { AddGuest } = require("../controllers/guest.controllers");

const router = Router();

router.post("/addGuest", AddGuest);

module.exports = router;
