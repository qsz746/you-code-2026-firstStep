import { Clock, Users, AlertCircle, CheckCircle, Calendar, FileText, Phone, Languages, Eye, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import backgroundImage from '../../assets/c7af64e1b77bbb9ea7560ed2434a214933dda067.png';

export default function CoordinatorDashboard() {
  // State for shift coverage features
  const [showPostShiftModal, setShowPostShiftModal] = useState(false);
  const [selectedShift, setSelectedShift] = useState<any>(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showAbsenceAlert, setShowAbsenceAlert] = useState(true);
  const [postedShifts, setPostedShifts] = useState<number[]>([]);
  const [showResponsesPanel, setShowResponsesPanel] = useState(false);
  const [responsesForShift, setResponsesForShift] = useState<number | null>(null);
  const [showManualAssignDropdown, setShowManualAssignDropdown] = useState<number | null>(null);

  // State for volunteer onboarding details
  const [showVolunteerDetailsModal, setShowVolunteerDetailsModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);

  // Volunteer list for manual assignment
  const availableVolunteers = [
    { id: 1, name: 'Maria Santos' },
    { id: 2, name: 'Ahmed Hassan' },
    { id: 3, name: 'Carlos Mendez' },
    { id: 4, name: 'Sarah Kim' },
  ];

  // Volunteer responses for open shifts
  const volunteerResponses = [
    { id: 1, name: 'Ahmed Hassan', available: true },
    { id: 2, name: 'Carlos Mendez', available: true },
  ];

  const handlePostOpenShift = (shift: any) => {
    setSelectedShift(shift);
    setShowPostShiftModal(true);
  };

  const handleConfirmPostShift = () => {
    if (selectedShift) {
      setPostedShifts([...postedShifts, selectedShift.id]);
      setShowPostShiftModal(false);
      setShowSuccessBanner(true);
      setSelectedShift(null);
      
      // Auto-hide success banner after 5 seconds
      setTimeout(() => setShowSuccessBanner(false), 5000);
    }
  };

  const handleShowResponses = (shiftId: number) => {
    setResponsesForShift(shiftId);
    setShowResponsesPanel(true);
  };

  const handleConfirmVolunteer = (volunteerId: number) => {
    // In a real app, this would update the shift assignment
    setShowResponsesPanel(false);
    setShowSuccessBanner(true);
    setTimeout(() => setShowSuccessBanner(false), 5000);
  };

  // Mock data for the dashboard
  const todayStats = {
    shiftsToday: 8,
    volunteersScheduled: 12,
    newVolunteers: 2,
    urgentReminders: 3,
    openIssues: 1
  };

  const onboardingVolunteers = [
    { id: 1, name: 'Maria Santos', role: 'Front Desk Support', status: 'in-progress', missing: 'Background check, Safety training' },
    { id: 2, name: 'Ahmed Hassan', role: 'Language Partner', status: 'ready', missing: '' },
    { id: 3, name: 'Jennifer Wu', role: 'Workshop Facilitator', status: 'not-started', missing: 'All items pending' },
    { id: 4, name: 'Carlos Mendez', role: 'Tech Support', status: 'in-progress', missing: 'Scenario submission' }
  ];

  const pendingScenarios = [
    { id: 1, title: 'Helping client with urgent housing forms', submittedBy: 'Sarah Kim', role: 'Case Worker', date: '2026-04-03', status: 'pending' },
    { id: 2, title: 'Language barrier during intake appointment', submittedBy: 'Michael Chen', role: 'Intake Coordinator', date: '2026-04-02', status: 'pending' },
    { id: 3, title: 'Technology access issue in computer lab', submittedBy: 'Priya Patel', role: 'Tech Support', date: '2026-04-01', status: 'pending' }
  ];

  const shifts = [
    { id: 1, time: '9:00 AM - 12:00 PM', type: 'Front Desk', assigned: 'Maria Santos', status: 'confirmed' },
    { id: 2, time: '12:00 PM - 3:00 PM', type: 'Language Support', assigned: 'Ahmed Hassan', status: 'confirmed' },
    { id: 3, time: '3:00 PM - 6:00 PM', type: 'Workshop', assigned: '', status: 'open' },
    { id: 4, time: '6:00 PM - 8:00 PM', type: 'Front Desk', assigned: 'Jennifer Wu', status: 'needs-replacement' }
  ];

  // Calculate shift stats
  const confirmedCount = shifts.filter(s => s.status === 'confirmed').length;
  const needsReplacementCount = shifts.filter(s => s.status === 'needs-replacement').length;
  const openCount = shifts.filter(s => s.status === 'open').length;
  const allCovered = needsReplacementCount === 0 && openCount === 0;

  const knowledgeBaseUpdates = [
    { title: 'How to handle emergency food bank requests', type: 'New FAQ', date: '2026-04-03' },
    { title: 'Updated WorkBC referral process', type: 'Updated Process', date: '2026-04-02' },
    { title: 'Common intake form questions', type: 'Most Searched', searches: 24 }
  ];

  const supportContacts = [
    { label: 'Program Manager', contact: 'ext. 301', available: true },
    { label: 'Interpreter Services', contact: '604-555-0123', available: true },
    { label: 'IT Support', contact: 'ext. 405', available: true },
    { label: 'Emergency Protocol', contact: 'View Guide', available: true }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 relative" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Subtle white overlay to lighten the background and improve readability */}
      <div className="absolute inset-0 bg-white/60 pointer-events-none" />
      {/* Header with Dark Blue Gradient */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="hover:text-blue-100 transition-colors flex items-center">
                <span className="text-white font-semibold text-2xl">First</span>
                <span className="text-blue-300 font-semibold text-2xl">Step</span>
              </Link>
              <nav className="hidden md:flex gap-6">
                <a href="#" className="text-blue-100 hover:text-white transition-colors">Dashboard</a>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">Volunteers</a>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">Schedule</a>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">Resources</a>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-blue-100 hover:bg-blue-800 rounded-lg transition-colors" aria-label="Language toggle">
                <Languages className="w-5 h-5" />
              </button>
              <button className="p-2 text-blue-100 hover:bg-blue-800 rounded-lg transition-colors" aria-label="Accessibility mode">
                <Eye className="w-5 h-5" />
              </button>
              <div className="px-3 py-1.5 bg-blue-800 rounded-lg text-blue-50">
                Coordinator
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-0">
        {/* Today's Overview - Blue Gradient */}
        <section className="mb-10">
          <h2 className="text-neutral-800 mb-4">Today's Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-medium text-white">{todayStats.newVolunteers}</div>
                  <div className="text-blue-50 mt-1">New volunteers starting</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-medium text-white">{todayStats.shiftsToday}</div>
                  <div className="text-blue-50 mt-1">Shifts today</div>
                </div>
              </div>
            </div>

            <Link to="/schedule" className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-5 shadow-md hover:shadow-lg transition-all block">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-medium text-white">{todayStats.urgentReminders}</div>
                  <div className="text-blue-50 mt-1">Schedule</div>
                </div>
              </div>
            </Link>

            <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-xl p-5 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-medium text-white">{todayStats.openIssues}</div>
                  <div className="text-blue-50 mt-1">Open support issues</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Onboarding Progress - Light Blue Gradient */}
        <section className="mb-10">
          <h2 className="text-neutral-800 mb-4">Volunteer Onboarding</h2>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-100 border-b border-blue-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-blue-900">Volunteer Name</th>
                    <th className="px-6 py-4 text-left text-blue-900">Role</th>
                    <th className="px-6 py-4 text-left text-blue-900">Progress</th>
                    <th className="px-6 py-4 text-left text-blue-900">Missing Items</th>
                    <th className="px-6 py-4 text-left text-blue-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-200">
                  {onboardingVolunteers.map((volunteer) => (
                    <tr key={volunteer.id} className="hover:bg-blue-50 transition-colors bg-white/50">
                      <td className="px-6 py-4 text-neutral-800">{volunteer.name}</td>
                      <td className="px-6 py-4 text-neutral-600">{volunteer.role}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                          volunteer.status === 'ready' ? 'bg-green-50 text-green-700' :
                          volunteer.status === 'in-progress' ? 'bg-blue-50 text-blue-700' :
                          'bg-neutral-100 text-neutral-700'
                        }`}>
                          {volunteer.status === 'ready' ? 'Ready' :
                           volunteer.status === 'in-progress' ? 'In Progress' :
                           'Not Started'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-neutral-600">{volunteer.missing || '—'}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedVolunteer(volunteer);
                            setShowVolunteerDetailsModal(true);
                          }}
                          className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg transition-colors"
                        >
                          View details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pending Scenario Submissions - Medium Blue Gradient */}
        <section className="mb-10">
          <h2 className="text-neutral-800 mb-4">Pending Scenario Submissions</h2>
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl border border-blue-300 divide-y divide-blue-200 shadow-md">
            {pendingScenarios.map((scenario) => (
              <div key={scenario.id} className="p-6 hover:bg-blue-50 transition-colors bg-white/50">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-neutral-800 mb-2">{scenario.title}</h3>
                    <div className="flex flex-wrap gap-4 text-neutral-600">
                      <span>Submitted by: {scenario.submittedBy}</span>
                      <span>•</span>
                      <span>{scenario.role}</span>
                      <span>•</span>
                      <span>{scenario.date}</span>
                    </div>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-50 text-amber-700">
                        Pending Review
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      Review
                    </button>
                    <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg transition-colors">
                      Edit
                    </button>
                    <button className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
                      Approve
                    </button>
                    <button className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shift Support / Coverage - Darker Blue Gradient */}
        <section className="mb-10">
          {/* Absence Alert Banner */}
          {showAbsenceAlert && (
            <div className="mb-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="text-amber-600 text-xl">🔔</div>
                  <div>
                    <div className="text-neutral-800 font-medium mb-1">Absence Alert</div>
                    <div className="text-neutral-700">
                      Jennifer Wu (Front Desk · 6:00 PM — 8:00 PM) has reported they cannot make their shift.
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePostOpenShift(shifts[3])}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Post Open Shift
                  </button>
                  <button
                    onClick={() => setShowAbsenceAlert(false)}
                    className="text-neutral-600 hover:text-neutral-800 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Success Banner */}
          {showSuccessBanner && (
            <div className="mb-4 bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="text-green-600 text-xl">✅</div>
                <div className="text-neutral-800">Open shift posted — volunteers have been notified</div>
              </div>
            </div>
          )}

          <h2 className="text-neutral-800 mb-4">Today's Shift Coverage</h2>
          
          {/* Summary Bar */}
          {!allCovered ? (
            <div className="mb-4 flex flex-wrap gap-3">
              <div className="bg-white rounded-full px-4 py-2 border border-neutral-200 flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-neutral-800">{confirmedCount} Confirmed</span>
              </div>
              {needsReplacementCount > 0 && (
                <div className="bg-white rounded-full px-4 py-2 border border-neutral-200 flex items-center gap-2">
                  <span className="text-red-600">🔴</span>
                  <span className="text-neutral-800">{needsReplacementCount} Needs Replacement</span>
                </div>
              )}
              {openCount > 0 && (
                <div className="bg-white rounded-full px-4 py-2 border border-neutral-200 flex items-center gap-2">
                  <span className="text-amber-600">🟡</span>
                  <span className="text-neutral-800">{openCount} Open</span>
                </div>
              )}
            </div>
          ) : (
            <div className="mb-4 bg-white rounded-xl p-4 border border-neutral-200 text-center">
              <span className="text-2xl">🎉</span>
              <span className="ml-2 text-neutral-800">All shifts covered today!</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shifts.map((shift) => (
              <div key={shift.id} className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-xl p-5 border border-blue-400 hover:border-blue-500 transition-all shadow-md">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-white/40 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-900" />
                  </div>
                  <div className="flex-1">
                    <div className="text-blue-900">{shift.time}</div>
                    <div className="text-blue-800 mt-1">{shift.type}</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-300">
                  <div>
                    {shift.assigned ? (
                      <div className="text-blue-900 mb-2">{shift.assigned}</div>
                    ) : (
                      <div className="text-red-700 mb-2">No one assigned</div>
                    )}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-sm ${
                        shift.status === 'confirmed' ? 'bg-green-50 text-green-700' :
                        shift.status === 'needs-replacement' ? 'bg-red-50 text-red-700' :
                        'bg-amber-50 text-amber-700'
                      }`}>
                        {shift.status === 'confirmed' ? 'Confirmed' :
                         shift.status === 'needs-replacement' ? 'Needs Replacement' :
                         'Open'}
                      </span>
                      {postedShifts.includes(shift.id) && shift.status === 'needs-replacement' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-sm bg-blue-50 text-blue-700">
                          Replacement Requested
                        </span>
                      )}
                      {postedShifts.includes(shift.id) && shift.status === 'open' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-sm bg-blue-50 text-blue-700">
                          Posted
                        </span>
                      )}
                    </div>

                    {/* Volunteer Responses Indicator */}
                    {postedShifts.includes(shift.id) && (
                      <button
                        onClick={() => handleShowResponses(shift.id)}
                        className="text-neutral-700 hover:text-neutral-900 mb-3 flex items-center gap-2"
                      >
                        <span>👋</span>
                        <span className="text-sm underline">2 volunteers available — tap to review</span>
                      </button>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      {shift.status === 'needs-replacement' && (
                        <>
                          <button
                            onClick={() => handlePostOpenShift(shift)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          >
                            Post Open Shift
                          </button>
                          <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg transition-colors">
                            Contact
                          </button>
                        </>
                      )}
                      {shift.status === 'open' && (
                        <>
                          <button
                            onClick={() => handlePostOpenShift(shift)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          >
                            Post Open Shift
                          </button>
                          <div className="relative">
                            <button
                              onClick={() => setShowManualAssignDropdown(showManualAssignDropdown === shift.id ? null : shift.id)}
                              className="px-4 py-2 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 rounded-lg transition-colors"
                            >
                              Assign Manually
                            </button>
                            {showManualAssignDropdown === shift.id && (
                              <div className="absolute top-full mt-1 left-0 bg-white border border-neutral-200 rounded-lg shadow-lg z-10 min-w-[200px]">
                                {availableVolunteers.map((volunteer) => (
                                  <button
                                    key={volunteer.id}
                                    onClick={() => {
                                      setShowManualAssignDropdown(null);
                                      setShowSuccessBanner(true);
                                      setTimeout(() => setShowSuccessBanner(false), 5000);
                                    }}
                                    className="w-full px-4 py-2 text-left text-neutral-800 hover:bg-neutral-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                                  >
                                    {volunteer.name}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                      {shift.status === 'confirmed' && (
                        <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg transition-colors">
                          Contact
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Post Open Shift Modal */}
        {showPostShiftModal && selectedShift && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl text-neutral-800">Post Open Shift</h3>
                <button
                  onClick={() => setShowPostShiftModal(false)}
                  className="text-neutral-600 hover:text-neutral-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4 p-4 bg-neutral-50 rounded-lg">
                <div className="text-neutral-700 mb-2">
                  <span className="font-medium">Role:</span> {selectedShift.type}
                </div>
                <div className="text-neutral-700 mb-2">
                  <span className="font-medium">Time:</span> {selectedShift.time}
                </div>
                <div className="text-neutral-700">
                  <span className="font-medium">Date:</span> Today
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-neutral-800 mb-2">
                  Any special instructions for this shift?
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-800"
                  rows={3}
                  placeholder="Optional notes..."
                />
                <div className="text-sm text-neutral-500 mt-1">
                  Do not include client names or personal information
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleConfirmPostShift}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Post Shift
                </button>
                <button
                  onClick={() => setShowPostShiftModal(false)}
                  className="flex-1 px-4 py-2 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Volunteer Responses Panel */}
        {showResponsesPanel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl text-neutral-800">Available Volunteers</h3>
                <button
                  onClick={() => setShowResponsesPanel(false)}
                  className="text-neutral-600 hover:text-neutral-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {volunteerResponses.map((volunteer) => (
                  <div key={volunteer.id} className="p-4 bg-neutral-50 rounded-lg flex items-center justify-between">
                    <div className="text-neutral-800">{volunteer.name}</div>
                    <button
                      onClick={() => handleConfirmVolunteer(volunteer.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Confirm
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowResponsesPanel(false)}
                className="w-full mt-4 px-4 py-2 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Volunteer Details Modal */}
        {showVolunteerDetailsModal && selectedVolunteer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl text-neutral-800">{selectedVolunteer.name}</h3>
                  <div className="text-neutral-600 mt-1">{selectedVolunteer.role}</div>
                </div>
                <button
                  onClick={() => setShowVolunteerDetailsModal(false)}
                  className="text-neutral-600 hover:text-neutral-800 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Overall Progress */}
                <div className="mb-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-neutral-800">Overall Progress</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                      selectedVolunteer.status === 'ready' ? 'bg-green-50 text-green-700' :
                      selectedVolunteer.status === 'in-progress' ? 'bg-blue-50 text-blue-700' :
                      'bg-neutral-100 text-neutral-700'
                    }`}>
                      {selectedVolunteer.status === 'ready' ? 'Ready' :
                       selectedVolunteer.status === 'in-progress' ? 'In Progress' :
                       'Not Started'}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2 mt-3">
                    <div 
                      className={`h-2 rounded-full ${
                        selectedVolunteer.status === 'ready' ? 'bg-green-600 w-full' :
                        selectedVolunteer.status === 'in-progress' ? 'bg-blue-600 w-2/3' :
                        'bg-neutral-400 w-0'
                      }`}
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-6">
                  <h4 className="text-neutral-800 mb-3">Contact Information</h4>
                  <div className="space-y-2 bg-neutral-50 rounded-lg p-4">
                    <div className="text-neutral-700">
                      <span className="font-medium">Email:</span> {selectedVolunteer.name.toLowerCase().replace(' ', '.')}@email.com
                    </div>
                    <div className="text-neutral-700">
                      <span className="font-medium">Phone:</span> (604) 555-{String(selectedVolunteer.id).padStart(4, '0')}
                    </div>
                    <div className="text-neutral-700">
                      <span className="font-medium">Start Date:</span> April {selectedVolunteer.id}, 2026
                    </div>
                  </div>
                </div>

                {/* Onboarding Checklist */}
                <div className="mb-6">
                  <h4 className="text-neutral-800 mb-3">Onboarding Checklist</h4>
                  <div className="space-y-3">
                    {/* Generate checklist items based on volunteer status */}
                    {(() => {
                      const checklistItems = [
                        { name: 'Orientation session', status: selectedVolunteer.status !== 'not-started' ? 'complete' : 'pending' },
                        { name: 'Background check', status: selectedVolunteer.id === 1 ? 'pending' : selectedVolunteer.status === 'ready' ? 'complete' : 'pending' },
                        { name: 'Safety training', status: selectedVolunteer.id === 1 ? 'pending' : selectedVolunteer.status === 'ready' ? 'complete' : 'pending' },
                        { name: 'Role-specific training', status: selectedVolunteer.status === 'ready' ? 'complete' : selectedVolunteer.status === 'in-progress' ? 'in-progress' : 'pending' },
                        { name: 'Scenario submission', status: selectedVolunteer.id === 4 ? 'pending' : selectedVolunteer.status === 'ready' ? 'complete' : 'pending' },
                        { name: 'System access setup', status: selectedVolunteer.status === 'ready' ? 'complete' : 'pending' },
                      ];

                      return checklistItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                          <div className="flex items-center gap-3">
                            {item.status === 'complete' ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : item.status === 'in-progress' ? (
                              <Clock className="w-5 h-5 text-blue-600" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-neutral-300" />
                            )}
                            <span className="text-neutral-800">{item.name}</span>
                          </div>
                          <span className={`text-sm ${
                            item.status === 'complete' ? 'text-green-600' :
                            item.status === 'in-progress' ? 'text-blue-600' :
                            'text-neutral-500'
                          }`}>
                            {item.status === 'complete' ? 'Completed' :
                             item.status === 'in-progress' ? 'In Progress' :
                             'Not Started'}
                          </span>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                {/* Training Progress */}
                <div className="mb-6">
                  <h4 className="text-neutral-800 mb-3">Training Modules</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <span className="text-neutral-700">Welcome & Organization Overview</span>
                      <span className="text-sm text-green-600">100%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <span className="text-neutral-700">Confidentiality & Privacy</span>
                      <span className="text-sm text-green-600">{selectedVolunteer.status === 'not-started' ? '0%' : '100%'}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <span className="text-neutral-700">Role-Specific Training</span>
                      <span className="text-sm text-blue-600">{selectedVolunteer.status === 'ready' ? '100%' : selectedVolunteer.status === 'in-progress' ? '67%' : '0%'}</span>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                {selectedVolunteer.status !== 'ready' && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="text-blue-900 mb-2">Next Steps</h4>
                    <ul className="text-blue-800 space-y-1 ml-4">
                      {selectedVolunteer.missing && selectedVolunteer.missing !== 'All items pending' && (
                        selectedVolunteer.missing.split(', ').map((item, index) => (
                          <li key={index}>• Complete {item.toLowerCase()}</li>
                        ))
                      )}
                      {selectedVolunteer.status === 'not-started' && (
                        <>
                          <li>• Schedule orientation session</li>
                          <li>• Submit background check application</li>
                          <li>• Complete safety training</li>
                        </>
                      )}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-200">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Send Reminder
                  </button>
                  <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg transition-colors">
                    Edit Details
                  </button>
                  <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg transition-colors">
                    View Profile
                  </button>
                  {selectedVolunteer.status !== 'ready' && (
                    <button className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
                      Mark as Ready
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Knowledge Base Updates - Lighter Blue Gradient */}
          <section className="lg:col-span-2">
            <h2 className="text-neutral-800 mb-4">Knowledge Base Updates</h2>
            <div className="bg-gradient-to-br from-blue-300 to-blue-400 rounded-xl border border-blue-500 divide-y divide-blue-400 shadow-md">
              {knowledgeBaseUpdates.map((item, index) => (
                <div key={index} className="p-5 hover:bg-blue-200 transition-colors bg-white/30">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/40 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-900" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-blue-900 mb-1">{item.title}</h4>
                      <div className="text-blue-800">
                        {item.type} {item.date && `• ${item.date}`}
                        {item.searches && ` • ${item.searches} searches this week`}
                      </div>
                    </div>
                    <button className="px-3 py-1.5 text-blue-900 hover:bg-white/40 rounded-lg transition-colors">
                      View
                    </button>
                  </div>
                </div>
              ))}
              <div className="p-5 bg-white/40">
                <div className="text-blue-900 mb-2">Suggested areas needing content:</div>
                <ul className="text-blue-800 space-y-1 ml-4">
                  <li>• Immigration document checklist</li>
                  <li>• Evening program procedures</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Support and Escalation - Deeper Blue Gradient */}
          <section>
            <h2 className="text-neutral-800 mb-4">Support & Contacts</h2>
            <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl border border-blue-600 p-5 shadow-md">
              <div className="space-y-4">
                {supportContacts.map((contact, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white/40 rounded-lg">
                    <div className="p-2 bg-white/60 rounded-lg">
                      <Phone className="w-5 h-5 text-blue-900" />
                    </div>
                    <div className="flex-1">
                      <div className="text-blue-900">{contact.label}</div>
                      <div className="text-blue-800 mt-1">{contact.contact}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-blue-600">
                <button className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors">
                  View Emergency Protocol
                </button>
              </div>
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}
