import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  Character, Castle, GameContextType, GameLog, GameState, Key, Platform
} from '../types/game';
import { INITIAL_CASTLES, INITIAL_CHARACTER, INITIAL_KEY, INITIAL_PLATFORMS } from '../constants/gameObjects';

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [character, setCharacter] = useState<Character>(INITIAL_CHARACTER);
  const [platforms, setPlatforms] = useState<Platform[]>(INITIAL_PLATFORMS);
  const [key, setKey] = useState<Key>(INITIAL_KEY);
  const [castles, setCastles] = useState<Castle[]>(INITIAL_CASTLES);
  const [logs, setLogs] = useState<GameLog[]>([]);
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [currentCastle, setCurrentCastle] = useState<Castle | null>(null);

  const updateCharacter = (updater: (prev: Character) => Character) => {
    setCharacter(updater);
  };

  const updateKey = (updater: (prev: Key) => Key) => {
    setKey(updater);
  };

  const updateCastle = (id: number, updater: (prev: Castle) => Castle) => {
    setCastles(castles.map(castle => 
      castle.id === id ? updater(castle) : castle
    ));
  };

  const addLog = (message: string, type: GameLog['type'] = 'info') => {
    setLogs(prev => [
      { message, timestamp: Date.now(), type },
      ...prev.slice(0, 9) // Keep only the 10 most recent logs
    ]);
  };

  const resetGame = () => {
    setCharacter(INITIAL_CHARACTER);
    setKey(INITIAL_KEY);
    setCastles(INITIAL_CASTLES);
    setHasKey(false);
    setGameState('playing');
    setCurrentCastle(null);
    addLog('Game reset. Starting new session...', 'info');
  };

  // Initialize the game with a welcome log
  useEffect(() => {
    addLog('Castle Conquest: The Honeypot Hunt initialized', 'info');
    addLog('Find the key and choose wisely...', 'info');
  }, []);

  const value: GameContextType = {
    gameState,
    setGameState,
    character,
    updateCharacter,
    platforms,
    key,
    updateKey,
    castles,
    updateCastle,
    logs,
    addLog,
    hasKey,
    setHasKey,
    resetGame,
    currentCastle,
    setCurrentCastle,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};