const { Router } = require("express");
const {
  makeReservation,
  editReservation,
  deleteReservation,
  getUserByDate,
  getRoomByDate,
  getUserByRoom,
  getUserByStatus,
} = require("../controllers/reservations.controllers");
const router = Router();

router.post("/makeReservation", makeReservation);
router.put("/editReservation", editReservation);
router.post("/deleteReservation", deleteReservation);

router.get("/getUserByDate", getUserByDate);
router.get("/getRoomByDate", getRoomByDate);
router.get("/getUserByRoom", getUserByRoom);
router.get("/getUserByStatus", getUserByStatus);

module.exports = router;
