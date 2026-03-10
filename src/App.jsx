import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import StudentList from './pages/StudentList';
import EditStudent from './pages/EditStudent';
import Attendance from './pages/Attendance';
import'./App.css';

function App() {
  // Load students from localStorage on initial render
  const [students, setStudents] = useState(() => {
    try {
      const savedStudents = localStorage.getItem('students');
      if (savedStudents) {
        const parsed = JSON.parse(savedStudents);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    return [];
  });

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
  const savedMode = localStorage.getItem('darkMode');
   return savedMode ? JSON.parse(savedMode) : false;
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
  const newMode = !darkMode;
   setDarkMode(newMode);
   localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Show toast helper
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // Hide toast helper
  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  // Save students to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('students', JSON.stringify(students));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [students]);

  // Save dark mode preference to localStorage
  useEffect(() => {
   document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now() }]);
    showToast('Student added successfully!', 'success');
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
    showToast('Student deleted successfully!', 'success');
  };

  const updateStudent = (updatedStudent) => {
    setStudents(
      students.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    showToast('Student updated successfully!', 'success');
  };

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        {/* Toast Notification */}
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
          />
        )}
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
            <Route
             path="/attendance/:id"
             element={<Attendance students={students} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
