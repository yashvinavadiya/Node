import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // ✅ Import CSS

const API = "http://localhost:5000/students";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", course: "", email: "", gender: "" });
  const [editId, setEditId] = useState(null);

  // Fetch students
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get(API);
    setStudents(res.data);
  };

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update Student
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API, form);
    }
    setForm({ name: "", age: "", course: "", email: "", gender: "" });
    fetchStudents();
  };

  // Edit Student
  const handleEdit = (student) => {
    setForm(student);
    setEditId(student._id);
  };

  // Delete Student
  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchStudents();
  };

  return (
    <div className="container">
      <h2 className="title">🎓 Student Management</h2>

      <form className="student-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required />
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <select name="gender" value={form.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <button type="submit" className="btn primary">
          {editId ? "Update" : "Add"} Student
        </button>
      </form>

      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th><th>Age</th><th>Course</th><th>Email</th><th>Gender</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>{s.course}</td>
              <td>{s.email}</td>
              <td>{s.gender}</td>
              <td>
                <button className="btn edit" onClick={() => handleEdit(s)}>Edit</button>
                <button className="btn delete" onClick={() => handleDelete(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
