import { Link } from 'react-router-dom';
import { FaGraduationCap, FaHome, FaUserPlus, FaList } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 text-white">
            <div className="bg-white/20 p-2 rounded-lg">
              <FaGraduationCap className="text-3xl" />
            </div>
            <span className="text-2xl font-bold tracking-wide">StudentMS</span>
          </Link>
          
          <div className="flex items-center space-x-16">
            <Link
              to="/"
              className="flex items-center space-x-4 text-white hover:text-blue-100 transition-all duration-200 hover:bg-white/10 px-6 py-3 rounded-xl"
            >
              <FaHome className="text-xl" />
              <span className="font-medium tracking-wide">Dashboard</span>
            </Link>
            <Link
              to="/add"
              className="flex items-center space-x-4 text-white hover:text-blue-100 transition-all duration-200 hover:bg-white/10 px-6 py-3 rounded-xl"
            >
              <FaUserPlus className="text-xl" />
              <span className="font-medium tracking-wide">Add Student</span>
            </Link>
            <Link
              to="/students"
              className="flex items-center space-x-4 text-white hover:text-blue-100 transition-all duration-200 hover:bg-white/10 px-6 py-3 rounded-xl"
            >
              <FaList className="text-xl" />
              <span className="font-medium tracking-wide">Student List</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
