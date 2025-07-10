
import React from 'react';
import { Menu, Edit, PenTool } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../services/data.service';

interface HeaderProps {
  onMenuClick: () => void;
  onNewChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onNewChat }) => {
  const navigate = useNavigate();
  const isAuthenticated = dataService.isAuthenticated();
  const user = dataService.getCurrentUser();

  const handleAuthClick = () => {
    if (dataService.isPWA()) {
      navigate('/signup');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-black border-b border-gray-800">
      <button 
        onClick={onMenuClick}
        className="p-2 rounded-lg hover:bg-gray-800 transition-colors btn-press"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>
      
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-white flex items-center gap-2">
          <PenTool className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          Scribe.Ai
        </h1>
      </div>
      
      <div className="flex items-center gap-2">
        {!isAuthenticated ? (
          <button 
            onClick={handleAuthClick}
            className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors btn-press text-sm font-medium"
          >
            Sign up
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">
              {user?.firstName || 'User'}
            </span>
            <button 
              onClick={onNewChat}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors btn-press"
            >
              <Edit className="w-6 h-6 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
