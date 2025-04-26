export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface GameObject {
  position: Position;
  size: Size;
  visible: boolean;
}

export interface Character extends GameObject {
  velocityX: number;
  velocityY: number;
  isJumping: boolean;
  direction: 'left' | 'right';
}

export interface Platform extends GameObject {
  type: 'normal' | 'start';
}

export interface Key extends GameObject {
  collected: boolean;
}

export interface Castle extends GameObject {
  id: number;
  isHoneypot: boolean;
  isOpen: boolean;
}

export type GameState = 'menu' | 'playing' | 'success' | 'failure' | 'information' | 'gameover';

export interface GameLog {
  message: string;
  timestamp: number;
  type: 'info' | 'warning' | 'error' | 'success';
}

export interface GameContextType {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  character: Character;
  updateCharacter: (updater: (prev: Character) => Character) => void;
  platforms: Platform[];
  key: Key;
  updateKey: (updater: (prev: Key) => Character) => void;
  castles: Castle[];
  updateCastle: (id: number, updater: (prev: Castle) => Castle) => void;
  logs: GameLog[];
  addLog: (message: string, type: GameLog['type']) => void;
  hasKey: boolean;
  setHasKey: (hasKey: boolean) => void;
  resetGame: () => void;
  currentCastle: Castle | null;
  setCurrentCastle: (castle: Castle | null) => void;
}