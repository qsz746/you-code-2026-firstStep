import CoordinatorNavigation from './CoordinatorNavigation';
import { useState, useEffect } from 'react';
import { CheckCircle, Clock, X } from 'lucide-react';

export default function CoordinatorVolunteersPage() {
  // State for volunteer onboarding details
  const [showVolunteerDetailsModal, setShowVolunteerDetailsModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);

  const onboardingVolunteers = [
    { id: 1, name: 'Maria Santos', role: 'Front Desk Support', status: 'in-progress', missing: 'Background check, Safety training' },
    { id: 2, name: 'Ahmed Hassan', role: 'Language Partner', status: 'ready', missing: '' },
    { id: 3, name: 'Jennifer Wu', role: 'Workshop Facilitator', status: 'not-started', missing: 'All items pending' },
    { id: 4, name: 'Carlos Mendez', role: 'Tech Support', status: 'in-progress', missing: 'Scenario submission' }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <CoordinatorNavigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

      </main>

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
    </div>
  );
}