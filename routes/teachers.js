const router = require("express").Router();
const pool = require("../config/db.js");

// Get all teachers

router.get("/", async (req, res) => {
  try {
    const teachers = await pool.query("SELECT * FROM teachers");

    res.status(200).json(teachers.rows);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// Get a teacher

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await pool.query(
      "SELECT * FROM teachers LEFT JOIN subjects ON subjects.id = teachers.subject_id WHERE teachers.id=$1",
      [id]
    );

    res.status(200).json(teacher.rows[0]);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// Create a teacher

router.post("/", async (req, res) => {
  try {
    const { teacher_name, degree, subject_id } = req.body;

    const newTeacher = await pool.query(
      "INSERT INTO teachers (teacher_name, degree, subject_id) VALUES ($1, $2, $3) RETURNING *",
      [teacher_name, degree, subject_id]
    );

    res.status(201).json({ msg: "New teacher has been created successfully!" });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// Update a teacher

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { teacher_name, degree, subject_id } = req.body;

    const oldTeacher = await pool.query("SELECT * FROM teachers WHERE id=$1", [
      id,
    ]);

    const updateTeacher = pool.query(
      "UPDATE teachers SET teacher_name = $1, degree = $2, subject_id = $3 RETURNING *",
      [
        teacher_name ? teacher_name : oldTeacher.rows[0].teacher_name,
        degree ? degree : oldTeacher.rows[0].degree,
        subject_id ? subject_id : oldTeacher.rows[0].subject_id,
      ]
    );

    res.status(200).json({ msg: "Teacher has been updated successfully!" });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// Delete a teacher

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM teachers WHERE id=$1", [id]);

    res.status(200).json({ msg: "Teacher has been deleted successfully!" });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
