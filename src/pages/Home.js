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
    editVorname: "",
    editName: "",
    search: "",
  });

  // Server-Start: node server.js

  const getStudents = () => {
    axios
      .get("http://localhost:3001/students/")
      .then((response) => setState({ ...state, students: response.data }))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (state?.students?.length) {
        return () => clearInterval(interval);
      } else {
        await getStudents();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [state.students]);

  const addStudents = async () => {
    let student = {
      vorname: state.firstname,
      nachname: state.lastname,
      matrikelnummer: Number(state.conumber),
      semester: Number(state.semester),
    };

    await axios
      .post("http://localhost:3001/students/add", student)
      .then((response) => getStudents())
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // Delete
  const handleDelete = async (id) => {
    console.log(id);
    await axios
      .delete(`http://localhost:3001/students/delete/${id}`)
      .then((response) => getStudents())
      .catch((err) => console.log(err));
  };

  // Edit Modus
  const handleEdit = (id) => {
    setState({ ...state, editModus: true, editId: id });
  };

  //Edit Back
  const handleBack = (id) => {
    setState({ ...state, editModus: false, editId: id });
  };

  // Change Vorname
  const handelEditChange = (e) => {
    e.preventDefault();
    setState({ ...state, editVorname: e.target.value });
    console.log(state.editVorname);
  };

  // Change Name
  const handelEditChangeName = (e) => {
    e.preventDefault();
    setState({ ...state, editName: e.target.value });
    console.log("name" + state.editName);
  };

  // Save
  const handleSave = async (id) => {
    await axios
      .post(`http://localhost:3001/students/update/${id}`, {
        vorname: state.editVorname,
        nachname: state.editName,
      })
      .then((response) => setState({ editModus: false }), getStudents())
      .catch((err) => console.log(err));
  };

  //Edit Name
  const handleEditName = (id) => {
    setState({ ...state, editModus: true, editId: id });
  };

  //search
  const handleSearch = (e) => {
    e.preventDefault();
    setState({ ...state, search: e.target.value });
    //console.log(state.search);
  };

  console.log("students " + state.search);
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
      <div>
        <input onChange={(e) => handleSearch(e)} />
      </div>

      {state.students
        ?.slice()
        .reverse()
        .map((i, k) => {
          if (
            i.vorname.toLowerCase().includes(state.search.toLowerCase()) ||
            !state.search ||
            i.nachname.toLowerCase().includes(state.search.toLowerCase()) ||
            String(i._id).toLowerCase().includes(state.search.toLowerCase())
          ) {
            return (
              <div key={k}>
                {console.log(state.editId)}
                {state.editModus && i._id === state.editId ? (
                  <div key={k}>
                    <input
                      value={state.editVorname}
                      onChange={(e) => handelEditChange(e)}
                    />
                    <input
                      value={state.editName}
                      onChange={(e) => handelEditChangeName(e)}
                    />
                    <button onClick={() => handleSave(i._id)}>Save</button>
                    <button onClick={() => handleBack(i._id)}>Back</button>
                  </div>
                ) : (
                  <div key={k}>
                    <b> id: </b> {i._id}
                    <b>&nbsp; Vorname:</b> {i.vorname}
                    <b> &nbsp; Nachname: </b>
                    {i.nachname}
                    <b>&nbsp; Matrikelnummer: </b> {i.matrikelnummer}
                    <b>&nbsp; Semster: </b>
                    {i.semester}&nbsp;
                    {/* Fileupload */}
                    <input type="file" id="myFile" name="filename" />
                    <br />
                    <button onClick={() => handleDelete(i._id)}>X</button>
                    <button onClick={() => handleEdit(i._id)}>Edit</button>
                    <hr />
                  </div>
                )}
              </div>
            );
          }
        })}
    </>
  );
};
