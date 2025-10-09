import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const DATA_FILE = path.join(__dirname, "students.json");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// Utility: load & save
const loadStudents = () => {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
};

const saveStudents = (students) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2));
};

// Ensure file exists
if (!fs.existsSync(DATA_FILE)) saveStudents([]);

// Routes

// Home -> list students
app.get("/", (req, res) => {
  const students = loadStudents();
  res.render("index", { students });
});

// Show create form
app.get("/students/new", (req, res) => {
  res.render("new");
});

// Create student
app.post("/students", (req, res) => {
  const { name, age, course, email, gender } = req.body;
  // basic validation
  if (!name || !age || !course || !email || !gender) {
    return res.status(400).send("All fields required");
  }

  const students = loadStudents();
  const id = Date.now().toString(); // simple unique id
  students.push({ id, name, age, course, email, gender });
  saveStudents(students);
  res.redirect("/");
});

// View single student
app.get("/students/:id", (req, res) => {
  const students = loadStudents();
  const student = students.find((s) => s.id === req.params.id);
  if (!student) return res.status(404).send("Student not found");
  res.render("show", { student });
});

// Edit form (not id)
app.get("/students/:id/edit", (req, res) => {
  const students = loadStudents();
  const student = students.find((s) => s.id === req.params.id);
  if (!student) return res.status(404).send("Student not found");
  res.render("edit", { student });
});

// Update student (we do not allow changing id)
app.post("/students/:id/update", (req, res) => {
  const { name, age, course, email, gender } = req.body;
  const students = loadStudents();
  const idx = students.findIndex((s) => s.id === req.params.id);
  if (idx === -1) return res.status(404).send("Student not found");

  // update allowed fields
  students[idx] = {
    ...students[idx],
    name,
    age,
    course,
    email,
    gender,
  };
  saveStudents(students);
  res.redirect("/");
});

// Delete student
app.post("/students/:id/delete", (req, res) => {
  let students = loadStudents();
  students = students.filter((s) => s.id !== req.params.id);
  saveStudents(students);
  res.redirect("/");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
