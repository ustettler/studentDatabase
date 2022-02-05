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

module.exports = router;
