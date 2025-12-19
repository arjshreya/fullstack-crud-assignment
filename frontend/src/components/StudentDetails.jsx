import "./StudentDetails.css";

function StudentDetails({ student, onClose }) {
  if (!student) return null;

  return (
    <div className="details-modal-overlay">
      <div className="details-modal-content">
        <h3>Student Details</h3>
        <p><strong>ID:</strong> {student.id}</p>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Course:</strong> {student.course}</p>
        <p><strong>Mobile:</strong> {student.mobile}</p>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default StudentDetails;
