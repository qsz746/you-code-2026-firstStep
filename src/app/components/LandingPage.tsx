import { Globe, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import heroImage from '../../assets/501f8ffa77d7e60b0c26552174bef2b6a134a6ca.png';

export default function LandingPage() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginType, setLoginType] = useState<'coordinator' | 'volunteer' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenLogin = (type: 'coordinator' | 'volunteer') => {
    setLoginType(type);
    setShowLoginModal(true);
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setLoginType(null);
    setEmail('');
    setPassword('');
    setError('');
    setIsLoading(false);
  };

  const handleTestModeSkip = () => {
    // Skip Firebase auth for testing
    if (loginType === 'coordinator') {
      navigate('/coordinator/dashboard');
    } else {
      navigate('/volunteer/dashboard/front-desk');
    }
    handleCloseModal();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      // Redirect based on login type
      if (loginType === 'coordinator') {
        navigate('/coordinator/dashboard');
      } else {
        navigate('/volunteer/dashboard/front-desk');
      }
      
      handleCloseModal();
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Incorrect email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-blue-900 font-semibold text-2xl">First</span>
              <span className="text-blue-500 font-semibold text-2xl">Step</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-neutral-200 rounded-lg px-3 py-2 pr-8 text-neutral-700 hover:border-neutral-300 transition-colors cursor-pointer"
                  aria-label="Select language"
                >
                  <option>English</option>
                  <option>Français</option>
                  <option>中文</option>
                  <option>ਪੰਜਾਬੀ</option>
                  <option>العربية</option>
                  <option>Tagalog</option>
                </select>
                <Globe className="w-4 h-4 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Image */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-8 sm:py-12">
          {/* Hero Card with Image */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-12">
            {/* Hero Image Banner */}
            <div className="relative">
              <img
                src={heroImage}
                alt="Welcome! Illustration showing diverse community members and volunteers with mountains in background"
                className="w-full h-[276px] sm:h-[308px] md:h-[340px] object-cover"
                style={{ objectPosition: 'center top' }}
              />
            </div>

            {/* Text Content Below Image */}
            <div className="px-6 sm:px-12 py-8 text-center bg-gradient-to-b from-blue-50 to-white">
              <p className="text-blue-900 mb-4 max-w-2xl mx-auto">
                Supporting Newcomers, Empowering Communities.
              </p>
              <p className="text-neutral-700 mb-8 max-w-2xl mx-auto">
                This platform is designed to empower the coordinators and staff of nonprofit organizations helping newcomers settle in their new community.
              </p>

              {/* Portal Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleOpenLogin('coordinator')}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-lg font-medium shadow-md hover:shadow-lg"
                >
                  Coordinator Login
                </button>
                <button
                  onClick={() => handleOpenLogin('volunteer')}
                  className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-lg font-medium shadow-md hover:shadow-lg"
                >
                  Volunteer Login
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Content */}
        <section className="pb-12 text-center">
          <p className="text-neutral-600">
            Built for BC's nonprofit sector · Designed for accessibility and ease of use
          </p>
        </section>
      </main>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            {/* Close Button */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-neutral-800 font-semibold">
                {loginType === 'coordinator' ? 'Coordinator Login' : 'Volunteer Login'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-neutral-600 hover:text-neutral-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-neutral-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={loginType === 'coordinator' ? 'coordinator@firststep.ca' : 'volunteer@firststep.ca'}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-800"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-neutral-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-800"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors font-medium shadow-md disabled:cursor-not-allowed"
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>

              {/* Test Mode Skip */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleTestModeSkip}
                  className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors underline"
                >
                  Skip login (Test Mode)
                </button>
              </div>

              {/* Help Text */}
              <p className="text-sm text-neutral-600 text-center mt-4">
                {loginType === 'coordinator' 
                  ? 'Having trouble? Contact your administrator'
                  : 'New volunteer? Ask your coordinator for access'}
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
