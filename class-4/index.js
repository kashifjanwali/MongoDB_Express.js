

const express = require("express");
const morgan = require("morgan");
const app = new express();
const debug = require("debug")("app:startapp");

// Middleware Functions
// req.body
app.use(express.json());
app.use(morgan("tiny"));

app.use(express.static("public"));

debug("This is debugger");


const course = [
  { id: 123, name: "kashif", age: 25 },
  { id: 123, name: "kashif", age: 25 },
];

app.get("/", (req, res) => {
  res.send(course);
});

app.listen(5000, () => {
  console.log("server is running....");
});
