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
    semster: "",
    conumber: "",
  });

  // Server-Start: node server.js

  const getStudents = () => {
    axios
      .get("http://localhost:3001/students/")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const addStudents = async () => {
    let student = {
      vorname: state.firstname,
      nachname: state.lastname,
      matrikelnummer: Number(state.conumber),
      semester: Number(state.semester),
    };

    await axios.post("http://localhost:3001/students/", student);
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
    }, 5000);
    return () => clearInterval(interval);
  }, [state, getStudents]);

  const handleChange = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };
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
      {/*  {state.students.map((i, k) => (
        <div key={k}>
          {i.vorname}
          {i.nachname}
        </div>
      ))} */}
    </>
  );
};
