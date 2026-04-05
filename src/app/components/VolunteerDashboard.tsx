import { ArrowLeft, FileText, GraduationCap, Calendar, MessageCircle, Phone, Globe, AlertCircle, Bell } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function VolunteerDashboard() {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showOpenShift, setShowOpenShift] = useState(true);

  const roleNames: Record<string, string> = {
    'front-desk': 'Front Desk / Welcome Support',
    'language-support': 'Language & Navigation Support',
    'program-support': 'Program Support',
  };

  const roleName = roleNames[role || ''] || 'Volunteer';

  const handleCancelShift = () => {
    setShowCancelModal(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  const handleCoverShift = () => {
    setShowOpenShift(false);
    // Show success message
    alert('Thank you! Your coordinator has been notified.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border-b border-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/volunteer')}
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
        <h2 className="text-blue-900 mb-8">{roleName}</h2>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg text-green-800 font-medium">
            Your coordinator has been notified. Thank you for letting us know.
          </div>
        )}

        {/* Section Cards */}
        <div className="space-y-4">
          {/* Card 1 - Role Instructions */}
          <Link
            to={`/volunteer/role-instructions/${role}`}
            className="block bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-blue-900" />
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-1">Your Role & Responsibilities</h3>
                <p className="text-blue-100">
                  Learn what your role involves and what to do during your shift
                </p>
              </div>
              <div className="text-white/80">→</div>
            </div>
          </Link>

          {/* Card 2 - Training Modules */}
          <Link
            to="/volunteer/training"
            className="block bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-blue-900" />
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-1">Complete Your Training</h3>
                <p className="text-blue-100">0 of 4 modules completed</p>
                <div className="mt-2 w-full bg-white/30 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div className="text-white/80">→</div>
            </div>
          </Link>

          {/* Card 3 - Your Shift */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-blue-900" />
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-1">Your Next Shift</h3>
                <p className="text-blue-100 mb-1">
                  Tuesday April 7 · 9:00 AM — 1:00 PM
                </p>
                <p className="text-blue-200">Main Hall</p>
              </div>
            </div>
            <button
              onClick={() => setShowCancelModal(true)}
              className="w-full px-6 py-3 bg-white border-2 border-white text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
              style={{ minHeight: '44px' }}
            >
              I Can't Make It
            </button>

            {/* Open Shift Notification */}
            {showOpenShift && (
              <div className="mt-4 p-4 rounded-lg bg-white/20 border-2 border-white/40 backdrop-blur-sm">
                <div className="flex items-start gap-3 mb-3">
                  <Bell className="w-5 h-5 flex-shrink-0 text-white" />
                  <div className="flex-1">
                    <h4 className="font-medium text-white mb-1">Open Shift Available</h4>
                    <p className="text-blue-100 text-sm mb-2">
                      There's an open shift that needs your role — can you help?
                    </p>
                    <p className="text-white">
                      Wednesday April 8 · 3:00 PM — 6:00 PM
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCoverShift}
                  className="w-full px-6 py-3 bg-white text-blue-900 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                  style={{ minHeight: '44px' }}
                >
                  I Can Cover This
                </button>
              </div>
            )}
          </div>

          {/* Card 4 - FAQ */}
          <Link
            to="/volunteer/faq"
            className="block bg-gradient-to-br from-blue-800 to-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-blue-900" />
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-1">Quick Answers</h3>
                <p className="text-blue-100">Find answers to common questions</p>
              </div>
              <div className="text-white/80">→</div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm">
                Where is the washroom?
              </span>
              <span className="px-3 py-1.5 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm">
                What are today's hours?
              </span>
              <span className="px-3 py-1.5 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm">
                Who do I call if someone is upset?
              </span>
            </div>
          </Link>
        </div>
      </main>

      {/* Cancel Shift Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="text-neutral-800 mb-2">Are you sure?</h3>
                <p className="text-neutral-600">
                  Your coordinator will be notified and your shift will be marked as open.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-6 py-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg transition-colors"
                style={{ minHeight: '44px' }}
              >
                Cancel
              </button>
              <button
                onClick={handleCancelShift}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                style={{ minHeight: '44px' }}
              >
                Yes, I can't make it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}