import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaUser, FaPlus, FaSearch } from 'react-icons/fa';

function StudentList({ students, deleteStudent }) {
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Student List</h1>
          <p className="text-gray-500">Manage and view all registered students</p>
        </div>
        <Link
          to="/add"
          className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
        >
          <FaPlus className="text-sm" />
          <span>Add New Student</span>
        </Link>
      </div>

      {students.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
          <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaUser className="text-5xl text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-3">
            No Students Found
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Your student list is currently empty. Get started by adding your first student to the system.
          </p>
          <Link
            to="/add"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md font-medium"
          >
            <FaPlus />
            <span>Add Student</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="text-left py-5 px-8 text-gray-600 font-semibold text-sm uppercase tracking-wider">
                    Student Information
                  </th>
                  <th className="text-left py-5 px-8 text-gray-600 font-semibold text-sm uppercase tracking-wider">
                    Age
                  </th>
                  <th className="text-left py-5 px-8 text-gray-600 font-semibold text-sm uppercase tracking-wider">
                    Course
                  </th>
                  <th className="text-left py-5 px-8 text-gray-600 font-semibold text-sm uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-5 px-8 text-gray-600 font-semibold text-sm uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50/80 transition-colors duration-200"
                  >
                    <td className="py-6 px-8">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-sm">
                          <FaUser className="text-blue-600 text-lg" />
                        </div>
                        <span className="font-semibold text-gray-800 text-lg">
                          {student.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-8 text-gray-600 font-medium">{student.age} years</td>
                    <td className="py-6 px-8">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-medium text-sm">
                        {student.course}
                      </span>
                    </td>
                    <td className="py-6 px-8">
                      <span
                        className={`inline-flex px-4 py-1.5 rounded-full text-sm font-semibold ${
                          student.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="py-6 px-8">
                      <div className="flex items-center space-x-3">
                        <Link
                          to={`/edit/${student.id}`}
                          className="flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-all duration-200 font-medium"
                        >
                          <FaEdit />
                          <span>Edit</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-all duration-200 font-medium"
                        >
                          <FaTrash />
                          <span>Delete</span>
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
