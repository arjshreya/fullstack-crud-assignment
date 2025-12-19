import { useState } from "react";
import { addStudent } from "../services/studentService";
import "./StudentForm.css";

function StudentForm({ refresh, toast }) {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};

    if (!student.name.trim()) errs.name = "Name is required";

    if (!student.email) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(student.email)) {
      errs.email = "Invalid email format";
    }

    if (!student.course.trim()) errs.course = "Course is required";

    if (!student.mobile) {
      errs.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(student.mobile)) {
      errs.mobile = "Mobile must be 10 digits";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await addStudent(student);
      refresh();
      toast.success("Student added successfully!");
      setStudent({ name: "", email: "", course: "", mobile: "" });
      setErrors({});
    } catch {
      toast.error("Failed to add student");
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h3>Add Student</h3>

      <input name="name" placeholder="Name" value={student.name} onChange={handleChange} />
      {errors.name && <span className="error">{errors.name}</span>}

      <input name="email" placeholder="Email" value={student.email} onChange={handleChange} />
      {errors.email && <span className="error">{errors.email}</span>}

      <input name="course" placeholder="Course" value={student.course} onChange={handleChange} />
      {errors.course && <span className="error">{errors.course}</span>}

      <input name="mobile" placeholder="Mobile" value={student.mobile} onChange={handleChange} />
      {errors.mobile && <span className="error">{errors.mobile}</span>}

      <button type="submit">Add Student</button>
    </form>
  );
}

export default StudentForm;
