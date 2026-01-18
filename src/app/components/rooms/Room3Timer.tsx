import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Check, X, Eye, EyeOff } from 'lucide-react';

interface RoomProps {
  onSolved: (roomNumber: number, answer: string) => void;
  solvedRooms: number[];
  answers: { [key: number]: string };
}

export function Room3Timer({ onSolved, solvedRooms }: RoomProps) {
  const [input, setInput] = useState('');
  const [attempt, setAttempt] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(45);
  const [currentNumber, setCurrentNumber] = useState(34);
  const [timerComplete, setTimerComplete] = useState(false);
  const [started, setStarted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const isSolved = solvedRooms.includes(3);
  const correctAnswer = '0';

  const numbers = [34, 12, 47, 34, 89, 34, 12, 34, 56, 34, 90, 34, 21, 34, 78, 34];
  const distractionNumbers = [88, 77, 99, 11, 22, 33, 44, 55, 66];

  useEffect(() => {
    if (!started || isSolved || timerComplete) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimerComplete(true);
          setCurrentNumber(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [started, isSolved, timerComplete]);

  useEffect(() => {
    if (!started || isSolved || timerComplete) return;

    const interval = setInterval(() => {
      // Randomly show distraction numbers occasionally
      if (Math.random() < 0.15) {
        const randomDistraction = distractionNumbers[Math.floor(Math.random() * distractionNumbers.length)];
        setCurrentNumber(randomDistraction);
      } else {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        setCurrentNumber(numbers[randomIndex]);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [started, isSolved, timerComplete]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === correctAnswer) {
      setAttempt(true);
      setTimeout(() => {
        onSolved(3, correctAnswer);
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
      className="bg-zinc-900 border-2 border-green-600 rounded-lg p-8 space-y-6"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.02, 1],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-center space-y-2"
      >
        <div className="text-green-500 text-sm font-mono">🟩 ROOM 3</div>
        <h2 className="text-3xl font-bold">THE FALSE TIMER</h2>
        <p className="text-gray-400 text-sm">Theme: Time lies</p>
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
            <motion.div 
              className="bg-zinc-900 border-2 border-green-600/50 rounded p-6"
              animate={{ 
                borderColor: ['rgba(22, 163, 74, 0.5)', 'rgba(22, 163, 74, 0.9)', 'rgba(22, 163, 74, 0.5)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-gray-300 text-center">
                "When the timer reaches zero, enter the number you saw the most."
              </p>
            </motion.div>

            {!started ? (
              <div className="text-center py-8 space-y-4">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      '0 0 20px rgba(34, 197, 94, 0.3)',
                      '0 0 40px rgba(34, 197, 94, 0.6)',
                      '0 0 20px rgba(34, 197, 94, 0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Button
                    onClick={() => setStarted(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-xl"
                  >
                    START TIMER
                  </Button>
                </motion.div>
                <p className="text-gray-600 text-sm italic">Click to begin the countdown...</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">Time Remaining</div>
                  <motion.div 
                    className="text-6xl font-mono font-bold"
                    animate={{ 
                      color: timeLeft < 10 ? ['#ffffff', '#ef4444', '#ffffff'] : '#ffffff',
                      scale: timeLeft < 10 ? [1, 1.1, 1] : 1
                    }}
                    transition={{ duration: 0.5, repeat: timeLeft < 10 ? Infinity : 0 }}
                  >
                    {timeLeft.toString().padStart(2, '0')}
                  </motion.div>
                </div>

                <motion.div 
                  className="bg-zinc-800 border-2 border-zinc-700 rounded p-8 relative overflow-hidden"
                  animate={{
                    boxShadow: [
                      '0 0 30px rgba(34, 197, 94, 0.3)',
                      '0 0 50px rgba(34, 197, 94, 0.5)',
                      '0 0 30px rgba(34, 197, 94, 0.3)'
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-2">Current Number</div>
                    <motion.div
                      key={currentNumber}
                      initial={{ scale: 1.3, opacity: 0, rotateX: 90 }}
                      animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                      className="text-8xl font-mono font-bold text-green-400"
                    >
                      {currentNumber}
                    </motion.div>
                  </div>
                  {/* Glitch effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                </motion.div>

                {/* Fake counter to confuse */}
                <motion.div
                  className="text-center text-gray-600 text-xs"
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p>Numbers shown: {Math.floor(timeLeft * 6)}</p>
                  <p className="mt-1">Most common: 34</p>
                </motion.div>

                {timerComplete && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-950/50 border border-red-600 rounded p-4 text-center"
                  >
                    <p className="text-red-500 font-bold text-xl">TIME'S UP!</p>
                    <p className="text-gray-400 text-sm mt-2">
                      What number did you see the most?
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {attemptCount >= 3 && timerComplete && (
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
                  {attemptCount} wrong - Need help?
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
                      Read carefully: "WHEN the timer reaches zero" - what number do you see at that exact moment?
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {timerComplete && (
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
                className="w-full bg-green-600 hover:bg-green-700"
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
                <span>Wrong. Read the instruction again.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}