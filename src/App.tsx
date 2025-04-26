import React from 'react';
import { GameProvider } from './contexts/GameContext';
import GameCanvas from './components/GameCanvas';
import TerminalLog from './components/TerminalLog';
import MainMenu from './components/MainMenu';
import HoneypotInfo from './components/HoneypotInfo';
import GameControls from './components/GameControls';

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
        <header className="mb-4 w-full max-w-4xl">
          <h1 className="text-2xl text-green-400 font-mono text-center">
            Castle Conquest: The Honeypot Hunt
          </h1>
          <p className="text-green-300 font-mono text-center text-sm">
            Find the key, choose wisely, avoid the honeypots!
          </p>
        </header>
        
        <main className="relative w-full max-w-4xl">
          <GameCanvas />
          <GameControls />
          <div className="mt-4">
            <TerminalLog />
          </div>
        </main>
        
        <footer className="mt-4 text-gray-500 font-mono text-xs text-center w-full max-w-4xl">
          <p>A cybersecurity educational game about honeypots and deception technology</p>
        </footer>
        
        <MainMenu />
        <HoneypotInfo />
      </div>
    </GameProvider>
  );
}

export default App;