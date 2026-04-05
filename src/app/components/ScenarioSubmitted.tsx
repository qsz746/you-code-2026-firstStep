import { CheckCircle, FileText, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function ScenarioSubmitted() {
  const navigate = useNavigate();

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

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Centered Content */}
        <div className="text-center">
          {/* Green Checkmark Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Title */}
          <h2 className="text-blue-900 mb-3">Thank You!</h2>
          <p className="text-blue-800 text-xl mb-8">
            Your suggestion has been sent to your coordinator for review
          </p>

          {/* Status Card */}
          <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm mb-8">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div className="flex-1 text-left">
                <div className="text-blue-900 font-medium mb-2">
                  📋 Status: Pending Coordinator Review
                </div>
                <p className="text-sm text-neutral-600">
                  If approved, your scenario will be added to the shared FAQ for all volunteers
                </p>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate('/volunteer/faq')}
            className="w-full sm:w-auto min-w-[280px] px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all"
            style={{ minHeight: '56px' }}
          >
            Back to Quick Answers
          </button>
        </div>
      </main>
    </div>
  );
}
