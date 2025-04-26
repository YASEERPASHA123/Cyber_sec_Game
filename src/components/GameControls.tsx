import React from 'react';
import { useGame } from '../contexts/GameContext';

const GameControls: React.FC = () => {
  const { gameState, addLog } = useGame();
  
  // Only show controls during gameplay
  if (gameState !== 'playing') return null;

  const showHelp = () => {
    addLog('Controls: Arrow keys/WASD to move, Space to jump, E to interact', 'info');
    addLog('Find the key and choose a castle carefully!', 'info');
  };

  return (
    <div className="absolute bottom-4 right-4 flex flex-col items-end space-y-2">
      <div className="bg-black bg-opacity-70 text-green-400 p-2 rounded-md border border-green-500 font-mono text-xs">
        <div className="grid grid-cols-3 gap-1 mb-1">
          <div></div>
          <button 
            className="bg-green-900 hover:bg-green-800 rounded p-1 flex items-center justify-center"
            onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'w'}))}
            onMouseUp={() => document.dispatchEvent(new KeyboardEvent('keyup', {'key': 'w'}))}
          >
            W
          </button>
          <div></div>
          <button 
            className="bg-green-900 hover:bg-green-800 rounded p-1 flex items-center justify-center"
            onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'a'}))}
            onMouseUp={() => document.dispatchEvent(new KeyboardEvent('keyup', {'key': 'a'}))}
          >
            A
          </button>
          <button 
            className="bg-green-900 hover:bg-green-800 rounded p-1 flex items-center justify-center"
            onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', {'key': 's'}))}
            onMouseUp={() => document.dispatchEvent(new KeyboardEvent('keyup', {'key': 's'}))}
          >
            S
          </button>
          <button 
            className="bg-green-900 hover:bg-green-800 rounded p-1 flex items-center justify-center"
            onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'd'}))}
            onMouseUp={() => document.dispatchEvent(new KeyboardEvent('keyup', {'key': 'd'}))}
          >
            D
          </button>
        </div>
        <div className="flex justify-between">
          <button 
            className="bg-green-900 hover:bg-green-800 rounded p-1 px-8 flex items-center justify-center"
            onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', {'key': ' '}))}
            onMouseUp={() => document.dispatchEvent(new KeyboardEvent('keyup', {'key': ' '}))}
          >
            JUMP
          </button>
          <button 
            className="bg-green-900 hover:bg-green-800 rounded p-1 px-2 ml-2 flex items-center justify-center"
            onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'e'}))}
          >
            E (Interact)
          </button>
        </div>
      </div>
      <button
        onClick={showHelp}
        className="bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs px-2 py-1 rounded"
      >
        Help
      </button>
    </div>
  );
};

export default GameControls;