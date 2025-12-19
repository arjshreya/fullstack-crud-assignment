import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../services/studentService";

function StudentList({ reload, onEdit }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, [reload]);

  const loadStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;

    try {
      await deleteStudent(Number(id));
      loadStudents();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Course</th>
          <th>Mobile</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.map(student => (
          <tr key={student.id ?? Math.random()}>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.course}</td>
            <td>{student.mobile}</td>
            <td>
              <button onClick={() => onEdit(student)}>Edit</button>
              <button onClick={() => handleDelete(student.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentList;
