import React, { useRef, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { useGameLoop } from '../hooks/useGameLoop';

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { character, platforms, key, castles, hasKey } = useGame();
  const { cameraOffsetX } = useGameLoop(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply camera offset
    ctx.save();
    ctx.translate(-cameraOffsetX, 0);

    // Draw background (hacker-style grid)
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width + cameraOffsetX * 2, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = '#0F3';
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.2;
    
    for (let x = 0; x < canvas.width + cameraOffsetX * 2; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    for (let y = 0; y < canvas.height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width + cameraOffsetX * 2, y);
      ctx.stroke();
    }
    
    ctx.globalAlpha = 1;

    // Draw platforms
    ctx.fillStyle = '#0F3';
    platforms.forEach(platform => {
      if (platform.visible) {
        ctx.fillRect(
          platform.position.x, 
          platform.position.y, 
          platform.size.width, 
          platform.size.height
        );
      }
    });

    // Draw key with glow effect if not collected
    if (!key.collected && key.visible) {
      // Glow effect
      ctx.shadowColor = '#FF0';
      ctx.shadowBlur = 15;
      
      ctx.fillStyle = '#FF0';
      ctx.beginPath();
      ctx.arc(
        key.position.x + key.size.width / 2,
        key.position.y + key.size.height / 2,
        key.size.width / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
      
      // Draw key shape
      ctx.fillStyle = '#FA0';
      ctx.fillRect(
        key.position.x + key.size.width / 4,
        key.position.y,
        key.size.width / 2,
        key.size.height / 1.5
      );
      
      ctx.fillRect(
        key.position.x + key.size.width / 2 - 2,
        key.position.y + key.size.height / 2,
        4,
        key.size.height / 2
      );
      
      // Reset shadow
      ctx.shadowBlur = 0;
    }

    // Draw castles
    castles.forEach(castle => {
      if (castle.visible) {
        // Castle base
        ctx.fillStyle = castle.isOpen ? '#555' : '#777';
        ctx.fillRect(
          castle.position.x,
          castle.position.y - castle.size.height / 2,
          castle.size.width,
          castle.size.height * 1.5
        );
        
        // Castle door
        ctx.fillStyle = castle.isOpen ? '#000' : '#442';
        ctx.fillRect(
          castle.position.x + castle.size.width / 3,
          castle.position.y + castle.size.height / 2,
          castle.size.width / 3,
          castle.size.height / 2
        );
        
        // Castle top
        ctx.fillStyle = '#888';
        for (let i = 0; i < 3; i++) {
          ctx.fillRect(
            castle.position.x + i * (castle.size.width / 3),
            castle.position.y - castle.size.height / 2 - 10,
            castle.size.width / 3,
            10
          );
        }
        
        // Add a glowing effect if the player has a key
        if (hasKey && !castle.isOpen) {
          ctx.strokeStyle = '#0F6';
          ctx.lineWidth = 2;
          ctx.strokeRect(
            castle.position.x - 5,
            castle.position.y - castle.size.height / 2 - 15,
            castle.size.width + 10,
            castle.size.height * 1.5 + 15
          );
        }
      }
    });

    // Draw character
    if (character.visible) {
      ctx.fillStyle = '#0AF';
      ctx.fillRect(
        character.position.x,
        character.position.y,
        character.size.width,
        character.size.height
      );
      
      // Draw character face
      ctx.fillStyle = '#000';
      if (character.direction === 'right') {
        ctx.fillRect(
          character.position.x + character.size.width - 10,
          character.position.y + 8,
          4,
          4
        );
      } else {
        ctx.fillRect(
          character.position.x + 6,
          character.position.y + 8,
          4,
          4
        );
      }
      
      // Draw hat (like Mario)
      ctx.fillStyle = '#F00';
      ctx.fillRect(
        character.position.x,
        character.position.y,
        character.size.width,
        character.size.height / 4
      );
    }
    
    // Draw key indicator in the UI if collected
    if (hasKey) {
      ctx.resetTransform();
      ctx.fillStyle = '#FF0';
      ctx.font = '16px monospace';
      ctx.fillText('🔑 Key Collected', 10, 30);
    }

    ctx.restore();
  }, [character, platforms, key, castles, hasKey, cameraOffsetX]);

  return (
    <canvas 
      ref={canvasRef} 
      width={800} 
      height={400} 
      className="border-2 border-green-500 bg-black shadow-[0_0_15px_rgba(0,255,0,0.5)]"
    />
  );
};

export default GameCanvas;