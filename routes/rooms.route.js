const { Router } = require("express");
const { addNewRoom } = require("../controllers/rooms.controllers");
const router = Router();

router.post("/addNewroom", addNewRoom);

module.exports = router;
