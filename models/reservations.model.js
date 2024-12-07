const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");
module.exports = class Reservations {
  constructor(guest_id, room_id, entry, finish, status) {
    (this.guest_id = guest_id),
      (this.room_id = room_id),
      (this.entry = entry),
      (this.finish = finish),
      (this.status = status);
  }
  async save() {
    try {
      const id = uuidv4();
      const created_at = new Date();
      const reservation = await pool.query(
        `INSERT INTO public."Reservations" (id,guest_id,room_id,check_in_date,check_out_date,enum,created_at) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [
          id,
          this.guest_id,
          this.room_id,
          this.entry,
          this.finish,
          this.status,
          created_at,
        ]
      );

      return reservation.rows;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async findUserByDate(entry, finish) {
    try {
      const users = await pool.query(
        `SELECT 
	public."Guests".name,
	check_in_date,
	check_out_date,
	enum
	FROM public."Reservations"
JOIN public."Guests"
ON 	public."Reservations".guest_id=public."Guests".id
	
WHERE check_in_date>=$1 AND check_in_date<=$2 `,
        [entry, finish]
      );
      return users.rows;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async findRoomByDate(entry, finish) {
    try {
      const users = await pool.query(
        `SELECT 
	public."Rooms".room_number,
    public."Rooms".room_type,
    public."Rooms".price_per_night,
	check_in_date,
	check_out_date
	FROM public."Reservations"

JOIN public."Rooms"
ON  public."Reservations".room_id=public."Rooms".id	
JOIN public."Guests"
ON 	public."Reservations".guest_id=public."Guests".id	
	
WHERE check_in_date<$1 OR check_in_date>$2 `,
        [entry, finish]
      );
      return users.rows;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async findUserByRoom(entry, finish, room) {
    try {
      const users = await pool.query(
        `SELECT 
	public."Guests".name,
	public."Rooms".room_number,
    check_in_date,
	check_out_date
	FROM public."Reservations"

JOIN public."Rooms"
ON  public."Reservations".room_id=public."Rooms".id	
JOIN public."Guests"
ON 	public."Reservations".guest_id=public."Guests".id		
	
WHERE (check_in_date>=$1 OR check_in_date<=$2) AND (public."Rooms".room_number=$3) `,
        [entry, finish, room]
      );
      return users.rows;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async findUserByStatus(status) {
    try {
      const users = await pool.query(
        `SELECT 
	public."Guests".name,
	
	check_in_date,
	check_out_date,
	enum
	FROM public."Reservations"
JOIN public."Guests"
ON 	public."Reservations".guest_id=public."Guests".id			
	
WHERE (enum =$1)AND(check_in_date is null) `,
        [status]
      );
      return users.rows;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async editById(id, entry, finish, status) {
    try {
      const updated_at = new Date();
      await pool.query(
        `UPDATE public."Reservations" SET check_in_date=$1, 
        check_out_date=$2, enum=$3, updated_at=$4 WHERE id=$5 `,
        [entry, finish, status, updated_at, id]
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async deleteById(id) {
    try {
      await pool.query(`DELETE FROM public."Reservations" WHERE id=$1 `, [id]);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async findStudent(schedule) {
    try {
      const students = await pool.query(
        `SELECT public."Students".name FROM public."Enrollments"
JOIN public."Students" ON public."Enrollments".student_id = public."Students".id
JOIN public."Courses" ON public."Enrollments".course_id = public."Courses".id
WHERE schedule=$1 `,
        [schedule]
      );
      return students.rows;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async findCourse(number) {
    try {
      const courses = await pool.query(
        `SELECT public."Courses".course_name FROM public."Enrollments"
JOIN public."Students" ON public."Enrollments".student_id = public."Students".id
JOIN public."Courses" ON public."Enrollments".course_id = public."Courses".id
WHERE max_students<$1 `,
        [number]
      );
      console.log(courses.rows);

      return courses.rows;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async findStudentByNumber(number) {
    try {
      const courses = await pool.query(
        `SELECT public."Students".name FROM public."Enrollments"
JOIN public."Students" ON public."Enrollments".student_id = public."Students".id
JOIN public."Courses" ON public."Enrollments".course_id = public."Courses".id
WHERE max_students=$1 `,
        [number]
      );
      console.log(courses.rows);

      return courses.rows;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};
