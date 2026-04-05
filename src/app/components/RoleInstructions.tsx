import { ArrowLeft, Globe, CheckCircle, AlertTriangle, Phone } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function RoleInstructions() {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();

  const roleContent: Record<string, any> = {
    'front-desk': {
      title: 'Front Desk / Welcome Support',
      responsibilities: [
        'Greet all visitors warmly and make them feel welcome',
        'Help people sign in and direct them to the right area',
        'Answer basic questions about programs and services',
        'Keep the reception area tidy and welcoming',
        'Notify staff when appointments arrive',
        'Help with intake forms if clients need support',
      ],
      confidentiality: [
        'Never share what you hear about clients with anyone outside the organization',
        'Don\'t discuss client situations in public areas',
        'If you see documents with personal information, keep them private',
        'Lock filing cabinets and log out of computers when you leave',
      ],
      whenToCallStaff: [
        'Someone seems upset, angry, or in distress',
        'A client has an urgent need (housing, food, safety)',
        'You don\'t know how to answer a question',
        'Someone asks for a service you\'re not sure we provide',
        'You feel uncomfortable or unsafe',
      ],
    },
    'language-support': {
      title: 'Language & Navigation Support',
      responsibilities: [
        'Help explain forms and documents in plain language',
        'Support clients during appointments if they need help understanding',
        'Translate or interpret when asked by staff (if trained)',
        'Help clients navigate services and understand next steps',
        'Be patient and check understanding frequently',
        'Note any language needs for future appointments',
      ],
      confidentiality: [
        'Everything you interpret is strictly confidential',
        'Never share translation work with friends or family',
        'If you know the client personally, let staff know',
        'Don\'t discuss cases outside of your volunteer role',
      ],
      whenToCallStaff: [
        'The conversation becomes emotional or complex',
        'You\'re not sure how to translate specialized terms',
        'A client discloses abuse, harm, or danger',
        'You feel the situation needs a professional interpreter',
        'You\'re uncomfortable with the content being discussed',
      ],
    },
    'program-support': {
      title: 'Program Support',
      responsibilities: [
        'Help set up workshop or program spaces',
        'Take attendance and help with name tags',
        'Assist with food or supply distribution',
        'Support program activities and keep things running smoothly',
        'Help with cleanup and resetting spaces',
        'Make participants feel welcome and included',
      ],
      confidentiality: [
        'Don\'t share who attends programs or workshops',
        'Keep conversations you overhear private',
        'Don\'t take photos of participants without permission',
        'Respect that some people don\'t want to be named publicly',
      ],
      whenToCallStaff: [
        'Someone appears unwell or injured',
        'There\'s a conflict between participants',
        'You run out of supplies or food',
        'Someone has a question you can\'t answer',
        'The group size is larger than expected',
      ],
    },
  };

  const content = roleContent[role || 'front-desk'] || roleContent['front-desk'];

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
        <h2 className="text-blue-900 mb-8">{content.title}</h2>

        {/* Responsibilities Section */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-blue-900" />
            </div>
            <h3 className="text-white">Your Responsibilities</h3>
          </div>
          <ul className="space-y-3">
            {content.responsibilities.map((item: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-blue-100 mt-1">•</span>
                <span className="text-white flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Confidentiality Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-white mb-1">Confidentiality Reminder</h3>
              <p className="text-blue-100 text-sm">
                This is essential to building trust with the people we serve
              </p>
            </div>
          </div>
          <ul className="space-y-3">
            {content.confidentiality.map((item: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-blue-100 mt-1">•</span>
                <span className="text-white flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* When to Call Staff Section */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl p-6 shadow-lg mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-white mb-1">When to Call Staff</h3>
              <p className="text-blue-100 text-sm">
                You're never alone — call for help anytime you need it
              </p>
            </div>
          </div>
          <ul className="space-y-3">
            {content.whenToCallStaff.map((item: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-blue-100 mt-1">•</span>
                <span className="text-white flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Emergency Contact */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white mb-1">Emergency Contact</h3>
              <p className="text-red-100">
                For urgent situations, call your coordinator immediately
              </p>
            </div>
            <button
              className="px-6 py-3 bg-white text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
              style={{ minHeight: '44px' }}
            >
              Call Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
