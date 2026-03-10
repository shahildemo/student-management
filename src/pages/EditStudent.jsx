import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
    } else if (formData.name.trim().length < 2) {
      newErrors.name= 'Name must be at least 2 characters';
    }
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Age must be between 1 and 120';
    }
    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    } else if (formData.course.trim().length < 3) {
      newErrors.course = 'Course must be at least 3 characters';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm() && hasChanges()) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      updateStudent({
        ...originalStudent,
        name: formData.name,
        age: parseInt(formData.age),
       course: formData.course,
       status: formData.status,
      });
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/students');
      }, 800);
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
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

 return (
   <div className="max-w-2xl mx-auto px-4 sm:px-0 py-4">
     {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2 animate-fade-in">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">Student updated successfully! Redirecting...</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <button
          onClick={() => navigate('/students')}
          className="inline-flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          <FaArrowLeft className="text-xs" />
          <span>Back</span>
        </button>
      </div>

      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-300">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Student</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5 sm:mt-1">Update student information</p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
             placeholder="Enter full name"
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              } focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
               placeholder="Age"
                min="1"
               max="120"
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.age ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                } focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm`}
              />
              {errors.age && <p className="mt-1 text-xs text-red-600">{errors.age}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">Course</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
             placeholder="Enter course name"
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.course ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              } focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm`}
            />
            {errors.course && <p className="mt-1 text-xs text-red-600">{errors.course}</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
            <button
              type="button"
              onClick={() => navigate('/students')}
              className="flex-1 px-4 py-2.5 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!hasChanges() || isSubmitting}
              className={`flex-1 px-4 py-2.5 sm:py-2 rounded-lg text-sm font-medium transition-colors order-1 sm:order-2 ${
                !hasChanges() || isSubmitting
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg"fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                'Update Student'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;
