// Character initial state
export const INITIAL_CHARACTER: Character = {
  position: { x: 50, y: 300 },
  size: { width: 32, height: 32 },
  velocityX: 0,
  velocityY: 0,
  isJumping: false,
  direction: 'right',
  visible: true,
};

// Game world constants
export const GRAVITY = 0.5;
export const JUMP_FORCE = -10;
export const MOVEMENT_SPEED = 3;
export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 400;

// Initial platforms
export const INITIAL_PLATFORMS: Platform[] = [
  { position: { x: 0, y: 350 }, size: { width: 200, height: 50 }, visible: true, type: 'start' },
  { position: { x: 250, y: 350 }, size: { width: 100, height: 50 }, visible: true, type: 'normal' },
  { position: { x: 400, y: 300 }, size: { width: 100, height: 50 }, visible: true, type: 'normal' },
  { position: { x: 550, y: 250 }, size: { width: 100, height: 50 }, visible: true, type: 'normal' },
  { position: { x: 700, y: 350 }, size: { width: 500, height: 50 }, visible: true, type: 'normal' },
];

// Initial key
export const INITIAL_KEY: Key = {
  position: { x: 420, y: 260 },
  size: { width: 24, height: 24 },
  collected: false,
  visible: true,
};

// Initial castles
export const INITIAL_CASTLES: Castle[] = [
  { id: 1, position: { x: 750, y: 290 }, size: { width: 60, height: 60 }, isHoneypot: true, isOpen: false, visible: true },
  { id: 2, position: { x: 850, y: 290 }, size: { width: 60, height: 60 }, isHoneypot: true, isOpen: false, visible: true },
  { id: 3, position: { x: 950, y: 290 }, size: { width: 60, height: 60 }, isHoneypot: false, isOpen: false, visible: true },
  { id: 4, position: { x: 1050, y: 290 }, size: { width: 60, height: 60 }, isHoneypot: true, isOpen: false, visible: true },
  { id: 5, position: { x: 1150, y: 290 }, size: { width: 60, height: 60 }, isHoneypot: true, isOpen: false, visible: true },
];