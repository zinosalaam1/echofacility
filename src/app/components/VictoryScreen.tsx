import { motion } from 'motion/react';
import { Trophy, CheckCircle } from 'lucide-react';

interface VictoryScreenProps {
  username: string;
}

export function VictoryScreen({ username }: VictoryScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="max-w-2xl w-full space-y-8 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <Trophy className="w-32 h-32 text-yellow-500 mx-auto mb-6" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h1 className="text-6xl font-bold text-green-500">FACILITY CLEARED</h1>
          <p className="text-2xl text-gray-300">
            Congratulations, <span className="text-white font-bold">{username}</span>!
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-zinc-900 border-2 border-green-600 rounded-lg p-8 space-y-6"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-green-500">
              <CheckCircle className="w-5 h-5" />
              <span>You escaped THE ECHO FACILITY</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-green-500">
              <CheckCircle className="w-5 h-5" />
              <span>You understood visual truth over logical truth</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-green-500">
              <CheckCircle className="w-5 h-5" />
              <span>You learned to unlearn</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-green-500">
              <CheckCircle className="w-5 h-5" />
              <span>You mastered meta-reasoning</span>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <p className="text-gray-400 italic text-sm">
              "The rooms remember what you forget.
              <br />
              The answers change when you understand them."
            </p>
          </div>

          <div className="bg-black border border-zinc-800 rounded p-6">
            <p className="text-yellow-500 font-bold mb-2">Final Code</p>
            <p className="text-5xl font-mono text-white">571</p>
            <p className="text-xs text-gray-500 mt-2">
              (5 from inverted Room 5, 7 from inverted Room 4, 1 from inverted Room 3)
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-600 text-sm space-y-2"
        >
          <p>🧩 TOUR ARCADE Presents</p>
          <p className="text-xs">
            Most people fail because they overthink, assume consistency, and trust instructions.
            <br />
            But you didn't. You saw through the deception.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => window.location.reload()}
          className="mt-8 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded text-gray-300 transition-colors"
        >
          Play Again
        </motion.button>
      </div>
    </motion.div>
  );
}
