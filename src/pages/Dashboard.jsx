import { FaUserGraduate, FaUsers, FaUserCheck, FaUserTimes, FaChartPie, FaBook } from 'react-icons/fa';

function Dashboard({ students }) {
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === 'Active').length;
  const inactiveStudents = students.filter((s) => s.status === 'Inactive').length;

  // Calculate course distribution
  const courseCounts = students.reduce((acc, student) => {
    acc[student.course] = (acc[student.course] || 0) + 1;
    return acc;
  }, {});

  const courseStats = Object.entries(courseCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const stats = [
    {
      title: 'Total Students',
      count: totalStudents,
      icon: <FaUsers className="text-3xl" />,
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      lightBg: 'bg-blue-50',
    },
    {
      title: 'Active Students',
      count: activeStudents,
      icon: <FaUserCheck className="text-3xl" />,
      bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
      textColor: 'text-green-600',
      lightBg: 'bg-green-50',
    },
    {
      title: 'Inactive Students',
      count: inactiveStudents,
      icon: <FaUserTimes className="text-3xl" />,
      bgColor: 'bg-gradient-to-br from-red-500 to-red-600',
      textColor: 'text-red-600',
      lightBg: 'bg-red-50',
    },
    {
      title: 'Courses',
      count: Object.keys(courseCounts).length,
      icon: <FaUserGraduate className="text-3xl" />,
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      lightBg: 'bg-purple-50',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4">
      {/* Header */}
      <div className="mb-6 sm:mb-8 pt-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">Overview of your student management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg sm:rounded-xl border border-gray-300 p-4 sm:p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`${stat.bgColor} text-white p-2 sm:p-3 rounded-lg`}>
                <span className="text-lg sm:text-2xl">{stat.icon}</span>
              </div>
              <div className="min-w-0">
                <p className="text-gray-500 text-xs sm:text-sm truncate">{stat.title}</p>
                <p className={`text-xl sm:text-2xl font-bold ${stat.textColor}`}>{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      {students.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Status Distribution */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-300 p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaChartPie className="text-blue-600" />
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Status Distribution</h2>
            </div>
            <div className="space-y-3">
              {/* Active Bar */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Active</span>
                  <span className="font-medium text-gray-900">{activeStudents} ({totalStudents > 0 ? Math.round((activeStudents / totalStudents) * 100) : 0}%)</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${totalStudents > 0 ? (activeStudents / totalStudents) * 100 : 0}%` }}
                  />
                </div>
              </div>
              {/* Inactive Bar */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Inactive</span>
                  <span className="font-medium text-gray-900">{inactiveStudents} ({totalStudents > 0 ? Math.round((inactiveStudents / totalStudents) * 100) : 0}%)</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500 rounded-full transition-all duration-500"
                    style={{ width: `${totalStudents > 0 ? (inactiveStudents / totalStudents) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Top Courses */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-300 p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaBook className="text-purple-600" />
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Top Courses</h2>
            </div>
            {courseStats.length > 0 ? (
              <div className="space-y-3">
                {courseStats.map(([course, count], index) => (
                  <div key={course}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 truncate max-w-[200px]">{course}</span>
                      <span className="font-medium text-gray-900">{count} students</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          index === 0 ? 'bg-purple-500' : 
                          index === 1 ? 'bg-blue-500' : 
                          index === 2 ? 'bg-green-500' : 
                          index === 3 ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}
                        style={{ width: `${(count / totalStudents) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm text-center py-4">No course data available</p>
            )}
          </div>
        </div>
      )}

      {/* Recent Students Table */}
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-300">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Recent Students</h2>
        </div>
        
        {students.length === 0 ? (
          <div className="py-8 sm:py-12 text-center">
            <p className="text-gray-400 text-sm sm:text-base">No students found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-2.5 sm:py-3 px-3 sm:px-6 text-xs font-medium text-gray-600 uppercase">Name</th>
                  <th className="text-left py-2.5 sm:py-3 px-3 sm:px-6 text-xs font-medium text-gray-600 uppercase">Age</th>
                  <th className="text-left py-2.5 sm:py-3 px-3 sm:px-6 text-xs font-medium text-gray-600 uppercase">Course</th>
                  <th className="text-left py-2.5 sm:py-3 px-3 sm:px-6 text-xs font-medium text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.slice(0, 5).map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="py-2.5 sm:py-3 px-3 sm:px-6 font-medium text-gray-900 text-sm">{student.name}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-6 text-gray-600 text-sm">{student.age}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-6 text-gray-600 text-sm">{student.course}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-6">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        student.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
