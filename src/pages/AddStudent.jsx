import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaUserPlus } from 'react-icons/fa';

function AddStudent({ addStudent }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    course: '',
    status: 'Active',
  });
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      addStudent({
        ...formData,
        age: parseInt(formData.age),
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

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/students')}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium mb-6"
      >
        <FaArrowLeft className="text-xs" />
        <span>Back to Students</span>
      </button>

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-gray-300 shadow-lg">
        {/* Card Header */}
        <div className="px-6 py-5 border-b border-gray-300 bg-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaUserPlus className="text-blue-600 text-lg" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Add New Student</h1>
              <p className="text-gray-500 text-sm">Enter student details to create a new record</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400 text-sm" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., John Doe"
                className={`w-full pl-10 pr-3 py-2.5 rounded-lg border text-sm bg-white text-gray-900 ${
                  errors.name 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-400 focus:border-blue-500 focus:ring-blue-200'
                } focus:outline-none focus:ring-2 transition-colors placeholder-gray-400`}
              />
            </div>
            {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Age and Status Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Age Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g., 20"
                min="1"
                max="120"
                className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-white text-gray-900 ${
                  errors.age 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-400 focus:border-blue-500 focus:ring-blue-200'
                } focus:outline-none focus:ring-2 transition-colors placeholder-gray-400`}
              />
              {errors.age && <p className="mt-1.5 text-sm text-red-600">{errors.age}</p>}
            </div>

            {/* Status Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm bg-white text-gray-900"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Course Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="e.g., Computer Science"
              className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-white text-gray-900 ${
                errors.course 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-400 focus:border-blue-500 focus:ring-blue-200'
              } focus:outline-none focus:ring-2 transition-colors placeholder-gray-400`}
            />
            {errors.course && <p className="mt-1.5 text-sm text-red-600">{errors.course}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-300">
            <button
              type="button"
              onClick={() => navigate('/students')}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
