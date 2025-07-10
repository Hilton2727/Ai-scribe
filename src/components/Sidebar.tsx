import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Settings, HelpCircle, Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../services/data.service';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNewChat }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(dataService.isAuthenticated());
  const [user, setUser] = useState(dataService.getCurrentUser());
  const [chatHistory, setChatHistory] = useState(dataService.getChatHistory());
  const [searchQuery, setSearchQuery] = useState('');
  const isPWA = dataService.isPWA();

  useEffect(() => {
    const unsubscribe = dataService.onAuthStateChange((authState) => {
      setIsAuthenticated(authState.isAuthenticated);
      setUser(authState.user);
      setChatHistory(dataService.getChatHistory());
    });

    return unsubscribe;
  }, []);

  const handleAuthAction = () => {
    onClose();
    if (isPWA) {
      navigate('/auth');
    } else {
      navigate('/auth');
    }
  };

  const handleSettingsClick = () => {
    onClose();
    navigate('/settings');
  };

  const filteredChats = chatHistory.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupChatsByDate = (chats: typeof chatHistory) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const groups = {
      today: [] as typeof chats,
      yesterday: [] as typeof chats,
      older: [] as typeof chats
    };

    chats.forEach(chat => {
      const chatDate = new Date(chat.timestamp);
      if (chatDate.toDateString() === today.toDateString()) {
        groups.today.push(chat);
      } else if (chatDate.toDateString() === yesterday.toDateString()) {
        groups.yesterday.push(chat);
      } else {
        groups.older.push(chat);
      }
    });

    return groups;
  };

  const chatGroups = groupChatsByDate(filteredChats);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-black border-r border-gray-800 transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <button 
              onClick={onNewChat}
              className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors btn-press"
            >
              <Plus className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">New chat</span>
            </button>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors btn-press"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {isAuthenticated ? (
            <>
              {/* Search */}
              <div className="p-4 pb-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-gray-600"
                  />
                </div>
              </div>

              {/* Chat History */}
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                {chatGroups.today.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-xs font-medium text-gray-400 mb-2 px-2">Today</h3>
                    {chatGroups.today.map((chat) => (
                      <div
                        key={chat.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                      >
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm truncate">{chat.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {chatGroups.yesterday.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-xs font-medium text-gray-400 mb-2 px-2">Yesterday</h3>
                    {chatGroups.yesterday.map((chat) => (
                      <div
                        key={chat.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                      >
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm truncate">{chat.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {chatGroups.older.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-xs font-medium text-gray-400 mb-2 px-2">Previous 7 Days</h3>
                    {chatGroups.older.map((chat) => (
                      <div
                        key={chat.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                      >
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm truncate">{chat.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {filteredChats.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-400 text-sm">No chat history yet</p>
                  </div>
                )}
              </div>

              {/* User Section */}
              <div className="border-t border-gray-800 p-4">
                <div className="space-y-2">
                  <button
                    onClick={handleSettingsClick}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-left btn-press"
                  >
                    <Settings className="w-5 h-5 text-gray-400" />
                    <span className="text-white">Settings</span>
                  </button>
                  
                  <div className="flex items-center gap-3 p-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.firstName?.[0]?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-gray-400 text-xs truncate">{user?.email}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      dataService.logout();
                      onClose();
                    }}
                    className="w-full bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition-colors btn-press"
                  >
                    Log out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Menu Items for Non-authenticated Users */}
              <div className="p-4 space-y-2">
                <button
                  onClick={onNewChat}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-left btn-press"
                >
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                  <span className="text-white">New chat</span>
                </button>
                <button
                  onClick={handleSettingsClick}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-left btn-press"
                >
                  <Settings className="w-5 h-5 text-gray-400" />
                  <span className="text-white">Settings</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-left btn-press"
                >
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                  <span className="text-white">Help & FAQ</span>
                </button>
              </div>
              
              {/* Sign up/Login Section */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-300 mb-3">
                    Save your chat history, share chats, and personalize your experience.
                  </p>
                  <button 
                    onClick={handleAuthAction}
                    className="w-full bg-white text-black font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors btn-press"
                  >
                    Sign up or log in
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
