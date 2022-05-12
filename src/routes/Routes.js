const { SelectUnstyledContext } = require("@mui/base");
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

router.post("/add", async (req, res) => {
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

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    await Student.deleteOne({ _id: id });
    res.status(200).json({ message: "Eintrag erfolgreich gelöscht!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { vorname, nachname } = req.body;
  console.log(req.params);
  console.log(req.body);
  try {
    const updatedStudent = await Student.findById(id);
    console.log(updatedStudent);
    updatedStudent.vorname = vorname ? vorname : updatedStudent.vorname;

    updatedStudent.save();
    return res.status(200).json({ message: "Eintrag erfolgreich geändert!" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
