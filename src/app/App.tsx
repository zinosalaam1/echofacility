import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LandingPage } from '@/app/components/LandingPage';
import { GameContainer } from '@/app/components/GameContainer';
import { Analytics } from "@vercel/analytics/next"

export default function App() {
  const [username, setUsername] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = (name: string) => {
    setUsername(name);
    setGameStarted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatePresence mode="wait">
        {!gameStarted ? (
          <LandingPage key="landing" onStart={handleStartGame} />
        ) : (
          <GameContainer key="game" username={username} />
        )}
      </AnimatePresence>
    </div>
  );
}
