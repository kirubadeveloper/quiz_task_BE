const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();
const db = require("./db");
const todoRoutes = require("./routes/todoRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

const port = 5000;

db()
  .then(() => {
    app.use("/api", todoRoutes);
    
    app.listen(port, () => {
      console.log(`Server running on port : ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });
