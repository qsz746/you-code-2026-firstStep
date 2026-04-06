import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Sparkles } from 'lucide-react';
import CoordinatorNavigation from './CoordinatorNavigation';
import { getSubmissionById, updateSubmission } from '../../services/faqService';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

type Submission = {
  id: string;
  question?: string;
  answer?: string;
  submittedBy?: string;
  role?: string;
  createdAt?: any;
  whatHappened?: string;
};

export default function ScenarioSubmissionDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState('');
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectNote, setRejectNote] = useState('');

  useEffect(() => {
    async function loadSubmission() {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getSubmissionById(id);
        if (!data) {
          setSubmission(null);
          setError('Submission not found');
          return;
        }
        setSubmission(data as Submission);
        setEditedAnswer((data as Submission).answer ?? '');
        setError(null);
      } catch (err) {
        console.error('Failed to load submission:', err);
        const message = err instanceof Error ? err.message : String(err);
        setError(`Loading submission failed: ${message}`);
      } finally {
        setLoading(false);
      }
    }

    loadSubmission();
  }, [id]);

  useEffect(() => {
    if (location.state?.editMode) {
      setIsEditMode(true);
    }
  }, [location.state]);

  const handleSaveChanges = async () => {
    if (!submission) return;
    try {
      await updateSubmission(submission.id, { answer: editedAnswer });
      setSubmission({ ...submission, answer: editedAnswer });
      setIsEditMode(false);
    } catch (err) {
      console.error('Failed to update submission:', err);
      alert('Save failed. Please try again.');
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleApprove = () => {
    if (!submission) return;
    navigate('/coordinator/resources', { state: { action: 'approve', submissionId: submission.id } });
  };

  const handleReject = () => {
    if (!submission) return;
    navigate('/coordinator/resources', {
      state: { action: 'reject', submissionId: submission.id, note: rejectNote }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <CoordinatorNavigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-neutral-600">Loading submission...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!submission || error) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <CoordinatorNavigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-neutral-600">{error || 'Submission not found'}</p>
            <button
              onClick={() => navigate('/coordinator/resources')}
              className="mt-4 px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg transition-colors"
            >
              Back to Resources
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <CoordinatorNavigation />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/coordinator/resources')}
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Pending Submissions</span>
        </button>

        <h1 className="text-neutral-800 mb-2">{submission.question || 'Scenario submission'}</h1>

        <div className="flex flex-wrap gap-4 text-neutral-600 mb-6">
          <span>Submitted by: {submission.submittedBy || 'Anonymous Volunteer'}</span>
          <span>•</span>
          <span>{submission.role || 'Volunteer'}</span>
          <span>•</span>
          <span>{submission.createdAt?.toDate?.().toLocaleDateString?.() || 'New submission'}</span>
        </div>

        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-amber-900">
            Remember to remove any personal or client details before approving
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-neutral-800 mb-3">Suggested FAQ Question</h3>
            <p className="text-neutral-700 leading-relaxed">
              {submission.question || 'No question provided.'}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-neutral-800 mb-3">Suggested Answer</h3>
            {isEditMode ? (
              <textarea
                value={editedAnswer}
                onChange={(e) => setEditedAnswer(e.target.value)}
                className="w-full min-h-[180px] p-4 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-700 leading-relaxed"
              />
            ) : (
              <p className="text-neutral-700 leading-relaxed">
                {submission.answer || 'No answer draft yet.'}
              </p>
            )}
          </div>

          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-3">
              <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <h3 className="text-neutral-800">AI Draft Answer</h3>
            </div>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Based on this submission, here is a suggested answer ready for the FAQ. Please review and edit before approving.
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleEdit}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Edit Draft
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pb-8">
          {isEditMode ? (
            <>
              <button
                onClick={handleSaveChanges}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditMode(false)}
                className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => setApproveModalOpen(true)}
                className="px-6 py-3 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-lg transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => setRejectModalOpen(true)}
                className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg transition-colors"
              >
                Reject
              </button>
            </>
          )}
        </div>
      </main>

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
              onClick={handleApprove}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Yes, Approve
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
              onClick={handleReject}
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
