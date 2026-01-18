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

export function Room5Memory({ onSolved, solvedRooms }: RoomProps) {
  const [input, setInput] = useState('');
  const [attempt, setAttempt] = useState<boolean | null>(null);
  const [showWords, setShowWords] = useState(true);
  const [started, setStarted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const isSolved = solvedRooms.includes(5);

  const correctAnswer = '4';
  const words = ['ALPHA', 'BRAVO', 'CHARLIE', 'DELTA', 'ECHO'];

  const handleStart = () => {
    setStarted(true);
    setTimeout(() => {
      setShowWords(false);
    }, 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === correctAnswer) {
      setAttempt(true);
      setTimeout(() => {
        onSolved(5, correctAnswer);
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
      className="bg-zinc-900 border-2 border-orange-600 rounded-lg p-8 space-y-6"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.01, 1],
          opacity: [1, 0.97, 1]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-center space-y-2"
      >
        <div className="text-orange-500 text-sm font-mono">🟧 ROOM 5</div>
        <h2 className="text-3xl font-bold">THE MEMORY ERASER</h2>
        <p className="text-gray-400 text-sm">Theme: Forced forgetting</p>
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
            {!started ? (
              <div className="text-center py-8">
                <motion.p 
                  className="text-gray-300 mb-6"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Words will appear briefly. Remember them.
                </motion.p>
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 0 20px rgba(249, 115, 22, 0.3)',
                      '0 0 40px rgba(249, 115, 22, 0.5)',
                      '0 0 20px rgba(249, 115, 22, 0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Button
                    onClick={handleStart}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-xl"
                  >
                    START
                  </Button>
                </motion.div>
              </div>
            ) : (
              <>
                {showWords ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-zinc-800 border-2 border-zinc-700 rounded p-8 relative overflow-hidden"
                  >
                    <div className="text-center space-y-4">
                      {words.map((word, index) => (
                        <motion.div
                          key={word}
                          initial={{ opacity: 0, y: 20, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: index * 0.15 }}
                          className="text-3xl font-mono text-white relative"
                        >
                          <motion.span
                            animate={{ 
                              textShadow: [
                                '0 0 10px rgba(249, 115, 22, 0.5)',
                                '0 0 20px rgba(249, 115, 22, 0.8)',
                                '0 0 10px rgba(249, 115, 22, 0.5)'
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                          >
                            {word}
                          </motion.span>
                        </motion.div>
                      ))}
                    </div>
                    {/* Distraction effects */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-orange-500/10 to-orange-500/5"
                      animate={{ x: [-200, 200] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <motion.div 
                      className="bg-zinc-800 border-2 border-zinc-700 rounded p-8 text-center"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <p className="text-2xl text-gray-400">[Words disappeared]</p>
                    </motion.div>

                    <motion.div 
                      className="bg-zinc-900 border-2 border-orange-600/50 rounded p-6 space-y-2"
                      animate={{ 
                        borderColor: ['rgba(249, 115, 22, 0.5)', 'rgba(249, 115, 22, 0.9)', 'rgba(249, 115, 22, 0.5)']
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.p 
                        className="text-gray-300"
                        animate={{ x: [0, 1, 0, -1, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        "Remove what was never said.
                      </motion.p>
                      <p className="text-gray-300">Enter what remains."</p>
                    </motion.div>

                    <motion.div 
                      className="bg-zinc-900 border-2 border-orange-600/50 rounded p-6"
                      animate={{ 
                        boxShadow: [
                          '0 0 10px rgba(249, 115, 22, 0.3)',
                          '0 0 20px rgba(249, 115, 22, 0.5)',
                          '0 0 10px rgba(249, 115, 22, 0.3)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <p className="text-gray-300 text-center">"Enter the count."</p>
                    </motion.div>

                    {/* Confusing fake text */}
                    <motion.div
                      className="text-center text-gray-600 text-xs space-y-1"
                      animate={{ opacity: [0.2, 0.35, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <p>Total words shown: 5</p>
                      <p>Letters in longest word: 7</p>
                      <p>Words starting with vowels: 2</p>
                    </motion.div>
                  </motion.div>
                )}
              </>
            )}
          </div>

          {attemptCount >= 4 && !showWords && started && (
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
                  Struggling? ({attemptCount} tries)
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
                      Words were SHOWN, not SAID. Which word wasn't spoken aloud? Remove it, count what's left.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {!showWords && started && (
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
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                SUBMIT ANSWER
              </Button>
            </form>
          )}

          <AnimatePresence>
            {attempt === false && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 text-red-500 bg-red-950/50 border border-red-600 rounded p-3"
              >
                <X className="w-5 h-5" />
                <span>Wrong. What was never said?</span>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}