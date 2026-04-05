import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import CoordinatorNavigation from './CoordinatorNavigation';
import { CheckCircle2, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface Scenario {
  id: number;
  title: string;
  submittedBy: string;
  role: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function CoordinatorResourcesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [scenarios, setScenarios] = useState<Scenario[]>([
    { id: 1, title: 'Helping client with urgent housing forms', submittedBy: 'Sarah Kim', role: 'Case Worker', date: '2026-04-03', status: 'pending' },
    { id: 2, title: 'Language barrier during intake appointment', submittedBy: 'Michael Chen', role: 'Intake Coordinator', date: '2026-04-02', status: 'pending' },
    { id: 3, title: 'Technology access issue in computer lab', submittedBy: 'Priya Patel', role: 'Tech Support', date: '2026-04-01', status: 'pending' }
  ]);

  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [rejectNote, setRejectNote] = useState('');
  const [banner, setBanner] = useState<{ type: 'success' | 'info'; message: string } | null>(null);

  // Handle approve/reject actions coming from detail page
  useEffect(() => {
    if (location.state) {
      const { action, submissionId } = location.state as { action?: string; submissionId?: number };
      if (action === 'approve' && submissionId) {
        const scenario = scenarios.find(s => s.id === submissionId);
        if (scenario) {
          setSelectedScenario(scenario);
          setApproveModalOpen(true);
        }
      } else if (action === 'reject' && submissionId) {
        const scenario = scenarios.find(s => s.id === submissionId);
        if (scenario) {
          setSelectedScenario(scenario);
          setRejectModalOpen(true);
        }
      }
      // Clear the location state
      window.history.replaceState({}, document.title);
    }
  }, [location.state, scenarios]);

  const handleReview = (scenario: Scenario) => {
    navigate(`/coordinator/resources/submission/${scenario.id}`);
  };

  const handleEdit = (scenario: Scenario) => {
    navigate(`/coordinator/resources/submission/${scenario.id}`, { state: { editMode: true } });
  };

  const handleApproveClick = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setApproveModalOpen(true);
  };

  const handleRejectClick = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setRejectModalOpen(true);
  };

  const confirmApprove = () => {
    if (selectedScenario) {
      setScenarios(prev => 
        prev.map(s => 
          s.id === selectedScenario.id 
            ? { ...s, status: 'approved' as const }
            : s
        ).sort((a, b) => {
          // Move approved to bottom
          if (a.status === 'approved' && b.status !== 'approved') return 1;
          if (a.status !== 'approved' && b.status === 'approved') return -1;
          return 0;
        })
      );
      setBanner({ type: 'success', message: 'Added to FAQ — now visible to all volunteers' });
      setApproveModalOpen(false);
      setSelectedScenario(null);
      
      // Auto-hide banner after 5 seconds
      setTimeout(() => setBanner(null), 5000);
    }
  };

  const confirmReject = () => {
    if (selectedScenario) {
      setScenarios(prev => 
        prev.map(s => 
          s.id === selectedScenario.id 
            ? { ...s, status: 'rejected' as const }
            : s
        )
      );
      setBanner({ type: 'info', message: 'Submission rejected and removed from queue' });
      setRejectModalOpen(false);
      setSelectedScenario(null);
      setRejectNote('');
      
      // Auto-hide banner after 5 seconds
      setTimeout(() => setBanner(null), 5000);
    }
  };

  const pendingScenarios = scenarios.filter(s => s.status === 'pending');
  const approvedScenarios = scenarios.filter(s => s.status === 'approved');
  const rejectedScenarios = scenarios.filter(s => s.status === 'rejected');

  // Current FAQ items (these are the live published FAQs)
  const currentFAQs = [
    { id: 1, question: 'Where is the washroom?', category: 'Arrival & Orientation' },
    { id: 2, question: 'What should I do if someone needs urgent help?', category: 'Emergency Procedures' },
    { id: 3, question: 'How do I help someone book an appointment?', category: 'Client Support' },
    { id: 4, question: 'What if a client speaks limited English?', category: 'Communication' },
    { id: 5, question: 'Where can I find the intake forms?', category: 'Documentation' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <CoordinatorNavigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner */}
        {banner && (
          <div 
            className={`mb-6 p-4 rounded-lg flex items-center justify-between ${
              banner.type === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-neutral-100 border border-neutral-300'
            }`}
          >
            <div className="flex items-center gap-3">
              {banner.type === 'success' && (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              )}
              <span className={banner.type === 'success' ? 'text-green-900' : 'text-neutral-700'}>
                {banner.message}
              </span>
            </div>
            <button
              onClick={() => setBanner(null)}
              className="p-1 hover:bg-black/5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Pending Scenario Submissions - Elegant Cards */}
        <section className="mb-10">
          <h2 className="text-neutral-800 mb-4">Pending Scenario Submissions</h2>

          {pendingScenarios.length === 0 && approvedScenarios.length === 0 && rejectedScenarios.length === 0 ? (
            <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center shadow-sm">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
              <p className="text-neutral-600 text-lg">All caught up! No pending submissions.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Pending Submissions */}
              {pendingScenarios.map((scenario) => (
                <div key={scenario.id} className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md transition-all shadow-sm">
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
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-50 text-amber-700 border border-amber-200">
                          Pending Review
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleReview(scenario)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
                      >
                        Review
                      </button>
                      <button
                        onClick={() => handleEdit(scenario)}
                        className="px-4 py-2 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleApproveClick(scenario)}
                        className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-lg transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectClick(scenario)}
                        className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Approved Submissions */}
              {approvedScenarios.map((scenario) => (
                <div key={scenario.id} className="bg-green-50 rounded-xl border border-green-200 p-6 shadow-sm">
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
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 border border-green-300">
                          Approved
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Rejected Submissions */}
              {rejectedScenarios.map((scenario) => (
                <div key={scenario.id} className="bg-neutral-50 rounded-xl border border-neutral-200 p-6 shadow-sm opacity-70">
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
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-neutral-200 text-neutral-600 border border-neutral-300">
                          Rejected
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Empty state for pending only */}
              {pendingScenarios.length === 0 && (approvedScenarios.length > 0 || rejectedScenarios.length > 0) && (
                <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center shadow-sm">
                  <div className="flex justify-center mb-3">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <p className="text-neutral-600">All caught up! No pending submissions.</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Current FAQ Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-neutral-800">Current FAQ</h2>
            <Link 
              to="/volunteer/faq" 
              className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              View full FAQ →
            </Link>
          </div>
          
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm divide-y divide-neutral-100">
            {currentFAQs.map((faq) => (
              <div key={faq.id} className="p-5 hover:bg-neutral-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className="text-neutral-800 flex-1">{faq.question}</h3>
                  <span className="text-sm text-neutral-500">{faq.category}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Approve Modal */}
      <Dialog open={approveModalOpen} onOpenChange={setApproveModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Add this to the FAQ?</DialogTitle>
            <DialogDescription>
              It will be visible to all volunteers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setApproveModalOpen(false)}
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmApprove}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Yes, Approve
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Modal */}
      <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Are you sure you want to reject this submission?</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label htmlFor="reject-note" className="block text-sm text-neutral-600 mb-2">
              Add a note for the volunteer (optional)
            </label>
            <textarea
              id="reject-note"
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
              placeholder="Optional feedback..."
              className="w-full min-h-[100px] p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-700"
            />
          </div>
          <DialogFooter>
            <button
              onClick={() => {
                setRejectModalOpen(false);
                setRejectNote('');
              }}
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmReject}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Yes, Reject
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}