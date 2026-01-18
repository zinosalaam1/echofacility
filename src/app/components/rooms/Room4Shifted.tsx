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

export function Room4Shifted({ onSolved, solvedRooms }: RoomProps) {
  const [input, setInput] = useState('');
  const [attempt, setAttempt] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const isSolved = solvedRooms.includes(4);

  const correctAnswer = '8';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === correctAnswer) {
      setAttempt(true);
      setTimeout(() => {
        onSolved(4, correctAnswer);
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
      className="bg-zinc-900 border-2 border-yellow-600 rounded-lg p-8 space-y-6"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.01, 1],
          rotate: [0, 1, 0, -1, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-center space-y-2"
      >
        <div className="text-yellow-500 text-sm font-mono">🟨 ROOM 4</div>
        <h2 className="text-3xl font-bold">THE SHIFTED RULE</h2>
        <p className="text-gray-400 text-sm">Theme: Rule reversal</p>
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
              <motion.p 
                className="text-xl text-gray-300"
                animate={{ opacity: [1, 0.9, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                You see:
              </motion.p>
              <motion.div 
                className="bg-zinc-800 border-2 border-zinc-700 rounded p-8 space-y-4 relative overflow-hidden"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(234, 179, 8, 0.2)',
                    '0 0 40px rgba(234, 179, 8, 0.4)',
                    '0 0 20px rgba(234, 179, 8, 0.2)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div 
                  className="text-3xl font-mono text-white"
                  animate={{ x: [0, 2, 0, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <motion.p
                    animate={{ 
                      color: ['#ffffff', '#fbbf24', '#ffffff']
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                  >
                    2 + 2 = 5
                  </motion.p>
                  <motion.p 
                    className="mt-2"
                    animate={{ 
                      color: ['#ffffff', '#fbbf24', '#ffffff']
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    3 + 3 = 7
                  </motion.p>
                  <motion.p 
                    className="mt-2"
                    animate={{ 
                      color: ['#ffffff', '#fbbf24', '#ffffff'],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                  >
                    4 + 4 = ?
                  </motion.p>
                </motion.div>
                
                {/* Glitch overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent"
                  animate={{ x: [-100, 500] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>

            <motion.div 
              className="bg-zinc-900 border-2 border-yellow-600/50 rounded p-6 space-y-2"
              animate={{ 
                borderColor: ['rgba(234, 179, 8, 0.5)', 'rgba(234, 179, 8, 0.9)', 'rgba(234, 179, 8, 0.5)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.p 
                className="text-gray-300 text-center italic"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                "The rule is wrong.
                <br />
                So is the explanation."
              </motion.p>
            </motion.div>

            {/* Confusing fake patterns */}
            <motion.div 
              className="text-center text-gray-600 text-xs space-y-1"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p>Pattern detected: +1 to each result</p>
              <p>Or is it: n + n + 1 = ?</p>
              <p>Maybe: double and add 1?</p>
            </motion.div>
          </div>

          {attemptCount >= 5 && (
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
                      If the rule shown is WRONG, what would be RIGHT? Don't follow the pattern - correct it.
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
                placeholder="4 + 4 = ?"
                className="bg-black border-zinc-700 text-white placeholder:text-gray-600 text-lg"
                disabled={attempt === true}
              />
            </div>
            <Button
              type="submit"
              disabled={!input.trim() || attempt === true}
              className="w-full bg-yellow-600 hover:bg-yellow-700"
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
                <span>Wrong. What does "the rule is wrong" mean?</span>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}