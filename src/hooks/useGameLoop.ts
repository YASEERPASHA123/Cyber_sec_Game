import { useCallback, useEffect, useRef } from 'react';
import { useGame } from '../contexts/GameContext';
import { GAME_WIDTH, GRAVITY, JUMP_FORCE, MOVEMENT_SPEED, GAME_HEIGHT, INITIAL_CHARACTER } from '../constants/gameObjects';
import { checkCollision, isNearObject, isOnPlatform } from '../utils/collision';

export const useGameLoop = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const {
    gameState,
    character,
    updateCharacter,
    platforms,
    key,
    updateKey,
    castles,
    updateCastle,
    addLog,
    hasKey,
    setHasKey,
    setGameState,
    setCurrentCastle,
    resetGame
  } = useGame();

  const keysPressed = useRef<Set<string>>(new Set());
  const cameraOffsetX = useRef<number>(0);
  const jumpPressed = useRef<boolean>(false);

  // Handle key down events
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    keysPressed.current.add(e.key.toLowerCase());

    // Handle jump key press
    if ((e.key === ' ' || e.key.toLowerCase() === 'w') && !jumpPressed.current) {
      jumpPressed.current = true;
    }

    // Handle 'E' key for interaction
    if (e.key.toLowerCase() === 'e') {
      // Check for interaction with castles if has key
      if (hasKey) {
        for (const castle of castles) {
          if (isNearObject(character, castle) && !castle.isOpen) {
            if (castle.isHoneypot) {
              updateCastle(castle.id, prev => ({ ...prev, isOpen: true }));
              setGameState('success');
              setCurrentCastle(castle);
              addLog(`Entered Castle ${castle.id}. It's a honeypot!`, 'warning');
              addLog('Honeypot interaction recorded for IP: 103.22.11.56', 'error');
            } else {
              setGameState('failure');
              setCurrentCastle(castle);
              addLog(`Attempted to enter Castle ${castle.id}. Access denied!`, 'error');
              addLog('This appears to be the real target. Wrong key used.', 'info');
            }
            break;
          }
        }
      }
    }
  }, [character, castles, hasKey, addLog, updateCastle, setGameState, setCurrentCastle]);

  // Handle key up events
  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keysPressed.current.delete(e.key.toLowerCase());
    if (e.key === ' ' || e.key.toLowerCase() === 'w') {
      jumpPressed.current = false;
    }
  }, []);

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    let animationFrameId: number;
    
    const gameLoop = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Handle movement
      let velocityX = 0;
      if (keysPressed.current.has('arrowleft') || keysPressed.current.has('a')) {
        velocityX = -MOVEMENT_SPEED;
      }
      if (keysPressed.current.has('arrowright') || keysPressed.current.has('d')) {
        velocityX = MOVEMENT_SPEED;
      }
      
      // Update character position
      let newX = character.position.x + velocityX;
      let newY = character.position.y + character.velocityY;
      let newVelocityY = character.velocityY + GRAVITY;
      let isJumping = true;
      
      // Check platform collisions
      for (const platform of platforms) {
        if (platform.visible) {
          if (
            character.velocityY >= 0 && 
            isOnPlatform({ 
              ...character, 
              position: { x: newX, y: newY } 
            }, platform)
          ) {
            newY = platform.position.y - character.size.height;
            newVelocityY = 0;
            isJumping = false;
            break;
          }
        }
      }
      
      // Handle jumping
      if (jumpPressed.current && !isJumping) {
        newVelocityY = JUMP_FORCE;
        isJumping = true;
      }
      
      // Update camera offset based on character position
      const halfCanvas = canvas.width / 2;
      if (newX > halfCanvas) {
        cameraOffsetX.current = newX - halfCanvas;
      }
      
      // Boundary checks
      newX = Math.max(0, Math.min(newX, GAME_WIDTH * 2));
      
      // Check if character fell off the platforms
      if (newY > GAME_HEIGHT + 100) {
        // Reset character to starting position
        updateCharacter(() => ({
          ...INITIAL_CHARACTER,
          position: { ...INITIAL_CHARACTER.position }
        }));
        // Reset camera offset
        cameraOffsetX.current = 0;
        addLog('You fell! Starting from the beginning...', 'warning');
        return;
      }
      
      // Update character state
      updateCharacter(prev => ({
        ...prev,
        position: { x: newX, y: newY },
        velocityY: newVelocityY,
        isJumping,
        direction: velocityX < 0 ? 'left' : velocityX > 0 ? 'right' : prev.direction
      }));
      
      // Check key collection
      if (!key.collected && !hasKey && checkCollision(character, key)) {
        updateKey(prev => ({ ...prev, collected: true }));
        setHasKey(true);
        addLog('Key collected! Choose your castle wisely...', 'success');
      }
      
      animationFrameId = requestAnimationFrame(gameLoop);
    };
    
    animationFrameId = requestAnimationFrame(gameLoop);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState, character, platforms, key, castles, canvasRef, updateCharacter, updateKey, setHasKey, addLog, hasKey]);
  
  return { cameraOffsetX: cameraOffsetX.current };
};