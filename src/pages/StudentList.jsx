import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaUser, FaPlus } from 'react-icons/fa';

function StudentList({ students, deleteStudent }) {
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-500 mt-0.5 sm:mt-1 text-sm">Manage your student records</p>
        </div>
        <Link
          to="/add"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <FaPlus className="text-xs" />
          <span>Add Student</span>
        </Link>
      </div>

      {students.length === 0 ? (
        <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 py-12 sm:py-16 text-center">
          <div className="bg-gray-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <FaUser className="text-2xl sm:text-3xl text-gray-400" />
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">No students yet</h2>
          <p className="text-gray-500 mb-3 sm:mb-4 text-sm">Get started by adding your first student</p>
          <Link
            to="/add"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <FaPlus className="text-xs" />
            <span>Add Student</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-2.5 sm:py-3 px-3 sm:px-6 text-xs font-medium text-gray-500 uppercase">Student</th>
                  <th className="text-left py-2.5 sm:py-3 px-3 sm:px-6 text-xs font-medium text-gray-500 uppercase">Age</th>
                  <th className="text-left py-2.5 sm:py-3 px-3 sm:px-6 text-xs font-medium text-gray-500 uppercase">Course</th>
                  <th className="text-left py-2.5 sm:py-3 px-3 sm:px-6 text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="text-left py-2.5 sm:py-3 px-3 sm:px-6 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="py-2.5 sm:py-3 px-3 sm:px-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <FaUser className="text-blue-600 text-xs sm:text-sm" />
                        </div>
                        <span className="font-medium text-gray-900 text-sm truncate">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-6 text-gray-600 text-sm">{student.age}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-6 text-gray-600 text-sm truncate max-w-[100px] sm:max-w-none">{student.course}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-6">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        student.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-6">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Link
                          to={`/edit/${student.id}`}
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium"
                        >
                          <FaEdit className="text-xs" />
                          <span className="hidden sm:inline">Edit</span>
                        </Link>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 text-xs sm:text-sm font-medium"
                        >
                          <FaTrash className="text-xs" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentList;
