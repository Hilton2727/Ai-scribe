
import React from 'react';
import Orb from "./ui/Orb";
import Logo from "./ui/Logo";
import { sendChatMessage } from '../services/api.service';

interface WelcomeScreenProps {
  onSelectPrompt: (prompt: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSelectPrompt }) => {
  const suggestedPrompts = [
    "Create a recipe using ingredients from my kitchen",
    "Give me tips to overcome procrastination",
    "Plan a weekend trip to a nearby city",
    "Help me write a professional email"
  ];

  // Shuffle the prompts for randomness
  function shuffle(array: string[]) {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
  const randomPrompts = shuffle(suggestedPrompts);

  const handlePromptClick = (prompt: string) => {
    onSelectPrompt(prompt);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-12">
        <div className="w-[300px] h-[300px] rounded-full flex items-center justify-center mb-6 mx-auto bg-transparent relative">
          <Orb />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Logo />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Hey Hilton! 👋
        </h1>
        <p className="text-gray-400 text-lg">
          How can I help you today?
        </p>
      </div>

      <div className="w-full max-w-md space-y-3">
        {randomPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handlePromptClick(prompt)}
            className="w-full p-4 bg-gray-900 hover:bg-gray-800 rounded-2xl text-left text-white transition-colors btn-press border border-gray-700"
          >
            <span className="text-sm leading-relaxed">{prompt}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;
