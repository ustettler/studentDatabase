import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";

export const Home = () => {
  const [state, setState] = useState({
    students: [],
  });

  // Server-Start: node server.js

  const getStudents = () => {
    axios
      .get("http://localhost:3001/")
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
    }, 5000);
    return () => clearInterval(interval);
  }, [state, getStudents]);

  const handleChange = (e) => {};
  //Renderer
  return (
    <>
      <h1>Student's Database</h1>
      {/*  {state.students.map((i, k) => (
        <div key={k}>
          {i.vorname}
          {i.nachname}
        </div>
      ))} */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          "& > :not(style)": { m: 1 },
        }}
      >
        <TextField
          helperText="Please enter the Firstname"
          id="demo-helper-text-aligned"
          label="Firstname"
          onChange={() => handleChange()}
        />

        <TextField
          helperText="Please enter the Lastname"
          id="demo-helper-text-aligned"
          label="Lastname"
          onChange={() => handleChange()}
        />

        <TextField
          helperText="Please enter the cadastral number"
          id="demo-helper-text-aligned"
          label="cadastral number"
          onChange={() => handleChange()}
        />

        <TextField
          helperText="Please enter the semester"
          id="demo-helper-text-aligned"
          label="semester"
          onChange={() => handleChange()}
        />
      </Box>
      <br />
      <Stack spacing={2} direction="row">
        <Button variant="contained">Add Student</Button>
      </Stack>
    </>
  );
};
