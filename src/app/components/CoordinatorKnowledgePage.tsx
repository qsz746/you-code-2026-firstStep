import CoordinatorNavigation from './CoordinatorNavigation';
import { FileText, Phone } from 'lucide-react';

export default function CoordinatorKnowledgePage() {
  const knowledgeBaseUpdates = [
    { title: 'How to handle emergency food bank requests', type: 'New FAQ', date: '2026-04-03' },
    { title: 'Updated WorkBC referral process', type: 'Updated Process', date: '2026-04-02' },
    { title: 'Common intake form questions', type: 'Most Searched', searches: 24 }
  ];

  const supportContacts = [
    { label: 'Program Manager', contact: 'ext. 301', available: true },
    { label: 'Interpreter Services', contact: '604-555-0123', available: true },
    { label: 'IT Support', contact: 'ext. 405', available: true },
    { label: 'Emergency Protocol', contact: 'View Guide', available: true }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <CoordinatorNavigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Knowledge Base Updates */}
          <section className="lg:col-span-2">
            <h2 className="text-neutral-800 mb-4">Knowledge Base Updates</h2>
            <div className="bg-white rounded-xl border border-neutral-200 divide-y divide-neutral-200 shadow-md">
              {knowledgeBaseUpdates.map((item, index) => (
                <div key={index} className="p-5 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-neutral-800 mb-1">{item.title}</h4>
                      <div className="text-neutral-600">
                        {item.type} {item.date && `• ${item.date}`}
                        {item.searches && ` • ${item.searches} searches this week`}
                      </div>
                    </div>
                    <button className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      View
                    </button>
                  </div>
                </div>
              ))}
              <div className="p-5 bg-neutral-50">
                <div className="text-neutral-800 mb-2">Suggested areas needing content:</div>
                <ul className="text-neutral-600 space-y-1 ml-4">
                  <li>• Immigration document checklist</li>
                  <li>• Evening program procedures</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Support and Escalation */}
          <section>
            <h2 className="text-neutral-800 mb-4">Support & Contacts</h2>
            <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-md">
              <div className="space-y-4">
                {supportContacts.map((contact, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-neutral-800">{contact.label}</div>
                      <div className="text-neutral-600 mt-1">{contact.contact}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-200">
                <button className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors">
                  View Emergency Protocol
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
