const { Router } = require("express");
const Student = require("../model/StudentScheme");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const student = await Student.find();
    if (!student) {
      throw new Error("No Students");
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { vorname, nachname, matrikelnummer, semester } = req.body;

  const newStudent = new Student({
    vorname,
    nachname,
    matrikelnummer,
    semester,
  });
  console.log(req.body);

  try {
    const student = await newStudent.save();
    if (!student) {
      throw new Error("Failed to add a student");
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
