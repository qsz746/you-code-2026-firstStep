import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, X } from 'lucide-react';
import CoordinatorNavigation from './CoordinatorNavigation';

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
  const [banner, setBanner] = useState<{ type: 'success' | 'info'; message: string } | null>(null);

  useEffect(() => {
    if (!location.state) return;

    const { action, submissionId } = location.state as { action?: string; submissionId?: number };

    if (action === 'approve' && submissionId) {
      setScenarios(prev =>
        prev
          .map(scenario =>
            scenario.id === submissionId
              ? { ...scenario, status: 'approved' as const }
              : scenario
          )
          .sort((a, b) => {
            if (a.status === 'approved' && b.status !== 'approved') return 1;
            if (a.status !== 'approved' && b.status === 'approved') return -1;
            return 0;
          })
      );
      setBanner({ type: 'success', message: 'Added to FAQ and now visible to all volunteers' });
      setTimeout(() => setBanner(null), 5000);
    }

    if (action === 'reject' && submissionId) {
      setScenarios(prev =>
        prev.map(scenario =>
          scenario.id === submissionId
            ? { ...scenario, status: 'rejected' as const }
            : scenario
        )
      );
      setBanner({ type: 'info', message: 'Submission rejected and removed from queue' });
      setTimeout(() => setBanner(null), 5000);
    }

    window.history.replaceState({}, document.title);
  }, [location.state]);

  const pendingScenarios = scenarios.filter(scenario => scenario.status === 'pending');
  const approvedScenarios = scenarios.filter(scenario => scenario.status === 'approved');
  const rejectedScenarios = scenarios.filter(scenario => scenario.status === 'rejected');

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
              {pendingScenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => navigate(`/coordinator/resources/submission/${scenario.id}`)}
                  className="w-full bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md hover:border-blue-200 transition-all shadow-sm text-left"
                >
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
                    <div className="flex items-center text-blue-600">
                      <span className="text-sm font-medium">Open submission</span>
                    </div>
                  </div>
                </button>
              ))}

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
    </div>
  );
}
