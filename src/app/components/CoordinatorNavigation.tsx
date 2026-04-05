import { Link, useLocation } from 'react-router-dom';

export default function CoordinatorNavigation() {
  const location = useLocation();
  
  const navItems = [
    { label: 'Dashboard', path: '/coordinator' },
    { label: 'Volunteers', path: '/coordinator/volunteers' },
    { label: 'Schedule', path: '/coordinator/schedule' },
    { label: 'FAQ review', path: '/coordinator/resources' },
    { label: 'Resources', path: '/coordinator/knowledge' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="hover:text-blue-100 transition-colors flex items-center">
              <span className="text-white font-semibold text-2xl">First</span>
              <span className="text-blue-300 font-semibold text-2xl">Step</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`transition-colors pb-1 ${
                    isActive(item.path)
                      ? 'text-white border-b-2 border-white'
                      : 'text-blue-100 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-blue-800 rounded-lg text-blue-50">
              Coordinator
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}