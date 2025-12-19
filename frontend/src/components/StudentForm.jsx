import { useState } from "react";
import { addStudent } from "../services/studentService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./StudentForm.css"

function StudentForm({ refresh, toast }) {
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
      toast.success("Student added successfully!");
      setStudent({ name: "", email: "", course: "", mobile: "" });
    } catch (error) {
      toast.error("Failed to add student. Check inputs.");
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={student.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={student.email} onChange={handleChange} required />
      <input name="course" placeholder="Course" value={student.course} onChange={handleChange} required />
      <input name="mobile" placeholder="Mobile" value={student.mobile} onChange={handleChange} required />
      <button type="submit">Add Student</button>
    </form>
  );
}

export default StudentForm;
