const Reservations = require("../models/reservations.model");

const makeReservation = async (req, res) => {
  try {
    const reservation = new Reservations(
      req.body.guest_id,
      req.body.room_id,
      req.body.check_in_date,
      req.body.check_out_date,
      req.body.status
    );
    await reservation.save();
    res.json(reservation);
  } catch (error) {
    res.json(error);
  }
};

const editReservation = async (req, res) => {
  try {
    await Reservations.editById(
      req.body.id,
      req.body.check_in_date,
      req.body.check_out_date,
      req.body.status
    );
    res.json("Succesfully updated");
  } catch (error) {
    res.json(error);
  }
};

const getUserByDate = async (req, res) => {
  try {
    const users = await Reservations.findUserByDate(req.body.date1,req.body.date2)
   
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};

const getRoomByDate = async (req, res) => {
  try {
    const users = await Reservations.findRoomByDate(req.body.date1,req.body.date2)
   
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};

const getUserByRoom = async (req, res) => {
  try {
    const users = await Reservations.findUserByRoom(req.body.date1,req.body.date2,req.body.room)
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};

const getUserByStatus = async (req, res) => {
  try {
    const users = await Reservations.findUserByStatus(req.body.status)
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};

const deleteReservation = async (req, res) => {
  try {
    await Reservations.deleteById(req.body.id);
    res.json("Successfully deleted");
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  makeReservation,
  editReservation,
  deleteReservation,
  getUserByDate,
  getRoomByDate,
  getUserByRoom,
  getUserByStatus
};
