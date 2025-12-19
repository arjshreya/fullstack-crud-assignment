import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../services/studentService";
import StudentDetails from "./StudentDetails";
import DeleteConfirm from "./DeleteConfirm";
import "./StudentList.css";

function StudentList({ reload, onEdit, toast }) {
  const [students, setStudents] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    loadStudents();
  }, [reload]);

  const loadStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      toast?.error("Failed to load students.");
      console.error(err);
    }
  };

  // Update suggestions as user types
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term) {
      setSuggestions([]);
      return;
    }

    const matches = students.filter(
      (s) =>
        s.name.toLowerCase().includes(term.toLowerCase()) ||
        String(s.id).includes(term) ||
        s.course.toLowerCase().includes(term.toLowerCase())
    );

    setSuggestions(matches.slice(0, 5)); // show top 5
  };

  // Suggestion clicked
  const handleSuggestionClick = (student) => {
    setSearchTerm(student.name);
    setSuggestions([]);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSuggestions([]); // hide suggestions on submit
  };

  const filteredStudents = students.filter((s) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      s.name.toLowerCase().includes(term) ||
      String(s.id).includes(term) ||
      s.course.toLowerCase().includes(term)
    );
  });

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      toast?.success("Student deleted successfully!");
    } catch (err) {
      toast?.error("Failed to delete student.");
    }
    setDeleteId(null);
  };

  return (
    <div className="student-list-container">
      {/* Search Input + Suggestions */}
      <div className="search-wrapper">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search by Name, ID, or Course"
            value={searchTerm}
            onChange={handleSearchChange}
            onBlur={() => setTimeout(() => setSuggestions([]), 100)}
            className="search-input"
          />
          <button type="submit">Search</button>
        </form>

        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((s) => (
              <li key={s.id} onClick={() => handleSuggestionClick(s)}>
                {s.name} - {s.course} (ID: {s.id})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Student Table */}
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>{student.mobile}</td>
              <td>
                <button
                  className="view-btn"
                  onClick={() => setViewStudent(student)}
                >
                  View
                </button>
                <button
                  className="edit-btn"
                  onClick={() => onEdit(student)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => setDeleteId(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Modal */}
      {viewStudent && (
        <StudentDetails
          student={viewStudent}
          onClose={() => setViewStudent(null)}
        />
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <DeleteConfirm
          message="Are you sure?"
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

export default StudentList;
