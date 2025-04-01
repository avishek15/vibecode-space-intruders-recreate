import React, { useState } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { SplashScreen } from './components/SplashScreen';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {!gameStarted ? (
        <SplashScreen onStart={() => setGameStarted(true)} />
      ) : gameWon ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4">You Won!</h1>
          <button 
            onClick={() => {
              setGameStarted(false);
              setGameWon(false);
            }}
            className="px-6 py-2 bg-blue-500 rounded hover:bg-blue-600 transition"
          >
            Play Again
          </button>
        </div>
      ) : (
        <GameCanvas onWin={() => setGameWon(true)} />
      )}
    </div>
  );
}

export default App;
