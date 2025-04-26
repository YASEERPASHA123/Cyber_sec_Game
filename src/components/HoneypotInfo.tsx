import React from 'react';
import { useGame } from '../contexts/GameContext';

const HoneypotInfo: React.FC = () => {
  const { gameState, setGameState, resetGame, addLog, currentCastle } = useGame();
  
  if (gameState !== 'success' && gameState !== 'failure' && gameState !== 'information' && gameState !== 'gameover') {
    return null;
  }

  const handleClose = () => {
    if (gameState === 'information') {
      setGameState('playing');
    } else {
      resetGame();
    }
  };

  const showInfoPanel = () => {
    setGameState('information');
    addLog('Displaying educational information about honeypots', 'info');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-gray-900 border-2 border-green-500 p-6 max-w-xl rounded-md shadow-[0_0_20px_rgba(0,255,0,0.4)]">
        {gameState === 'success' && (
          <>
            <h2 className="text-2xl text-yellow-400 font-mono mb-4">
              {Array.from("🎯 Honeypot Detected!").map((char, i) => (
                <span key={i} className="inline-block animate-pulse" style={{ animationDelay: `${i * 50}ms` }}>
                  {char}
                </span>
              ))}
            </h2>
            <div className="text-green-400 font-mono bg-black p-4 rounded mb-4 border border-green-800">
              <p className="mb-2">Congratulations! You've successfully identified a honeypot system!</p>
              <p>Castle {currentCastle?.id} was a trap designed to catch intruders.</p>
              <p className="mt-2 text-yellow-400">Your security awareness has improved!</p>
            </div>
            <div className="text-red-400 font-mono bg-black p-4 rounded mb-4 border border-red-800">
              <p className="mb-2">ALERT: Honeypot Access Logged</p>
              <p>IP: 103.22.11.56 (simulated)</p>
              <p>Session ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
              <p>Access Time: {new Date().toLocaleString()}</p>
            </div>
            <p className="text-green-300 mb-4">
              In cybersecurity, honeypots are decoy systems designed to look like valuable targets.
              They help detect and analyze unauthorized access attempts while diverting attackers away from real systems.
            </p>
          </>
        )}

        {gameState === 'failure' && (
          <>
            <h2 className="text-2xl text-red-500 font-mono mb-4">
              {Array.from("⛔ Access Denied – Real System Detected").map((char, i) => (
                <span key={i} className="inline-block animate-pulse" style={{ animationDelay: `${i * 50}ms` }}>
                  {char}
                </span>
              ))}
            </h2>
            <div className="text-green-400 font-mono bg-black p-4 rounded mb-4 border border-green-800">
              <p>Castle {currentCastle?.id} is the real target system.</p>
              <p>This represents a legitimate system with proper security measures.</p>
              <p className="mt-2">Your access attempt has been blocked and logged.</p>
            </div>
            <p className="text-green-300 mb-4">
              This demonstrates how real systems are protected by authentication mechanisms,
              while honeypots are designed to be seemingly accessible to study attack patterns.
            </p>
          </>
        )}

        {gameState === 'gameover' && (
          <>
            <h2 className="text-2xl text-red-500 font-mono mb-4">
              {Array.from("☠️ Game Over - You Fell!").map((char, i) => (
                <span key={i} className="inline-block animate-pulse" style={{ animationDelay: `${i * 50}ms` }}>
                  {char}
                </span>
              ))}
            </h2>
            <div className="text-green-400 font-mono bg-black p-4 rounded mb-4 border border-green-800">
              <p>Your character fell into the void.</p>
              <p>Press SPACE or ENTER to try again!</p>
            </div>
          </>
        )}

        {gameState === 'information' && (
          <>
            <h2 className="text-2xl text-blue-400 font-mono mb-4">What is a Honeypot?</h2>
            <div className="text-green-300 space-y-3">
              <p>
                A <span className="text-yellow-300">honeypot</span> is a computer security mechanism that creates a 
                vulnerable-looking decoy to attract and detect attacks. They serve multiple purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Detecting unauthorized access attempts</li>
                <li>Diverting attackers from legitimate targets</li>
                <li>Studying attacker techniques and tools</li>
                <li>Early warning system for new attack vectors</li>
                <li>Collecting data on attacker behavior</li>
              </ul>
              <p className="mt-4">
                In this game, most castles are honeypots - decoy systems that appear legitimate
                but are actually traps designed to detect intruders. Only one castle is the real target,
                protected by proper security measures.
              </p>
            </div>
          </>
        )}

        <div className="flex justify-between mt-6">
          {gameState !== 'information' && gameState !== 'gameover' && (
            <button 
              onClick={showInfoPanel}
              className="bg-blue-600 hover:bg-blue-700 text-white font-mono px-4 py-2 rounded"
            >
              Learn More About Honeypots
            </button>
          )}
          <button 
            onClick={handleClose}
            className="bg-green-600 hover:bg-green-700 text-white font-mono px-4 py-2 rounded ml-auto"
          >
            {gameState === 'information' ? 'Return to Game' : 'Play Again'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HoneypotInfo;