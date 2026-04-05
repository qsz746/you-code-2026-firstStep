import CoordinatorNavigation from './CoordinatorNavigation';
import { Clock, X } from 'lucide-react';
import { useState } from 'react';

export default function CoordinatorSchedulePage() {
  // State for shift coverage features
  const [showPostShiftModal, setShowPostShiftModal] = useState(false);
  const [selectedShift, setSelectedShift] = useState<any>(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showAbsenceAlert, setShowAbsenceAlert] = useState(true);
  const [postedShifts, setPostedShifts] = useState<number[]>([]);
  const [showResponsesPanel, setShowResponsesPanel] = useState(false);
  const [responsesForShift, setResponsesForShift] = useState<number | null>(null);
  const [showManualAssignDropdown, setShowManualAssignDropdown] = useState<number | null>(null);
  const [shifts, setShifts] = useState([
    { id: 1, time: '9:00 AM - 12:00 PM', type: 'Front Desk', assigned: 'Maria Santos', status: 'confirmed' },
    { id: 2, time: '12:00 PM - 3:00 PM', type: 'Language Support', assigned: 'Ahmed Hassan', status: 'confirmed' },
    { id: 3, time: '3:00 PM - 6:00 PM', type: 'Workshop', assigned: '', status: 'open' },
    { id: 4, time: '6:00 PM - 8:00 PM', type: 'Front Desk', assigned: 'Jennifer Wu', status: 'needs-replacement' }
  ]);

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
    // Find the volunteer and update the shift assignment
    const volunteer = volunteerResponses.find(v => v.id === volunteerId);
    if (volunteer && responsesForShift) {
      setShifts(prevShifts =>
        prevShifts.map(shift =>
          shift.id === responsesForShift
            ? { ...shift, assigned: volunteer.name, status: 'confirmed' }
            : shift
        )
      );
    }
    setShowResponsesPanel(false);
    setShowSuccessBanner(true);
    setTimeout(() => setShowSuccessBanner(false), 5000);
  };

  const handleManualAssign = (shiftId: number, volunteer: { id: number; name: string }) => {
    setShifts(prevShifts =>
      prevShifts.map(shift =>
        shift.id === shiftId
          ? { ...shift, assigned: volunteer.name, status: 'confirmed' }
          : shift
      )
    );
    setShowManualAssignDropdown(null);
    setShowSuccessBanner(true);
    setTimeout(() => setShowSuccessBanner(false), 5000);
  };

  // Calculate shift stats
  const confirmedCount = shifts.filter(s => s.status === 'confirmed').length;
  const needsReplacementCount = shifts.filter(s => s.status === 'needs-replacement').length;
  const openCount = shifts.filter(s => s.status === 'open').length;
  const allCovered = needsReplacementCount === 0 && openCount === 0;

  return (
    <div className="min-h-screen bg-neutral-50">
      <CoordinatorNavigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <div key={shift.id} className="bg-white rounded-xl p-5 border border-neutral-200 hover:border-neutral-300 transition-all shadow-md">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-neutral-800">{shift.time}</div>
                    <div className="text-neutral-600 mt-1">{shift.type}</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <div>
                    {shift.assigned ? (
                      <div className="text-neutral-800 mb-2">{shift.assigned}</div>
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
                                    onClick={() => handleManualAssign(shift.id, volunteer)}
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
      </main>
    </div>
  );
}
