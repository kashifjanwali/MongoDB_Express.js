const Express = require("express");
const app = Express();
const Joi = require("joi");
app.use(Express.json());

const port = 5001;

const courses = [
  {
    id: "cse-21",
    name: "Web Technology Laboratory",
    code: "CSE21",
  },
  {
    id: "cse-33",
    name: "Software Engineering Laboratory",
    code: "CSE33",
  },
];

app.get("/api/courses/", (req, res) => {
  res.status(200).send(courses);
}); 

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) {
    return res.status(404).send("The course with id not found");
  }
  res.send(course);
});

app.post("/api/courses/", (req, res) => {
  //   const result = validateCource(req.body);
  //object Destructing
  const { error } = validateCource(req.body); // result.error
  if (error) {
    return res.status(400).send(error);
  }
  const course = {
    id: req.body.id,
    name: req.body.name,
    code: req.body.code,
  };
  courses.push(course);
  res.send(courses);
});

app.put("/api/courses/:id", (req, res) => {
  //Look Up the Course
  //If Not Exists Return 404
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) {
    return res.status(404).send("The course with id not found");
  }

  //Validate
  //if invalidate return 400 - bad request
  // const result = validateCource(req.body);
  const { error } = validateCource(req.body); // result.error
  if (error) {
    return res.status(400).send(result.error);
  }

  //update course
  //return courses
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) {
    return res.status(404).send("The course with id not found");
  }
  const index = courses.indexOf(course);

  courses.splice(index, 1);
  res.send(courses);
});

function validateCource(course) {
  const schema = {
    id: Joi.string().min(2).required(),
    name: Joi.string().min(3).required(),
    code: Joi.string().min(2),
  };
  return Joi.validate(course, schema);
}

app.listen(port, () => {
  console.log("server is running on port" + " " + port);
});
