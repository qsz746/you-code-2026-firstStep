import { ArrowLeft, Globe, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createFAQSubmission } from '../../services/faqService';
import { useAuth } from '../AuthContext';

export default function SuggestScenario() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [situation, setSituation] = useState('');
  const [question, setQuestion] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get roles from localStorage or use default
  const getActiveRoles = () => {
    const savedRoles = localStorage.getItem('volunteerRoles');
    if (savedRoles) {
      const rolesData = JSON.parse(savedRoles);
      return rolesData.filter((r: any) => !r.archived).map((r: any) => r.name);
    }
    return ['Front Desk', 'Language Support', 'Program Support', 'Settlement Support', 'Peer Support'];
  };

  // Load roles on mount
  useEffect(() => {
    setRoles(getActiveRoles());
  }, []);

  const categories = ['Arrival', 'Tasks', 'Safety', 'Hours', 'Emergency', 'Other'];

  const handleSubmit = async () => {
    if (!question.trim() || !selectedRole) {
      alert('Please add a question and select a role.');
      return;
    }

    try {
      setIsSubmitting(true);
      const submittedBy = user?.displayName || user?.email || 'Anonymous Volunteer';
      await createFAQSubmission({
        question: question.trim(),
        answer: '',
        category: selectedCategory ? selectedCategory.toLowerCase() : 'other',
        submittedBy,
        role: selectedRole,
        whatHappened: situation.trim(),
      });
      navigate('/volunteer/scenario-submitted');
    } catch (error) {
      console.error('Failed to submit scenario:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    // In a real app, this would save to local storage or backend
    alert('Draft saved locally');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border-b border-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 text-white hover:bg-blue-700/50 rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Link to="/" className="hover:text-blue-200 transition-colors flex items-center">
                <span className="text-white font-semibold text-2xl">First</span>
                <span className="text-blue-300 font-semibold text-2xl">Step</span>
              </Link>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-white hover:bg-blue-700/50 rounded-lg transition-colors">
              <Globe className="w-5 h-5" />
              <span>English</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <h2 className="text-blue-900 mb-2">Suggest a Missing Scenario</h2>
        <p className="text-blue-800 text-lg mb-8">
          Your suggestion helps improve the FAQ for everyone
        </p>

        {/* Form Fields */}
        <div className="space-y-6 mb-6">
          {/* Field 1 - What happened? */}
          <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm">
            <label className="block text-blue-900 font-medium mb-3">
              What situation did you encounter?
            </label>
            <textarea
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="Describe what happened during your shift..."
              rows={5}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg outline-none focus:border-blue-500 text-blue-900 placeholder-blue-400 resize-none"
              style={{ minHeight: '120px' }}
            />
            <p className="text-sm text-neutral-500 mt-2">
              Keep it general — do not include any client names or personal details
            </p>
          </div>

          {/* Field 2 - What were you trying to find out? */}
          <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm">
            <label className="block text-blue-900 font-medium mb-3">
              What question were you trying to answer?
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. What do I do when a client asks about housing support?"
              rows={4}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg outline-none focus:border-blue-500 text-blue-900 placeholder-blue-400 resize-none"
              style={{ minHeight: '100px' }}
            />
          </div>

          {/* Field 3 - Your role */}
          <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm">
            <label className="block text-blue-900 font-medium mb-4">
              Which role does this apply to?
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg outline-none focus:border-blue-500 text-blue-900 bg-white"
              style={{ minHeight: '48px' }}
            >
              <option value="" disabled>Select your role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Field 4 - Category (optional) */}
          <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm">
            <label className="block text-blue-900 font-medium mb-4">
              Category (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                      : 'bg-white text-blue-800 border-2 border-blue-300 hover:bg-blue-50'
                  }`}
                  style={{ minHeight: '40px' }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Privacy Reminder Banner */}
        <div className="bg-blue-100 rounded-xl p-5 mb-6 border-2 border-blue-200">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-700 flex-shrink-0 mt-0.5" />
            <p className="text-blue-900">
              Please do not include any client names, personal information, or identifying details in your submission
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all"
            style={{ minHeight: '56px' }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
          </button>
          <button
            onClick={handleSaveDraft}
            className="flex-1 px-6 py-4 bg-white text-blue-800 font-medium rounded-xl border-2 border-blue-300 hover:bg-blue-50 transition-all"
            style={{ minHeight: '56px' }}
          >
            Save as Draft
          </button>
        </div>
      </main>
    </div>
  );
}
