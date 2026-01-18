import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Check, X, Eye, EyeOff } from 'lucide-react';

interface RoomProps {
  onSolved: (roomNumber: number, answer: string) => void;
  solvedRooms: number[];
  answers: { [key: number]: string };
}

export function Room2Silent({ onSolved, solvedRooms }: RoomProps) {
  const [input, setInput] = useState('');
  const [attempt, setAttempt] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const isSolved = solvedRooms.includes(2);

  const correctAnswer = 'ERRIM';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toUpperCase() === correctAnswer) {
      setAttempt(true);
      setTimeout(() => {
        onSolved(2, correctAnswer);
      }, 1000);
    } else {
      setAttempt(false);
      setAttemptCount(attemptCount + 1);
      setTimeout(() => setAttempt(null), 2000);
    }
  };

  // Decoy words that appear and disappear
  const decoyWords = ['RIEMR', 'MIRER', 'RIMER', 'MERIR'];
  const [decoyIndex, setDecoyIndex] = useState(0);

  useState(() => {
    const interval = setInterval(() => {
      setDecoyIndex((prev) => (prev + 1) % decoyWords.length);
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-zinc-900 border-2 border-blue-600 rounded-lg p-8 space-y-6"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.01, 1],
          opacity: [1, 0.95, 1]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-center space-y-2"
      >
        <div className="text-blue-500 text-sm font-mono">🟦 ROOM 2</div>
        <h2 className="text-3xl font-bold">THE SILENT CIPHER</h2>
        <p className="text-gray-400 text-sm">Theme: Missing information</p>
      </motion.div>

      {isSolved ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-12 space-y-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Check className="w-16 h-16 text-green-500 mx-auto" />
          </motion.div>
          <p className="text-2xl font-bold text-green-500">ROOM CLEARED</p>
          <motion.p 
            className="text-gray-400 font-mono text-xl"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {correctAnswer}
          </motion.p>
        </motion.div>
      ) : (
        <>
          <div className="bg-black border border-zinc-800 rounded-lg p-8 space-y-6">
            <div className="text-center space-y-4">
              <p className="text-xl text-gray-300">You see:</p>
              <motion.div 
                className="bg-zinc-800 border-2 border-zinc-700 rounded p-8 relative overflow-hidden"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.2)',
                    '0 0 40px rgba(59, 130, 246, 0.4)',
                    '0 0 20px rgba(59, 130, 246, 0.2)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.p 
                  className="text-5xl font-mono text-white tracking-widest relative z-10"
                  animate={{ opacity: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  _ _ _ _ _
                </motion.p>
                
                {/* Flickering decoy text */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ opacity: [0, 0.15, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <p className="text-3xl font-mono text-blue-400">
                    {decoyWords[decoyIndex]}
                  </p>
                </motion.div>
              </motion.div>
            </div>

            <motion.div 
              className="bg-zinc-900 border-2 border-blue-600/50 rounded p-6 space-y-2"
              animate={{ borderColor: ['rgba(37, 99, 235, 0.5)', 'rgba(37, 99, 235, 0.8)', 'rgba(37, 99, 235, 0.5)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.p 
                className="text-gray-300"
                animate={{ x: [0, 2, 0, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                "The word is five letters.
              </motion.p>
              <p className="text-gray-300">It is not written here.</p>
              <p className="text-gray-300">You already saw it."</p>
            </motion.div>

            {/* Misleading hints */}
            <motion.div 
              className="text-center text-gray-600 text-xs italic"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p>Think backwards... or forwards?</p>
              <p className="mt-1">Letters can be many things.</p>
            </motion.div>
          </div>

          {attemptCount >= 4 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="overflow-hidden"
            >
              <button
                onClick={() => setShowHint(!showHint)}
                className="w-full flex items-center justify-between bg-zinc-800/50 border border-yellow-600/30 rounded p-3 hover:bg-zinc-800 transition-colors"
              >
                <span className="text-sm text-yellow-600/70">
                  {showHint ? <Eye className="w-4 h-4 inline mr-2" /> : <EyeOff className="w-4 h-4 inline mr-2" />}
                  {attemptCount} failed attempts - Hint available
                </span>
                <span className="text-yellow-600/70">{showHint ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 p-3 bg-zinc-800/30 border border-yellow-600/20 rounded"
                  >
                    <p className="text-xs text-gray-500">
                      Room 1 had reversed letters. What did you literally SEE? Not the English word.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="answer" className="block text-sm text-gray-400 mb-2">
                Your Answer:
              </label>
              <Input
                id="answer"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Five letters..."
                className="bg-black border-zinc-700 text-white placeholder:text-gray-600 text-lg"
                disabled={attempt === true}
                maxLength={5}
              />
            </div>
            <Button
              type="submit"
              disabled={!input.trim() || attempt === true}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              SUBMIT ANSWER
            </Button>
          </form>

          <AnimatePresence>
            {attempt === false && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 text-red-500 bg-red-950/50 border border-red-600 rounded p-3"
              >
                <X className="w-5 h-5" />
                <span>Incorrect. What did you literally see?</span>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}