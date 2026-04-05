import { Users, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import CoordinatorNavigation from './CoordinatorNavigation';
import cloudBackground from '../../assets/674cfea0d6b62209a49a165047fb5176abd114ef.png';

export default function CoordinatorDashboardPage() {
  // Mock data for the dashboard
  const todayStats = {
    newVolunteers: 2,
    urgentReminders: 3,
    openIssues: 3
  };

  return (
    <div className="min-h-screen bg-neutral-50 relative">
      {/* Background image with elegant opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 pointer-events-none"
        style={{ backgroundImage: `url(${cloudBackground})` }}
      />

      <div className="relative z-10">
        <CoordinatorNavigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Today's Overview - Elegant Cards */}
        <section className="mb-10">
          <h2 className="text-neutral-800 mb-4">Today's Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/coordinator/volunteers" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer border border-neutral-100">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-medium text-neutral-800">{todayStats.newVolunteers}</div>
                  <div className="text-neutral-500 mt-1">New volunteers starting</div>
                </div>
              </div>
            </Link>

            <Link to="/coordinator/schedule" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer border border-neutral-100">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-2xl font-medium text-neutral-800">{todayStats.urgentReminders}</div>
                  <div className="text-neutral-500 mt-1">Schedule</div>
                </div>
              </div>
            </Link>

            <Link to="/coordinator/resources" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer border border-neutral-100">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-rose-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <div className="text-2xl font-medium text-neutral-800">{todayStats.openIssues}</div>
                  <div className="text-neutral-500 mt-1">Pending FAQ Submissions</div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>
      </div>
    </div>
  );
}
