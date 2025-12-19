import { useState } from "react";
import { addStudent } from "../services/studentService";

function StudentForm({ refresh }) {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addStudent(student);
      refresh();
      setStudent({ name: "", email: "", course: "", mobile: "" });
    } catch (error) {
      alert("Invalid input. Please check all fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={student.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={student.email} onChange={handleChange} required />
      <input name="course" placeholder="Course" value={student.course} onChange={handleChange} required />
      <input name="mobile" placeholder="Mobile" value={student.mobile} onChange={handleChange} required />
      <button type="submit">Add Student</button>
    </form>
  );
}

export default StudentForm;
