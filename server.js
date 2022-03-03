const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const studentRoutes = require("./src/routes/routes");

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

mongoose
  .connect(
   
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MONGODB is connected"))
  .catch((err) => console.log(err));

const port = 3001;

app.use("/students", studentRoutes);

app.get("/", (req, res) => res.send("Rest api: /students"));

app.listen(port, () => console.log("Express is running at port " + port));
