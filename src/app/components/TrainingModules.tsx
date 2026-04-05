import { ArrowLeft, Globe, Lock, CheckCircle, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function TrainingModules() {
  const navigate = useNavigate();
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  const modules = [
    {
      id: 1,
      title: 'Organization Overview',
      duration: '15 min',
      description: 'Learn about our mission, values, and the communities we serve',
    },
    {
      id: 2,
      title: 'Volunteer Rights & Responsibilities',
      duration: '20 min',
      description: 'Understand your role, boundaries, and what you can expect from us',
    },
    {
      id: 3,
      title: 'Privacy & Confidentiality',
      duration: '12 min',
      description: 'Essential information about protecting client privacy and data',
    },
    {
      id: 4,
      title: 'Emergency Procedures',
      duration: '18 min',
      description: 'Know what to do in urgent situations and who to contact',
    },
  ];

  const progress = (completedModules.length / modules.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border-b border-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 text-white hover:bg-blue-700/50 rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Link to="/" className="hover:text-blue-200 transition-colors flex items-center">
                <span className="text-white font-semibold text-2xl">First</span>
                <span className="text-blue-300 font-semibold text-2xl">Step</span>
              </Link>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-white hover:bg-blue-700/50 rounded-lg transition-colors">
              <Globe className="w-5 h-5" />
              <span>English</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-blue-900 mb-3">Complete Your Training</h2>
          <p className="text-blue-800 text-lg">
            These modules will help you feel confident and prepared for your volunteer role.
          </p>
        </div>

        {/* Training Modules */}
        <div className="space-y-4 mb-8">
          {modules.map((module, index) => {
            const isCompleted = completedModules.includes(module.id);
            const isLocked = index > 0 && !completedModules.includes(modules[index - 1].id);
            const isAvailable = index === 0 || completedModules.includes(modules[index - 1].id);

            const gradients = [
              'from-blue-500 to-blue-600',
              'from-blue-600 to-blue-700',
              'from-blue-700 to-blue-800',
              'from-blue-800 to-slate-800',
            ];

            return (
              <div
                key={module.id}
                className={`rounded-xl p-6 shadow-lg transition-all ${
                  isCompleted
                    ? 'bg-gradient-to-br from-green-500 to-green-600 border-2 border-green-400'
                    : isLocked
                    ? 'bg-gradient-to-br from-gray-300 to-gray-400 opacity-60'
                    : `bg-gradient-to-br ${gradients[index]} hover:shadow-xl cursor-pointer`
                }`}
                onClick={() => {
                  if (isAvailable && !isCompleted) {
                    setTimeout(() => {
                      setCompletedModules([...completedModules, module.id]);
                    }, 500);
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCompleted
                        ? 'bg-white/90'
                        : isLocked
                        ? 'bg-white/50'
                        : 'bg-white/90'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : isLocked ? (
                      <Lock className="w-6 h-6 text-gray-600" />
                    ) : (
                      <span className="text-blue-900 font-semibold">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white">{module.title}</h3>
                      <div className={`flex items-center gap-1 text-sm ${isCompleted ? 'text-green-100' : 'text-blue-100'}`}>
                        <Clock className="w-4 h-4" />
                        <span>{module.duration}</span>
                      </div>
                    </div>
                    <p className={`mb-3 ${isCompleted ? 'text-green-100' : isLocked ? 'text-gray-100' : 'text-blue-100'}`}>{module.description}</p>
                    {isCompleted ? (
                      <div className="flex items-center gap-2 text-white">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    ) : isLocked ? (
                      <p className="text-sm text-white/80">
                        Complete previous modules to unlock
                      </p>
                    ) : (
                      <button
                        className="px-6 py-2 bg-white text-blue-900 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                        style={{ minHeight: '44px' }}
                      >
                        Start Module
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white">Training Progress</h3>
            <span className="text-blue-100 font-medium">
              {completedModules.length} of {modules.length} completed
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {completedModules.length === modules.length && (
            <div className="mt-4 p-4 bg-white/20 rounded-lg text-white text-center font-medium backdrop-blur-sm">
              🎉 Congratulations! You've completed all training modules.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
