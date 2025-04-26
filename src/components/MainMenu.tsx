import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { LockKeyholeIcon, ShieldAlert } from 'lucide-react';

const MainMenu: React.FC = () => {
  const { gameState, setGameState, addLog } = useGame();
  const [typing, setTyping] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const fullText = "Castle Conquest: The Honeypot Hunt";
  
  React.useEffect(() => {
    if (gameState === 'menu' && !typing) {
      setTyping(true);
      let i = 0;
      const interval = setInterval(() => {
        setText(fullText.substring(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(interval);
          setTyping(false);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  const startGame = () => {
    setGameState('playing');
    addLog('Game started. Find the key and choose your castle wisely...', 'info');
  };

  return (
    <>
      {gameState === 'menu' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          <div className="text-center max-w-2xl p-6 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-blue-900/20 rounded-lg" />
            
            <div className="relative">
              <ShieldAlert className="w-16 h-16 text-green-500 mx-auto mb-2" />
              <h1 className="text-4xl font-mono font-bold text-green-400 mb-6">
                {text}
                <span className={`inline-block ${typing ? 'animate-pulse' : 'opacity-0'}`}>_</span>
              </h1>
              
              <div className="border-2 border-green-500 rounded-md p-4 mb-6 bg-black bg-opacity-70">
                <p className="text-green-300 font-mono mb-4">
                  You've been tasked with infiltrating a series of mysterious castles to find a hidden treasure.
                  But beware - most of these castles are actually <span className="text-yellow-400">honeypots</span> designed
                  to trap intruders like you!
                </p>
                <p className="text-green-300 font-mono">
                  Can you identify the real target among the decoys?
                </p>
              </div>
              
              <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-green-500 flex-grow mr-4"></div>
                <LockKeyholeIcon className="w-6 h-6 text-green-500" />
                <div className="h-px bg-green-500 flex-grow ml-4"></div>
              </div>
              
              <div className="flex flex-col items-center">
                <button 
                  onClick={startGame}
                  className="bg-green-600 hover:bg-green-700 text-white font-mono px-6 py-3 rounded-md transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(0,255,0,0.5)]"
                >
                  ENTER THE SYSTEM
                </button>
                
                <div className="text-gray-500 font-mono text-xs mt-8">
                  <p>Controls: Arrow keys/WASD to move, Space to jump, E to interact</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainMenu;