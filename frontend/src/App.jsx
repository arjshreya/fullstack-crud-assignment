import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import StudentUpdateForm from "./components/StudentUpdateForm";

import './App.css'

function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [reload, setReload] = useState(false);

  const refresh = () => setReload(!reload);

    return (
    <div>
      <h1>Student Management</h1>

      <StudentForm refresh={refresh} />

      {selectedStudent && (
        <StudentUpdateForm
          selectedStudent={selectedStudent}
          refresh={refresh}
          clear={() => setSelectedStudent(null)}
        />
      )}

      <StudentList reload={reload} onEdit={setSelectedStudent} />
    </div>
  );
}

export default App
