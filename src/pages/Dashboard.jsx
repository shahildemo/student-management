import { FaUserGraduate, FaUsers, FaUserCheck, FaUserTimes } from 'react-icons/fa';

function Dashboard({ students }) {
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === 'Active').length;
  const inactiveStudents = students.filter((s) => s.status === 'Inactive').length;

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
      count: new Set(students.map((s) => s.course)).size,
      icon: <FaUserGraduate className="text-3xl" />,
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      lightBg: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-10">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Student Management Dashboard
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
          Welcome to your comprehensive student management system.<br />
          Track, manage, and organize student information efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.lightBg} rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-8 border border-gray-100 group`}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                  {stat.title}
                </p>
                <p className={`text-4xl font-bold ${stat.textColor}`}>
                  {stat.count}
                </p>
              </div>
              <div className={`${stat.bgColor} text-white p-4 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">
            Recent Students
          </h2>
          <p className="text-gray-500 mt-1">Latest student registrations</p>
        </div>
        
        {students.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-400 text-lg">No students found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="text-left py-5 px-8 text-gray-600 font-semibold text-sm uppercase tracking-wider">
                    Student Name
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.slice(0, 5).map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    <td className="py-5 px-8 font-medium text-gray-800">{student.name}</td>
                    <td className="py-5 px-8 text-gray-600">{student.age} years</td>
                    <td className="py-5 px-8 text-gray-600">{student.course}</td>
                    <td className="py-5 px-8">
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
