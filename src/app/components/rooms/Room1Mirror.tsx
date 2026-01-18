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

export function Room1Mirror({ onSolved, solvedRooms }: RoomProps) {
  const [input, setInput] = useState('');
  const [attempt, setAttempt] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const isSolved = solvedRooms.includes(1);

  const correctAnswer = 'ɘɿɿim';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === correctAnswer) {
      setAttempt(true);
      setTimeout(() => {
        onSolved(1, correctAnswer);
      }, 1000);
    } else {
      setAttempt(false);
      setAttemptCount(attemptCount + 1);
      setTimeout(() => setAttempt(null), 2000);
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-zinc-900 border-2 border-red-600 rounded-lg p-8 space-y-6"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.02, 1],
          rotateY: [0, 5, 0, -5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-center space-y-2"
      >
        <div className="text-red-500 text-sm font-mono">🟥 ROOM 1</div>
        <h2 className="text-3xl font-bold">THE MIRROR PROBLEM</h2>
        <p className="text-gray-400 text-sm">Theme: Self-inversion</p>
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
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm text-gray-500 italic"
          >
            The system has stored this answer for later...
          </motion.p>
        </motion.div>
      ) : (
        <>
          <div className="bg-black border border-zinc-800 rounded-lg p-8 space-y-6">
            <motion.div 
              className="text-center space-y-4"
              animate={{ opacity: [1, 0.95, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p className="text-xl text-gray-300">On the wall:</p>
              <motion.div 
                className="bg-zinc-800 border-2 border-zinc-700 rounded p-6"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-2xl font-mono text-white">ENTER WHAT YOU SEE</p>
              </motion.div>
              <p className="text-xl text-gray-300 pt-4">Below it:</p>
              <motion.div 
                className="bg-zinc-800 border-2 border-zinc-700 rounded p-8 relative overflow-hidden"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(220, 38, 38, 0.3)',
                    '0 0 40px rgba(220, 38, 38, 0.5)',
                    '0 0 20px rgba(220, 38, 38, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.p 
                  className="text-5xl font-mono text-white relative z-10"
                  animate={{ 
                    textShadow: [
                      '0 0 10px rgba(255, 255, 255, 0.5)',
                      '0 0 20px rgba(255, 255, 255, 0.8)',
                      '0 0 10px rgba(255, 255, 255, 0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ɘɿɿim
                </motion.p>
                {/* Distraction animations */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10"
                  animate={{ x: [-200, 400] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </motion.div>
            
            {/* Misleading text */}
            <motion.div 
              className="text-center text-gray-600 text-sm italic"
              animate={{ opacity: [0.5, 0.3, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p>Sometimes the obvious answer is the right one...</p>
              <p className="mt-1">Or is it?</p>
            </motion.div>
          </div>

          {attemptCount >= 3 && (
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
                  {attemptCount} attempts - Click for hint
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
                      The instruction says "what you see" - not what it means or says when reversed.
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
                placeholder="..."
                className="bg-black border-zinc-700 text-white placeholder:text-gray-600 text-lg"
                disabled={attempt === true}
              />
            </div>
            <Button
              type="submit"
              disabled={!input.trim() || attempt === true}
              className="w-full bg-red-600 hover:bg-red-700"
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
                <span>Wrong. Look closer.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}