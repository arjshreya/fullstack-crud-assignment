import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import StudentForm from "./components/StudentForm";
import StudentUpdateForm from "./components/StudentUpdateForm";
import StudentList from "./components/StudentList";
import "./App.css";

function App() {
  const [reload, setReload] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const triggerReload = () => setReload(!reload);
  const clearSelection = () => setSelectedStudent(null);

  return (
    <div className="app-container">
      <header>
        <h1>Student Management System</h1>
      </header>

      <main>
        <div className="form-section">
          <StudentForm refresh={triggerReload} toast={toast} />
        </div>

        <div className="list-section">
          <StudentList reload={reload} onEdit={setSelectedStudent} toast={toast} />
        </div>

        {/* Update Form Modal */}
        {selectedStudent && (
          <StudentUpdateForm
            selectedStudent={selectedStudent}
            refresh={triggerReload}
            clear={clearSelection}
            toast={toast}
          />
        )}
      </main>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
