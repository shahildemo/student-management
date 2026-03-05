import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import StudentList from './pages/StudentList';
import EditStudent from './pages/EditStudent';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);

  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now() }]);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const updateStudent = (updatedStudent) => {
    setStudents(
      students.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard students={students} />} />
            <Route
              path="/add"
              element={<AddStudent addStudent={addStudent} />}
            />
            <Route
              path="/students"
              element={
                <StudentList
                  students={students}
                  deleteStudent={deleteStudent}
                />
              }
            />
            <Route
              path="/edit/:id"
              element={
                <EditStudent
                  students={students}
                  updateStudent={updateStudent}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
