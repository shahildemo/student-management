import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEdit, FaArrowLeft, FaUser, FaCalendar, FaBook, FaToggleOn, FaSave } from 'react-icons/fa';

function EditStudent({ students, updateStudent }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [originalStudent, setOriginalStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    course: '',
    status: 'Active',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const student = students.find((s) => s.id === parseInt(id));
    if (student) {
      setOriginalStudent(student);
      setFormData({
        name: student.name,
        age: student.age.toString(),
        course: student.course,
        status: student.status,
      });
    } else {
      navigate('/students');
    }
  }, [id, students, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Age must be between 1 and 120';
    }
    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const hasChanges = () => {
    if (!originalStudent) return false;
    const currentStudent = {
      ...originalStudent,
      name: formData.name,
      age: parseInt(formData.age),
      course: formData.course,
      status: formData.status,
    };
    return JSON.stringify(originalStudent) !== JSON.stringify(currentStudent);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && hasChanges()) {
      updateStudent({
        ...originalStudent,
        name: formData.name,
        age: parseInt(formData.age),
        course: formData.course,
        status: formData.status,
      });
      navigate('/students');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  if (!originalStudent) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 font-medium"
        >
          <FaArrowLeft />
          <span>Back to List</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50/50 to-transparent">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <FaEdit className="text-2xl text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Edit Student</h1>
              <p className="text-gray-500 mt-1">Update student information</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                <FaUser className="text-gray-400" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter student's full name"
                className={`w-full px-5 py-3.5 rounded-xl border-2 ${
                  errors.name ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                } focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-gray-50/50`}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-500 font-medium">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                <FaCalendar className="text-gray-400" />
                <span>Age</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter student age"
                min="1"
                max="120"
                className={`w-full px-5 py-3.5 rounded-xl border-2 ${
                  errors.age ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                } focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-gray-50/50`}
              />
              {errors.age && (
                <p className="mt-2 text-sm text-red-500 font-medium">{errors.age}</p>
              )}
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                <FaBook className="text-gray-400" />
                <span>Course</span>
              </label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Enter course name"
                className={`w-full px-5 py-3.5 rounded-xl border-2 ${
                  errors.course ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                } focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-gray-50/50`}
              />
              {errors.course && (
                <p className="mt-2 text-sm text-red-500 font-medium">{errors.course}</p>
              )}
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-4">
                <FaToggleOn className="text-gray-400" />
                <span>Status</span>
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    formData.status === 'Active' ? 'border-green-500 bg-green-500' : 'border-gray-300 group-hover:border-gray-400'
                  }`}>
                    {formData.status === 'Active' && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <input
                    type="radio"
                    name="status"
                    value="Active"
                    checked={formData.status === 'Active'}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className={`font-medium transition-colors ${formData.status === 'Active' ? 'text-green-700' : 'text-gray-600'}`}>
                    Active
                  </span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    formData.status === 'Inactive' ? 'border-red-500 bg-red-500' : 'border-gray-300 group-hover:border-gray-400'
                  }`}>
                    {formData.status === 'Inactive' && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <input
                    type="radio"
                    name="status"
                    value="Inactive"
                    checked={formData.status === 'Inactive'}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className={`font-medium transition-colors ${formData.status === 'Inactive' ? 'text-red-700' : 'text-gray-600'}`}>
                    Inactive
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate('/students')}
              className="flex-1 px-6 py-3.5 border-2 border-gray-200 text-gray-600 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!hasChanges()}
              className={`flex-1 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                hasChanges()
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <FaSave />
              <span>Update Student</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;
