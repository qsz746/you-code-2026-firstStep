import { ArrowLeft, Globe, Search, MapPin, Clock, Shield, Phone as PhoneIcon, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getApprovedFAQs } from '../../services/faqService';

export default function VolunteerFAQ() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'arrival', label: 'Arrival', icon: MapPin },
    { id: 'tasks', label: 'Tasks', icon: Clock },
    { id: 'safety', label: 'Safety', icon: Shield },
    { id: 'hours', label: 'Hours', icon: Clock },
    { id: 'emergency', label: 'Emergency', icon: AlertCircle },
  ];

  useEffect(() => {
    async function loadFAQs() {
      try {
        const items = await getApprovedFAQs();
        setFaqs(items);
        setError(null);
      } catch (err) {
        console.error('Failed to load FAQs:', err);
        const message = err instanceof Error ? err.message : String(err);
        setError(`Loading FAQs failed: ${message}`);
      } finally {
        setLoading(false);
      }
    }

    loadFAQs();
  }, []);

  const normalizedFAQs = faqs.map((faq) => {
    const category = typeof faq.category === 'string' ? faq.category.toLowerCase() : 'other';
    return { ...faq, category };
  });

  const filteredFAQs = normalizedFAQs.filter((faq) => {
    const questionText = (faq.question ?? '').toLowerCase();
    const answerText = (faq.answer ?? '').toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      questionText.includes(query) ||
      answerText.includes(query);
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
        <h2 className="text-blue-900 mb-2">Quick Answers</h2>
        <p className="text-blue-800 text-lg mb-8">
          Find answers to common questions about your volunteer experience
        </p>

        {/* Search Bar */}
        <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-sm mb-6">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-blue-600" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-blue-900 placeholder-blue-400"
              style={{ minHeight: '44px' }}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg transition-colors font-medium ${
              !selectedCategory
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                : 'bg-white text-blue-800 border-2 border-blue-300 hover:bg-blue-50'
            }`}
            style={{ minHeight: '44px' }}
          >
            All
          </button>
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                    : 'bg-white text-blue-800 border-2 border-blue-300 hover:bg-blue-50'
                }`}
                style={{ minHeight: '44px' }}
              >
                <IconComponent className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-8">
          {error && (
            <div className="bg-red-50 rounded-xl p-6 border border-red-200 text-red-700">
              {error}
            </div>
          )}
          {loading && (
            <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm text-blue-700">
              Loading FAQs...
            </div>
          )}
          {!loading && !error && filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 border-2 border-blue-200 shadow-sm"
            >
              <h3 className="text-blue-900 mb-3">{faq.question}</h3>
              <p className="text-blue-800 leading-relaxed">
                {faq.answer || 'Answer pending review.'}
              </p>
            </div>
          ))}
          {!loading && !error && filteredFAQs.length === 0 && (
            <div className="bg-white rounded-xl p-8 border-2 border-blue-200 shadow-sm text-center">
              <p className="text-blue-700">
                No answers found. Try a different search or browse by category.
              </p>
            </div>
          )}
        </div>

        {/* Can't Find Answer Card */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0">
              <PhoneIcon className="w-6 h-6 text-blue-900" />
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-2">Can't find what you need?</h3>
              <p className="text-blue-100 mb-4">
                Help us improve! Suggest a question or scenario that would be helpful to include.
              </p>
              <Link
                to="/volunteer/suggest-scenario"
                className="block w-full px-6 py-3 bg-white text-blue-900 font-medium rounded-lg hover:bg-blue-50 transition-colors text-center"
                style={{ minHeight: '44px' }}
              >
                Suggest a Missing Scenario
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
