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

export function Room6Final({ onSolved, solvedRooms, answers }: RoomProps) {
  const [input, setInput] = useState('');
  const [attempt, setAttempt] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const isSolved = solvedRooms.includes(6);

  const correctAnswer = '571';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === correctAnswer) {
      setAttempt(true);
      setTimeout(() => {
        onSolved(6, correctAnswer);
      }, 1000);
    } else {
      setAttempt(false);
      setAttemptCount(attemptCount + 1);
      setTimeout(() => setAttempt(null), 2000);
    }
  };

  const previousAnswers = [
    { room: 1, answer: answers[1] || '—' },
    { room: 2, answer: answers[2] || '—' },
    { room: 3, answer: answers[3] || '—' },
    { room: 4, answer: answers[4] || '—' },
    { room: 5, answer: answers[5] || '—' },
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-zinc-900 border-2 border-red-600 rounded-lg p-8 space-y-6"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.02, 1],
          rotateZ: [0, 1, 0, -1, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-center space-y-2"
      >
        <div className="text-red-500 text-sm font-mono">🟥 ROOM 6</div>
        <h2 className="text-3xl font-bold">THE FINAL DECEPTION</h2>
        <p className="text-gray-400 text-sm">Theme: Answer transformation</p>
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
          <p className="text-2xl font-bold text-green-500">FACILITY CLEARED!</p>
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
            className="text-sm text-yellow-500 italic mt-4"
          >
            You understood that nothing stays correct...
          </motion.p>
        </motion.div>
      ) : (
        <>
          <div className="bg-black border border-zinc-800 rounded-lg p-8 space-y-6">
            <motion.div 
              className="bg-zinc-900 border-2 border-red-600/50 rounded p-6"
              animate={{
                borderColor: ['rgba(220, 38, 38, 0.5)', 'rgba(220, 38, 38, 0.9)', 'rgba(220, 38, 38, 0.5)'],
                boxShadow: [
                  '0 0 20px rgba(220, 38, 38, 0.3)',
                  '0 0 40px rgba(220, 38, 38, 0.5)',
                  '0 0 20px rgba(220, 38, 38, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.p 
                className="text-gray-300 text-center text-xl"
                animate={{ 
                  scale: [1, 1.02, 1],
                  opacity: [0.9, 1, 0.9]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                "Your answers were correct.
                <br />
                Now make them wrong."
              </motion.p>
            </motion.div>

            <div className="space-y-2">
              <p className="text-sm text-gray-400 text-center mb-4">Your previous answers:</p>
              {previousAnswers.map((item, index) => (
                <motion.div
                  key={item.room}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-zinc-800 border border-zinc-700 rounded p-3 flex justify-between items-center relative overflow-hidden"
                >
                  <span className="text-gray-400">Room {item.room}:</span>
                  <motion.span 
                    className="font-mono text-white font-bold relative z-10"
                    animate={{ 
                      textShadow: [
                        '0 0 5px rgba(255, 255, 255, 0.3)',
                        '0 0 10px rgba(255, 255, 255, 0.5)',
                        '0 0 5px rgba(255, 255, 255, 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {item.answer}
                  </motion.span>
                  {/* Glitch effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent"
                    animate={{ x: [-100, 400] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="bg-zinc-900 border-2 border-red-600/50 rounded p-6"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.p 
                className="text-gray-300 text-center"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                "Use only what can be read as numbers."
              </motion.p>
            </motion.div>

            {/* Misleading suggestions */}
            <motion.div
              className="text-center text-gray-600 text-xs space-y-1"
              animate={{ opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p>Try combining all answers?</p>
              <p>Sum of solved rooms: {solvedRooms.filter(r => r !== 6).reduce((a, b) => a + b, 0)}</p>
              <p>Reverse alphabetical order?</p>
            </motion.div>
          </div>

          {attemptCount >= 6 && (
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
                  {attemptCount} failed attempts - Final hint
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
                      "Make wrong" = invert the logic. Room 3: 0→1, Room 4: 8→7, Room 5: 4→5. Extract numbers. Order matters.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="answer" className="block text-sm text-gray-400 mb-2">
                Final Code:
              </label>
              <Input
                id="answer"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="..."
                className="bg-black border-zinc-700 text-white placeholder:text-gray-600 text-lg font-mono"
                disabled={attempt === true}
              />
            </div>
            <Button
              type="submit"
              disabled={!input.trim() || attempt === true}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              SUBMIT FINAL CODE
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
                <span>Wrong. Think about inversions and what qualifies as a number.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}