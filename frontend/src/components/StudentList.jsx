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
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [sortField, setSortField] = useState("id");
  const [sortDir, setSortDir] = useState("asc");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadStudents();
  }, [reload, page, sortField, sortDir]);

  const loadStudents = async () => {
    try {
      const res = await getStudents(
        page,
        size,
        `${sortField},${sortDir}`
      );
      setStudents(res.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      toast?.error("Failed to load students.");
      console.error(err);
    }
  };

  const filteredStudents = (students || []).filter((s) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      s.name.toLowerCase().includes(term) ||
      String(s.id).includes(term) ||
      s.course.toLowerCase().includes(term)
    );
  });

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term) {
      setSuggestions([]);
      return;
    }

    const matches = filteredStudents.slice(0, 5);
    setSuggestions(matches);
  };

  const handleSuggestionClick = (student) => {
    setSearchTerm(student.name);
    setSuggestions([]);
    setPage(0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSuggestions([]);
    setPage(0);
  };

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
      
      <div className="controls">
        
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

        <div className="sort-wrapper">
          <select
            value={`${sortField},${sortDir}`}
            onChange={(e) => {
              const [field, dir] = e.target.value.split(",");
              setSortField(field);
              setSortDir(dir);
              setPage(0);
            }}
          >
            <option value="id,asc">ID ↑</option>
            <option value="id,desc">ID ↓</option>
            <option value="name,asc">Name ↑</option>
            <option value="name,desc">Name ↓</option>
          </select>
        </div>
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
                <button className="edit-btn" onClick={() => onEdit(student)}>
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

      <div className="pagination">
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          disabled={page + 1 === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {viewStudent && (
        <StudentDetails
          student={viewStudent}
          onClose={() => setViewStudent(null)}
        />
      )}

      {deleteId && (
        <DeleteConfirm
          message="Are you sure you want to delete?"
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

export default StudentList;
