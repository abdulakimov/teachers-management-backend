const router = require("express").Router();
const pool = require("../config/db");

// Get all subjects

router.get("/", async (req, res) => {
  try {
    const subjects = await pool.query("SELECT * FROM subjects");

    res.status(200).json(subjects.rows);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// Get a subject

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await pool.query("SELECT * FROM subjects WHERE id=$1", [
      id,
    ]);

    res.status(200).json(subject.rows[0]);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// Create a subject

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const newSubject = pool.query(
      "INSERT INTO subjects (name) VALUES ($1) RETURNING *",
      [name]
    );

    res.status(201).json(newSubject);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// Update a subject

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedSubject = await pool.query(
      "UPDATE subjects SET name=$1 WHERE id=$2 RETURNING *",
      [name, id]
    );

    res.status(200).json({ msg: "Subject has been updated!" });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// Delete a subject

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM teachers WHERE subject_id=$1", [id]);
    await pool.query("DELETE FROM subjects WHERE id=$1", [id]);

    res.status(200).json({ msg: "Subject deleted successfully!" });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
