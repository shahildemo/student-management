import { useState } from 'react';
import { useParams, Link } from'react-router-dom';
import { FaArrowLeft, FaUser, FaCalendar, FaCheck, FaTimes } from 'react-icons/fa';

function Attendance({ students }) {
  const { id } = useParams();
  const student = students.find(s => s.id === parseInt(id));
  
  // Initialize attendance from localStorage or empty object
  const [attendance, setAttendance] = useState(() => {
   const saved = localStorage.getItem(`attendance-${id}`);
   return saved ? JSON.parse(saved) : {};
  });

  // Save to localStorage when attendance changes
  const handleMarkAttendance = (date, status) => {
   const newAttendance = { ...attendance, [date]: status };
    setAttendance(newAttendance);
    localStorage.setItem(`attendance-${id}`, JSON.stringify(newAttendance));
  };

  // Generate last 30 days
  const getLast30Days = () => {
   const dates = [];
    for (let i = 29; i >= 0; i--) {
     const date = new Date();
      date.setDate(date.getDate() - i);
     const dateStr = date.toISOString().split('T')[0];
      dates.push({
        date: dateStr,
        display: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        day: date.toLocaleDateString('en-US', { weekday: 'short' })
      });
    }
  return dates;
  };

  // Calculate attendance stats
  const totalDays = Object.keys(attendance).length;
  const presentDays = Object.values(attendance).filter(s => s === 'present').length;
  const absentDays = Object.values(attendance).filter(s => s === 'absent').length;
  const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  if (!student) {
   return (
      <div className="max-w-4xl mx-auto px-4 text-center py-12">
        <p className="text-gray-500">Student not found</p>
        <Link to="/students" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
          ← Back to Students
        </Link>
      </div>
    );
  }

  const last30Days = getLast30Days();

 return (
   <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
     {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          <FaArrowLeft className="text-xs" />
          <span>Back</span>
        </button>
      </div>

      {/* Student Info Card */}
      <div className="bg-white rounded-xl border border-gray-300 p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <FaUser className="text-blue-600 text-2xl" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
            <p className="text-gray-500">{student.course} • {student.status}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{attendanceRate}%</div>
            <p className="text-sm text-gray-500">Attendance Rate</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{totalDays}</div>
            <p className="text-sm text-gray-500">Total Days</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{presentDays}</div>
            <p className="text-sm text-gray-500">Present</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{absentDays}</div>
            <p className="text-sm text-gray-500">Absent</p>
          </div>
        </div>
      </div>

      {/* Attendance Calendar */}
      <div className="bg-white rounded-xl border border-gray-300 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <FaCalendar className="text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Last 30 Days</h2>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-7 sm:grid-cols-10 lg:grid-cols-15 gap-2">
            {last30Days.map(({ date, display, day }) => {
             const status = attendance[date];
             return (
                <div
                  key={date}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="text-xs text-gray-500 truncate w-full text-center">
                    {day}
                  </div>
                  <div className="text-xs text-gray-400 truncate w-full text-center">
                    {display.split(' ')[1]}
                  </div>
                  <button
                    onClick={() => {
                     const newStatus = status === 'present' ? 'absent' : status === 'absent' ? null : 'present';
                      if (newStatus) {
                        handleMarkAttendance(date, newStatus);
                      } else {
                        // Remove attendance
                       const newAttendance = { ...attendance };
                        delete newAttendance[date];
                        setAttendance(newAttendance);
                        localStorage.setItem(`attendance-${id}`, JSON.stringify(newAttendance));
                      }
                    }}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                     status === 'present'
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : status === 'absent'
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                    title={`${display} - Click to toggle`}
                  >
                    {status === 'present' ? (
                      <FaCheck className="text-sm" />
                    ) : status === 'absent' ? (
                      <FaTimes className="text-sm" />
                    ) : (
                      <span className="text-xs">?</span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center text-white">
                <FaCheck className="text-xs" />
              </div>
              <span className="text-sm text-gray-600">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center text-white">
                <FaTimes className="text-xs" />
              </div>
              <span className="text-sm text-gray-600">Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                <span className="text-xs">?</span>
              </div>
              <span className="text-sm text-gray-600">Not Marked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
