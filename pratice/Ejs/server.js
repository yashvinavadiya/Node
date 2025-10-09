import express from "express";
import dotenv from "dotenv";
import path from "path";
import bodyparser from "express";

dotenv.config({
  path: "./.env",
});

let port = process.env.PORT || 3000;

let app = express();

app.set("view engine", "ejs");
app.set("views", path.join("views"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static("public"));

let tasks = [];

let nextId = 1;

console.log(tasks);

const todayStr = () => new Date().toISOString().slice(0, 10);

app.get("/", (req, res) => {
  res.render("index", { tasks });
});

// create tasks

app.post("/add", (req, res) => {
  const { title, dueDate } = req.body;
  tasks.push({ id: nextId++, title: title.trim(), dueDate});
  console.log(tasks);
  res.redirect("/");
});

// edit Task data show

app.get("/edit/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Task not Found!");
  res.render("edit", { task });
});

// delete task

app.get('/delete/:id' , (req , res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id))
  res.redirect('/')
})

// edit Task by Form

app.post('/edit/:id' , (req , res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id))
  if(!task) return res.status(404).send("Task not Found!");
  task.title = req.body.title.trim()
  task.dueDate = req.body.dueDate;
  res.redirect('/')
})

app.listen(port, (err) => {
  !err ? console.log(`server has been started on port ${port}`) : null;
});