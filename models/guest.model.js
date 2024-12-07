const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");
module.exports = class Guest {
  constructor(name, phone, email, address) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.address = address;
  }
  async save() {
    const id = uuidv4();
    const created_at = new Date();
    console.log(created_at);
    const newGuest = await pool.query(
      `INSERT INTO public."Guests" (
      id,
      name,
      created_at,
      contact_info
      )   VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        id,
        this.name,
        created_at,
        JSON.stringify({
          phone: this.phone,
          email: this.email,
          address: this.address,
        }),
      ]
    );
    return newGuest.rows;
  }
};
