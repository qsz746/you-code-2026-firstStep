import { Users, MessageSquare, ClipboardList, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function VolunteerPage() {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'front-desk',
      icon: Users,
      title: 'Front Desk / Welcome Support',
      description: 'Greet visitors, assist with intake, and direct people to the right place',
    },
    {
      id: 'language-support',
      icon: MessageSquare,
      title: 'Language & Navigation Support',
      description: 'Help explain forms, support appointments, and assist in plain language',
    },
    {
      id: 'program-support',
      icon: ClipboardList,
      title: 'Program Support',
      description: 'Help with workshop setup, attendance, food distribution, and activities',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border-b border-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="hover:text-blue-200 transition-colors flex items-center">
              <span className="text-white font-semibold text-2xl">First</span>
              <span className="text-blue-300 font-semibold text-2xl">Step</span>
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 text-white hover:bg-blue-700/50 rounded-lg transition-colors">
              <Globe className="w-5 h-5" />
              <span>English</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h2 className="text-blue-900 mb-4">Welcome, Volunteer!</h2>
          <p className="text-2xl text-blue-800">
            Please select your role to get started
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Front Desk Card */}
          <button
            onClick={() => navigate('/volunteer/dashboard/front-desk')}
            className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all flex flex-col items-center text-center group aspect-square"
          >
            <h3 className="text-white font-bold mb-4 leading-tight text-xl">
              Front Desk /<br />Welcome Support
            </h3>
            <div className="flex-1 flex items-center justify-center mb-4">
              <div className="relative w-32 h-32">
                {/* User silhouette */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-28 bg-white/90 rounded-full flex items-end justify-center overflow-hidden">
                  {/* Head */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-200 rounded-full"></div>
                  {/* Body */}
                  <div className="w-20 h-16 bg-blue-200 rounded-t-full"></div>
                </div>
                {/* Checkmark badge */}
                <div className="absolute bottom-2 right-2 w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </button>

          {/* Language Support Card */}
          <button
            onClick={() => navigate('/volunteer/dashboard/language-support')}
            className="bg-gradient-to-br from-blue-300 to-blue-500 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all flex flex-col items-center text-center group aspect-square"
          >
            <h3 className="text-white font-bold mb-4 leading-tight text-xl">
              Language &<br />Navigation Support
            </h3>
            <div className="flex-1 flex items-center justify-center mb-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Globe icon */}
                <div className="relative w-24 h-24 bg-white/90 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" strokeWidth="2.5" />
                    <path strokeWidth="2.5" d="M12 3c-2.5 3-2.5 9 0 18m0-18c2.5 3 2.5 9 0 18m-9-9h18M5.6 7.5h12.8M5.6 16.5h12.8" />
                  </svg>
                </div>
                {/* Speech bubble with translation characters */}
                <div className="absolute -bottom-1 -right-1 w-16 h-12 bg-blue-600 rounded-2xl shadow-lg flex items-center justify-center border-4 border-white">
                  <span className="text-white text-xl font-bold">あ文</span>
                </div>
              </div>
            </div>
          </button>

          {/* Program Support Card */}
          <button
            onClick={() => navigate('/volunteer/dashboard/program-support')}
            className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all flex flex-col items-center text-center group aspect-square"
          >
            <h3 className="text-white font-bold mb-4 leading-tight text-xl">
              Program<br />Support
            </h3>
            <div className="flex-1 flex items-center justify-center mb-4">
              <div className="relative w-28 h-32">
                {/* Clipboard clip */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-6 bg-blue-400 rounded-t-xl"></div>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-6 h-4 bg-white/90 rounded-full"></div>
                {/* Clipboard body */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-28 bg-white/90 rounded-lg shadow-lg p-3 flex flex-col gap-2">
                  {/* Checklist items */}
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1 h-1 bg-blue-300 rounded"></div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1 h-1 bg-blue-300 rounded"></div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1 h-1 bg-blue-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}
