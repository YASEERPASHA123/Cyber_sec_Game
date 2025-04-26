import React, { useEffect, useRef } from 'react';
import { useGame } from '../contexts/GameContext';

const TerminalLog: React.FC = () => {
  const { logs } = useGame();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when logs update
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  // Get color based on log type
  const getLogColor = (type: string) => {
    switch (type) {
      case 'info': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'success': return 'text-cyan-400';
      default: return 'text-green-400';
    }
  };

  return (
    <div className="w-full bg-black border-2 border-green-500 rounded-md overflow-hidden shadow-[0_0_10px_rgba(0,255,0,0.3)]">
      <div className="flex items-center bg-green-900 px-3 py-1">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
        <span className="text-green-200 text-xs font-mono">terminal@honeypot:~</span>
      </div>
      
      <div 
        ref={containerRef}
        className="font-mono text-xs p-3 h-32 overflow-y-auto bg-black"
      >
        {logs.map((log, index) => (
          <div key={index} className="mb-1">
            <span className="text-gray-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span>{' '}
            <span className={getLogColor(log.type)}>
              {log.type === 'error' ? '!' : log.type === 'warning' ? '⚠' : log.type === 'success' ? '✓' : '>'} {log.message}
            </span>
          </div>
        ))}
        <div className="flex items-center text-green-400 animate-pulse">
          <span>$ _</span>
        </div>
      </div>
    </div>
  );
};

export default TerminalLog;