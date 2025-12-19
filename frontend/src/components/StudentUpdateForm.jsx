import { useState, useEffect } from "react";
import { updateStudent } from "../services/studentService";
import "./StudentUpdateForm.css";

function StudentUpdateForm({ selectedStudent, refresh, clear, toast }) {
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
      toast.success("Student updated successfully!");
      setStudent(null);
    } catch (error) {
      toast.error("Update failed. Check inputs.");
    }
  };

  if (!student) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form className="student-update-form" onSubmit={handleUpdate}>
          <h3>Update Student</h3>
          <input name="name" value={student.name} onChange={handleChange} required />
          <input name="email" value={student.email} onChange={handleChange} required />
          <input name="course" value={student.course} onChange={handleChange} required />
          <input name="mobile" value={student.mobile} onChange={handleChange} required />
          <div className="modal-buttons">
            <button type="submit">Update</button>
            <button type="button" onClick={clear} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentUpdateForm;
