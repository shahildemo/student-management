import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaGraduationCap, FaHome, FaUserPlus, FaList, FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';

function Navbar({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: FaHome },
    { path: '/add', label: 'Add Student', icon: FaUserPlus },
    { path: '/students', label: 'Student List', icon: FaList },
  ];

 return (
    <nav className={`shadow-sm border-b sticky top-0 z-50 transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}>
              <FaGraduationCap className="text-xl sm:text-2xl text-white" />
            </div>
            <span className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>StudentMS</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
             const Icon = item.icon;
             const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? darkMode 
                        ? 'bg-blue-900/50 text-blue-400'
                        : 'bg-blue-50 text-blue-700'
                      : darkMode
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="text-lg" />
                  <span className="hidden lg:inline">{item.label}</span>
                </Link>
              );
            })}
            
            {/* Dark Mode Toggle - Desktop */}
            <button
              onClick={toggleDarkMode}
              className={`ml-2 p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              darkMode 
                ? 'text-gray-300 hover:bg-gray-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden border-t py-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {navItems.map((item) => {
             const Icon = item.icon;
             const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium ${
                    isActive
                      ? darkMode
                        ? 'bg-blue-900/50 text-blue-400'
                        : 'bg-blue-50 text-blue-700'
                      : darkMode
                        ? 'text-gray-300 hover:bg-gray-800'
                        : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="text-lg" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {/* Dark Mode Toggle - Mobile */}
            <button
              onClick={() => {
                toggleDarkMode();
                setIsMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium ${
                darkMode 
                  ? 'text-gray-300 hover:bg-gray-800' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {darkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
