const { Schema, model } = require("mongoose");

const StudentSchema = new Schema({
  vorname: {
    type: String,
    required: true,
  },
  nachname: {
    type: String,
    required: true,
  },
  matrikelnummer: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
});

const Student = model("Student", StudentSchema);

module.exports = Student;
