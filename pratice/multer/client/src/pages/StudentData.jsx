import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import { useEffect, useState } from "react";
import axios from "axios";
import Register from "./Register";
import Login from "./Login";

const API_URL = "http://localhost:5040/student";

const StudentData = () => {
  
  const [students, setStudents] = useState([]);

  const [editStudent, setEditStudent] = useState(null);

  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  const fetchStudent = async () => {
    if (!token) return;
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudent();
  }, [token]);

  const handleSave = async (student) => {
    if (student._id) {
      await axios.put(`${API_URL}/${student._id}`, student, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.post(API_URL, student, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    fetchStudent();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchStudent();
  };

  return (
    <div>
      <h1>StudentData</h1>
      {!token ? (
        <>
          <Register onSuccess={() => alert("Please login to continue")} />
          <Login onLogin={setUser} />
        </>
      ) : (
        <>
          <div>
            <span>Welcome{user?.name}</span>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setUser(null);
                setEditStudent([]);
              }}
            >
              Logout
            </button>
          </div>
          <StudentForm
            onSave={handleSave}
            editStudent={editStudent}
            setEditStudent={setEditStudent}
          />
          <StudentList
            students={students}
            onEdit={setEditStudent}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default StudentData;
