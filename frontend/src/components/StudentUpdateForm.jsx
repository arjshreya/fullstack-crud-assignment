import { useState, useEffect } from "react";
import { updateStudent } from "../services/studentService";

function StudentUpdateForm({ selectedStudent, refresh, clear }) {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (selectedStudent && selectedStudent.id) {
      setStudent({ ...selectedStudent });
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!student || !student.id) {
      alert("Invalid student ID");
      return;
    }

    try {
      await updateStudent(student.id, student);
      refresh();
      clear();
    } catch (error) {
      alert("Update failed. Please check inputs.");
    }
  };

  if (!student) return null;

  return (
    <form onSubmit={handleUpdate}>
      <h3>Update Student</h3>
      <input name="name" value={student.name} onChange={handleChange} required />
      <input name="email" value={student.email} onChange={handleChange} required />
      <input name="course" value={student.course} onChange={handleChange} required />
      <input name="mobile" value={student.mobile} onChange={handleChange} required />
      <button type="submit">Update</button>
    </form>
  );
}

export default StudentUpdateForm;
