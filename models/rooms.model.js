const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");
module.exports = class Rooms {
  constructor(number, type, price) {
    (this.number = number), (this.type = type), (this.price = price);
  }
  async save() {
    try {
      const id = uuidv4();
      const created_at = new Date();
      const newRoom = await pool.query(
        `INSERT INTO public."Rooms" (id,room_number,room_type,price_per_night,created_at) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [id, this.number, this.type, this.price, created_at]
      );
      return newRoom.rows;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};
