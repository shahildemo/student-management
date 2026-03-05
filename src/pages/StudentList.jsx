import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaUser, FaPlus, FaSearch, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

function StudentList({ students, deleteStudent }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(id);
    }
  };

  // Handle sort click
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="text-gray-300 text-xs" />;
    return sortDirection === 'asc' 
      ? <FaSortUp className="text-blue-600 text-xs" /> 
      : <FaSortDown className="text-blue-600 text-xs" />;
  };

  // Filter and sort students
  const filteredAndSortedStudents = students
    .filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.course.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'age') {
        comparison = parseInt(a.age) - parseInt(b.age);
      } else if (sortField === 'course') {
        comparison = a.course.localeCompare(b.course);
      } else if (sortField === 'status') {
        comparison = a.status.localeCompare(b.status);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

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

      {/* Search and Filter Bar - Always Visible */}
      <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-4 mb-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400 text-sm" />
            </div>
            <input
              type="text"
              placeholder="Search by name or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={students.length === 0}
              className={`w-full pl-10 pr-3 py-2 rounded-lg border text-sm ${
                students.length === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-900 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500'
              }`}
            />
          </div>
          
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            disabled={students.length === 0}
            className={`px-3 py-2 rounded-lg border text-sm sm:w-40 ${
              students.length === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-900 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500'
            }`}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        
        {/* Results Count */}
        <div className="mt-2 text-xs text-gray-500">
          {students.length === 0 ? 'Add students to enable search' : `Showing ${filteredAndSortedStudents.length} of ${students.length} students`}
        </div>
      </div>

      {students.length === 0 ? (
        <div className="bg-white rounded-lg sm:rounded-xl border border-gray-300 py-12 sm:py-16 text-center shadow-sm">
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
      ) : filteredAndSortedStudents.length === 0 ? (
        <div className="bg-white rounded-lg sm:rounded-xl border border-gray-300 py-12 text-center shadow-sm">
          <FaSearch className="text-3xl text-gray-300 mx-auto mb-3" />
          <h2 className="text-base font-semibold text-gray-900 mb-1">No students found</h2>
          <p className="text-gray-500 text-sm">Try adjusting your search or filter</p>
          <button
            onClick={() => { setSearchTerm(''); setStatusFilter('All'); }}
            className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg sm:rounded-xl border border-gray-300 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-100">
                <tr>
                  <th 
                    className="text-left py-2.5 sm:py-3 px-3 sm:px-6 text-xs font-medium text-gray-600 uppercase cursor-pointer hover:bg-gray-200 transition-colors select-none"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      Student
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th 
                    className="text-left py-2.5 sm:py-3 px-3 sm:px-6 text-xs font-medium text-gray-600 uppercase cursor-pointer hover:bg-gray-200 transition-colors select-none"
                    onClick={() => handleSort('age')}
                  >
                    <div className="flex items-center gap-1">
                      Age
                      {getSortIcon('age')}
                    </div>
                  </th>
                  <th 
                    className="text-left py-2.5 sm:py-3 px-3 sm:px-6 text-xs font-medium text-gray-600 uppercase cursor-pointer hover:bg-gray-200 transition-colors select-none"
                    onClick={() => handleSort('course')}
                  >
                    <div className="flex items-center gap-1">
                      Course
                      {getSortIcon('course')}
                    </div>
                  </th>
                  <th 
                    className="text-left py-2.5 sm:py-3 px-3 sm:px-6 text-xs font-medium text-gray-600 uppercase cursor-pointer hover:bg-gray-200 transition-colors select-none"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      {getSortIcon('status')}
                    </div>
                  </th>
                  <th className="text-left py-2.5 sm:py-3 px-3 sm:px-6 text-xs font-medium text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAndSortedStudents.map((student) => (
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
