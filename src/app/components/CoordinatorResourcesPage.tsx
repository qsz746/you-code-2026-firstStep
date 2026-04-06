import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, X } from 'lucide-react';
import CoordinatorNavigation from './CoordinatorNavigation';
import { getPendingSubmissions, getApprovedFAQs, approveSubmission, rejectSubmission } from '../../services/faqService';

export default function CoordinatorResourcesPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [scenarios, setScenarios] = useState<any[]>([]);
  const [banner, setBanner] = useState<{ type: 'success' | 'info'; message: string } | null>(null);
  const [currentFAQs, setCurrentFAQs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const submissions = await getPendingSubmissions();
      const faqs = await getApprovedFAQs();
      setError(null);
      setScenarios(submissions);
      setCurrentFAQs(faqs);
    } catch (err) {
      console.error('Error loading data:', err);
      const message = err instanceof Error ? err.message : String(err);
      setError(`Loading data failed: ${message}`);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!location.state) return;
    const { action, submissionId, note } = location.state as { action?: string; submissionId?: string; note?: string };

    const runAction = async () => {
      if (!action || !submissionId) return;
      try {
        setIsRefreshing(true);
        if (action === 'approve') {
          await approveSubmission(submissionId);
          setBanner({ type: 'success', message: 'Added to FAQ and now visible to all volunteers' });
        } else if (action === 'reject') {
          await rejectSubmission(submissionId, note || '');
          setBanner({ type: 'info', message: 'Submission rejected and removed from queue' });
        }
        await loadData();
        setTimeout(() => setBanner(null), 5000);
      } catch (err) {
        console.error('Action failed:', err);
        const message = err instanceof Error ? err.message : String(err);
        setError(`Action failed: ${message}`);
      } finally {
        setIsRefreshing(false);
      }
    };

    runAction();
    window.history.replaceState({}, document.title);
  }, [location.state]);

  const pendingScenarios = scenarios.filter((scenario) => scenario.status === 'pending');

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

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        )}

        {isRefreshing && (
          <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-700">
            Updating submissions...
          </div>
        )}

        <section className="mb-10">
          <h2 className="text-neutral-800 mb-4">Pending Scenario Submissions</h2>

          {pendingScenarios.length === 0 ? (
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
                      <h3 className="text-neutral-800 mb-2">{scenario.question}</h3>
                      <div className="flex flex-wrap gap-4 text-neutral-600">
                        <span>Submitted by: {scenario.submittedBy}</span>
                        <span>•</span>
                        <span>{scenario.role}</span>
                        <span>•</span>
                        <span>{scenario.createdAt?.toDate?.().toLocaleDateString?.() || 'New submission'}</span>
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
              View full FAQ ?
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
