import React, { useState, useEffect } from 'react';
import { X, Globe, ChevronRight, Mail, Phone, CreditCard, ArrowUp, RotateCcw, User, Bell, Database, Archive, Shield, Palette, Smartphone, Gamepad2, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../services/data.service';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(dataService.getCurrentUser());
  const [improveModel, setImproveModel] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [correctSpelling, setCorrectSpelling] = useState(true);
  const isPWA = dataService.isPWA();

  useEffect(() => {
    const unsubscribe = dataService.onAuthStateChange((authState) => {
      setUser(authState.user);
      if (!authState.isAuthenticated) {
        navigate('/');
      }
    });

    return unsubscribe;
  }, [navigate]);

  const handleClose = () => {
    navigate('/');
  };

  // Settings for users not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div></div>
          <h1 className="text-lg font-semibold">Settings</h1>
          <button 
            onClick={handleClose}
            className="p-2 rounded-full transition-colors bg-gray-800 hover:bg-gray-700 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Data Controls Section */}
          <div className="p-4">
            <h2 className="text-sm font-medium mb-4 text-gray-400 uppercase tracking-wider">
              DATA CONTROLS
            </h2>
            
            <div className="rounded-lg overflow-hidden bg-gray-900">
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-white">
                    Improve the model for everyone
                  </span>
                  <button
                    onClick={() => setImproveModel(!improveModel)}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                      improveModel 
                        ? 'bg-green-500' 
                        : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                        improveModel ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-sm text-gray-400">
                  Allow your content to be used to train our models, which makes Scribe.Ai better for 
                  you and everyone who uses it. We take steps to protect your privacy.{' '}
                  <span className="underline text-gray-300">
                    Learn more
                  </span>
                </p>
              </div>

              <button className="flex items-center justify-between w-full p-4 hover:bg-gray-800 transition-colors">
                <div className="flex items-center">
                  <Globe className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-white">App Language</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm mr-2 text-gray-400">English</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full settings for logged in users (keeping existing logged-in settings)
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div></div>
        <h1 className="text-lg font-semibold">Settings</h1>
        <button 
          onClick={handleClose}
          className="p-2 rounded-full transition-colors bg-gray-800 hover:bg-gray-700 text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Account Section */}
        <div className="p-4">
          <h2 className="text-sm font-medium mb-4 text-gray-400 uppercase tracking-wider">
            ACCOUNT
          </h2>
          
          <div className="rounded-lg overflow-hidden bg-gray-900">
            <div className="flex items-center p-4 border-b border-gray-800">
              <Mail className="w-5 h-5 mr-3 text-gray-400" />
              <div className="flex-1">
                <span className="text-white">Email</span>
                <div className="text-sm text-gray-400">
                  {user.email}
                </div>
              </div>
            </div>

            <div className="flex items-center p-4 border-b border-gray-800">
              <Phone className="w-5 h-5 mr-3 text-gray-400" />
              <div className="flex-1">
                <span className="text-white">Phone number</span>
                <div className="text-sm text-gray-400">
                  +234814886230123
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-white">Subscription</span>
              </div>
              <span className="text-sm text-gray-400">
                Free Plan
              </span>
            </div>

            <button className="flex items-center w-full p-4 border-b border-gray-800 hover:bg-gray-800 transition-colors">
              <ArrowUp className="w-5 h-5 mr-3 text-gray-400" />
              <span className="text-white">Upgrade to Plus</span>
            </button>

            <button className="flex items-center w-full p-4 border-b border-gray-800 hover:bg-gray-800 transition-colors">
              <RotateCcw className="w-5 h-5 mr-3 text-gray-400" />
              <span className="text-white">Restore purchases</span>
            </button>

            <button className="flex items-center justify-between w-full p-4 border-b border-gray-800 hover:bg-gray-800 transition-colors">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-white">Personalization</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button className="flex items-center justify-between w-full p-4 border-b border-gray-800 hover:bg-gray-800 transition-colors">
              <div className="flex items-center">
                <Bell className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-white">Notifications</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button className="flex items-center justify-between w-full p-4 border-b border-gray-800 hover:bg-gray-800 transition-colors">
              <div className="flex items-center">
                <Database className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-white">Data Controls</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button className="flex items-center justify-between w-full p-4 border-b border-gray-800 hover:bg-gray-800 transition-colors">
              <div className="flex items-center">
                <Archive className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-white">Archived Chats</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button className="flex items-center justify-between w-full p-4 transition-colors hover:bg-gray-800">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-white">Security</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* App Section */}
        <div className="p-4">
          <h2 className="text-sm font-medium mb-4 text-gray-400 uppercase tracking-wider">
            APP
          </h2>
          
          <div className="rounded-lg overflow-hidden bg-gray-900">
            <button className="flex items-center justify-between w-full p-4 border-b transition-colors hover:bg-gray-800">
              <div className="flex items-center">
                <Globe className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-white">App Language</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-2 text-gray-400">English</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </button>

            <button className="flex items-center justify-between w-full p-4 border-b transition-colors hover:bg-gray-800">
              <div className="flex items-center">
                <Palette className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-white">Color Scheme</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-2 text-gray-400">System</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </button>

            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center">
                <Smartphone className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-white">Haptic Feedback</span>
              </div>
              <button
                onClick={() => setHapticFeedback(!hapticFeedback)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                  hapticFeedback 
                    ? 'bg-green-500' 
                    : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                    hapticFeedback ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center">
                <Gamepad2 className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-white">Correct Spelling Automatically</span>
              </div>
              <button
                onClick={() => setCorrectSpelling(!correctSpelling)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                  correctSpelling 
                    ? 'bg-green-500' 
                    : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                    correctSpelling ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <button className="flex items-center justify-between w-full p-4 transition-colors hover:bg-gray-800">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-white">Map Provider</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-2 text-gray-400">Apple Maps</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
