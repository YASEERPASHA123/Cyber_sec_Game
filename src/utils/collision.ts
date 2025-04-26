import { GameObject } from '../types/game';

// Check if two game objects are colliding
export const checkCollision = (obj1: GameObject, obj2: GameObject): boolean => {
  return (
    obj1.position.x < obj2.position.x + obj2.size.width &&
    obj1.position.x + obj1.size.width > obj2.position.x &&
    obj1.position.y < obj2.position.y + obj2.size.height &&
    obj1.position.y + obj1.size.height > obj2.position.y
  );
};

// Check if an object is on a platform
export const isOnPlatform = (obj: GameObject, platform: GameObject): boolean => {
  return (
    obj.position.x + obj.size.width > platform.position.x &&
    obj.position.x < platform.position.x + platform.size.width &&
    Math.abs(obj.position.y + obj.size.height - platform.position.y) < 5
  );
};

// Check if an object is near another object (for interaction)
export const isNearObject = (obj1: GameObject, obj2: GameObject, distance: number = 50): boolean => {
  const centerX1 = obj1.position.x + obj1.size.width / 2;
  const centerY1 = obj1.position.y + obj1.size.height / 2;
  const centerX2 = obj2.position.x + obj2.size.width / 2;
  const centerY2 = obj2.position.y + obj2.size.height / 2;
  
  const dx = centerX1 - centerX2;
  const dy = centerY1 - centerY2;
  
  return Math.sqrt(dx * dx + dy * dy) < distance;
};