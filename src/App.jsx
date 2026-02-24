import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import StudentList from './pages/StudentList';
import EditStudent from './pages/EditStudent';
import './App.css';

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', age: 20, course: 'Computer Science', status: 'Active' },
    { id: 2, name: 'Jane Smith', age: 22, course: 'Mathematics', status: 'Inactive' },
    { id: 3, name: 'Mike Johnson', age: 21, course: 'Physics', status: 'Active' },
  ]);

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
        <main className="container mx-auto px-6 lg:px-8 py-10">
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
