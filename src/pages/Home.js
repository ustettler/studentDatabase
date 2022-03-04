import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";

export const Home = () => {
  const [state, setState] = useState({
    students: [],
    firstname: "",
    lastname: "",
    semester: "",
    conumber: "",
    editModus: false,
    editId: 0,
  });

  // Server-Start: node server.js

  const getStudents = () => {
    axios
      .get("http://localhost:3001/students/")
      .then((response) => setState({ ...state, students: response.data }))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (state?.students.length) {
        return () => clearInterval(interval);
      } else {
        if (!state?.students.length) {
          getStudents();
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [state, getStudents]);

  const addStudents = async () => {
    let student = {
      vorname: state.firstname,
      nachname: state.lastname,
      matrikelnummer: Number(state.conumber),
      semester: Number(state.semester),
    };

    await axios.post("http://localhost:3001/students/", student);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // Delete
  const handleDelete = (id) => {
    const result = state.students.filter((i) => i.id !== id);
    setState({ ...state, students: result });
  };

  // Edit Modus
  const handleEdit = (id) => {
    setState({ ...state, editModus: true, editId: id });
  };

  // Change
  const handelEditChange = (e) => {
    e.preventDefault();
    setState({ ...state, vorname: e.target.value });
    console.log(state.stat);
  };

  // Save
  const handleSave = (id) => {
    state.students.forEach((elemente) => {
      if (id === elemente.id) {
        elemente.students = state.students;
        setState({ ...state, students: state.students, editModus: false });
        //console.log(elemente);
      }
    });
  };

  //onsole.log(state.students);
  //Renderer
  return (
    <>
      <h1>Student's Database</h1>

      <Box
        sx={{
          alignItems: "center",
          "& > :not(style)": { m: 1 },
        }}
      >
        <TextField
          id="demo-helper-text-aligned"
          label="Firstname"
          name="firstname"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <TextField
          id="demo-helper-text-aligned"
          label="Lastname"
          name="lastname"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <TextField
          id="demo-helper-text-aligned"
          type="number"
          label="Cadastral No."
          name="conumber"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <TextField
          id="demo-helper-text-aligned"
          type="number"
          label="Semester"
          name="semester"
          onChange={(e) => handleChange(e)}
        />
      </Box>
      <br />
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => addStudents()}>
          Add new Student
        </Button>
      </Stack>

      <h2>Student's List</h2>

      {state.students
        .slice()
        .reverse()
        .map((i, k) => (
          <div key={k}>
            {state.editModus && i.id === state.editId ? (
              <div key={k}>
                <input
                  value={i.vorname}
                  onChange={(e) => handelEditChange(e)}
                />
                <button onClick={() => handleSave(i.id)}>Save</button>
              </div>
            ) : (
              <div key={k}>
                id: {i._id}&nbsp; Vorname:{i.vorname}&nbsp; Nachname:{" "}
                {i.nachname}
                &nbsp; Matrikelnummer: {i.matrikelnummer}&nbsp; Semster:
                {i.semester}
                <button onClick={() => handleDelete(i.id)}>X</button>
                <button onClick={() => handleEdit()}>Edit</button>
              </div>
            )}
          </div>
        ))}
    </>
  );
};
