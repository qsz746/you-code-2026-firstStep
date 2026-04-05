import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Sparkles } from 'lucide-react';
import CoordinatorNavigation from './CoordinatorNavigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface Submission {
  id: number;
  title: string;
  submittedBy: string;
  role: string;
  date: string;
  status: string;
  whatHappened: string;
  question: string;
  suggestedQuestion: string;
  suggestedAnswer: string;
}

const mockSubmissions: Record<number, Submission> = {
  1: {
    id: 1,
    title: 'Helping client with urgent housing forms',
    submittedBy: 'Sarah Kim',
    role: 'Case Worker',
    date: '2026-04-03',
    status: 'pending',
    whatHappened: 'A client came in very stressed because they had received an eviction notice and needed to fill out emergency housing assistance forms by the end of the day. They had multiple forms from different agencies and were confused about which ones to complete first and what documentation they needed. I helped them prioritize the forms and gather the required documents, but I wasn\'t sure if I gave them the right advice about the order of applications.',
    question: 'What is the recommended order for completing multiple emergency housing forms, and how do we prioritize when a client has applications for several different programs?',
    suggestedQuestion: 'What is the recommended order for completing multiple emergency housing forms when a client has applications for several different programs?',
    suggestedAnswer: 'Start with BC Housing applications first, then move to federal programs. Gather all ID documents before starting any forms. If unsure, check with the case manager on duty.'
  },
  2: {
    id: 2,
    title: 'Language barrier during intake appointment',
    submittedBy: 'Michael Chen',
    role: 'Intake Coordinator',
    date: '2026-04-02',
    status: 'pending',
    whatHappened: 'During an intake appointment, the client spoke very limited English and the interpreter service was unavailable. I used a translation app on my phone to help communicate, but I wasn\'t sure if this was the proper protocol. The client seemed to understand most of what we discussed, but I\'m concerned about whether the information I collected is accurate enough.',
    question: 'What is the proper protocol when interpreter services are unavailable during an appointment? Should we reschedule or are there approved alternative methods for communication?',
    suggestedQuestion: 'What is the proper protocol when interpreter services are unavailable during an appointment?',
    suggestedAnswer: 'Try to use approved interpretation options first. If accurate communication cannot be confirmed, pause the intake and reschedule with language support in place.'
  },
  3: {
    id: 3,
    title: 'Technology access issue in computer lab',
    submittedBy: 'Priya Patel',
    role: 'Tech Support',
    date: '2026-04-01',
    status: 'pending',
    whatHappened: 'A client needed to complete an online application for employment insurance but all computers in our lab were being used. They mentioned they had a smartphone but no data plan. I offered to create a mobile hotspot from my personal phone so they could use their device to complete the application. They were very grateful, but afterward I wondered if this was appropriate.',
    question: 'Is it acceptable to use personal devices or hotspots to help clients access online services when our resources are fully occupied? What are the alternatives?',
    suggestedQuestion: 'Can staff use personal devices or hotspots to help clients access online services when shared resources are full?',
    suggestedAnswer: 'Avoid using personal devices or hotspots for client services unless your organization explicitly allows it. Offer waitlist support, schedule another time, or connect the client with approved access options.'
  }
};

export default function ScenarioSubmissionDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedSubmission, setEditedSubmission] = useState<Submission | null>(null);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectNote, setRejectNote] = useState('');

  const submissionId = id ? parseInt(id, 10) : 1;
  const submission = editedSubmission || mockSubmissions[submissionId];

  useEffect(() => {
    if (location.state?.editMode) {
      setIsEditMode(true);
      setEditedSubmission(mockSubmissions[submissionId]);
    }
  }, [location.state, submissionId]);

  if (!submission) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <CoordinatorNavigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-neutral-600">Submission not found</p>
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

  const handleSaveChanges = () => {
    setIsEditMode(false);
  };

  const handleEdit = () => {
    setEditedSubmission({ ...submission });
    setIsEditMode(true);
  };

  const handleApprove = () => {
    navigate('/coordinator/resources', { state: { action: 'approve', submissionId: submission.id } });
  };

  const handleReject = () => {
    navigate('/coordinator/resources', {
      state: { action: 'reject', submissionId: submission.id, note: rejectNote }
    });
  };

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

        <h1 className="text-neutral-800 mb-2">{submission.title}</h1>

        <div className="flex flex-wrap gap-4 text-neutral-600 mb-6">
          <span>Submitted by: {submission.submittedBy}</span>
          <span>•</span>
          <span>{submission.role}</span>
          <span>•</span>
          <span>{submission.date}</span>
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
              {submission.suggestedQuestion}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-neutral-800 mb-3">Suggested Answer</h3>
            {isEditMode ? (
              <textarea
                value={submission.suggestedAnswer}
                onChange={(e) => {
                  setEditedSubmission(current =>
                    current
                      ? { ...current, suggestedAnswer: e.target.value }
                      : current
                  );
                }}
                className="w-full min-h-[180px] p-4 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-700 leading-relaxed"
              />
            ) : (
              <p className="text-neutral-700 leading-relaxed">
                {submission.suggestedAnswer}
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
                onClick={() => {
                  setIsEditMode(false);
                  setEditedSubmission(null);
                }}
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
