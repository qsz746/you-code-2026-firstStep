import { ArrowLeft, Globe, Search, MapPin, Clock, Shield, Phone as PhoneIcon, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function VolunteerFAQ() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'arrival', label: 'Arrival', icon: MapPin },
    { id: 'tasks', label: 'Tasks', icon: Clock },
    { id: 'safety', label: 'Safety', icon: Shield },
    { id: 'hours', label: 'Hours', icon: Clock },
    { id: 'emergency', label: 'Emergency', icon: AlertCircle },
  ];

  const faqs = [
    {
      category: 'arrival',
      question: 'Where is the washroom?',
      answer: 'The washrooms are located down the main hallway, past the reception desk on your left. There are gender-neutral, accessible washrooms available.',
    },
    {
      category: 'arrival',
      question: 'Where do I park?',
      answer: 'Free parking is available in the lot behind the building. Enter from Oak Street. If the lot is full, there is street parking on Main Street (2-hour limit).',
    },
    {
      category: 'arrival',
      question: 'Where do I sign in?',
      answer: 'Sign in at the reception desk when you arrive. Let them know you\'re a volunteer and which program you\'re supporting.',
    },
    {
      category: 'hours',
      question: 'What are today\'s hours?',
      answer: 'The center is open Monday to Friday, 9:00 AM to 6:00 PM. Evening programs run until 8:00 PM on Tuesdays and Thursdays.',
    },
    {
      category: 'hours',
      question: 'What if I\'m running late?',
      answer: 'Call your coordinator as soon as possible. Their number is on your shift confirmation. It helps us plan and let others know.',
    },
    {
      category: 'tasks',
      question: 'What if I don\'t know how to do something?',
      answer: 'Always ask! Find your coordinator or any staff member. There are no silly questions, and we want you to feel confident.',
    },
    {
      category: 'tasks',
      question: 'Can I take breaks during my shift?',
      answer: 'Yes! Take a 15-minute break for shifts over 3 hours. Let someone know you\'re stepping away. The staff room has tea, coffee, and a fridge.',
    },
    {
      category: 'safety',
      question: 'Who do I call if someone is upset?',
      answer: 'Call your coordinator or any staff member immediately. Don\'t try to handle difficult situations alone. Your safety and comfort matter.',
    },
    {
      category: 'safety',
      question: 'What if I feel uncomfortable?',
      answer: 'You can always step away and find staff. We never expect you to stay in an uncomfortable situation. Your wellbeing is our priority.',
    },
    {
      category: 'emergency',
      question: 'What do I do in an emergency?',
      answer: 'For life-threatening emergencies, call 911 first. Then notify staff immediately. For urgent but non-emergency situations, find your coordinator or the on-duty manager.',
    },
    {
      category: 'emergency',
      question: 'Where are the fire exits?',
      answer: 'Fire exits are marked with green signs. The main exits are at the front entrance and the back door near the parking lot. Assembly point is in the parking lot.',
    },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
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
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 border-2 border-blue-200 shadow-sm"
            >
              <h3 className="text-blue-900 mb-3">{faq.question}</h3>
              <p className="text-blue-800 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
          {filteredFAQs.length === 0 && (
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