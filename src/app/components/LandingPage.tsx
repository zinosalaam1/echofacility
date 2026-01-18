import { useState } from 'react';
import { motion } from 'motion/react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

interface LandingPageProps {
  onStart: (username: string) => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(220,38,38,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />
      
      <div className="max-w-2xl w-full space-y-8 relative z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-4"
        >
          <motion.div 
            className="text-orange-500 text-xl font-mono"
            animate={{ 
              textShadow: [
                '0 0 10px rgba(249, 115, 22, 0.5)',
                '0 0 20px rgba(249, 115, 22, 0.8)',
                '0 0 10px rgba(249, 115, 22, 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🧩 TOUR ARCADE Presents:
          </motion.div>
          <motion.h1 
            className="text-6xl font-bold tracking-wider"
            animate={{ 
              textShadow: [
                '0 0 20px rgba(255, 255, 255, 0.3)',
                '0 0 30px rgba(255, 255, 255, 0.5)',
                '0 0 20px rgba(255, 255, 255, 0.3)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            THE ECHO FACILITY
          </motion.h1>
          <div className="text-gray-400 text-lg italic max-w-md mx-auto space-y-2">
            <motion.p
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              "The rooms remember what you forget.
            </motion.p>
            <motion.p
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              The answers change when you understand them."
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 space-y-6 relative overflow-hidden"
        >
          {/* Glitch effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent"
            animate={{ x: [-200, 1000] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          
          <div className="space-y-2 relative z-10">
            <motion.h2 
              className="text-2xl font-bold text-red-500"
              animate={{ 
                opacity: [1, 0.8, 1],
                scale: [1, 1.02, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⚠️ WARNING
            </motion.h2>
            <motion.ul 
              className="text-gray-300 space-y-2 text-sm"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {[
                "Has no fixed order",
                "Uses visual, not logical truth",
                "Punishes interpretation",
                "Rewrites past answers",
                "Forces players to unlearn",
                "Breaks rule-based thinking",
                "Requires meta-reasoning"
              ].map((text, index) => (
                <motion.li
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  animate={{ 
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    opacity: { duration: 2, repeat: Infinity, delay: index * 0.2 }
                  }}
                >
                  ❌ {text}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className="border-t border-zinc-800 pt-6 relative z-10">
            <motion.p 
              className="text-center text-yellow-500 mb-4"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              You must clear 6 rooms. But not in order.
            </motion.p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm text-gray-400 mb-2">
                  Enter your name to begin:
                </label>
                <Input
                  id="username"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name..."
                  className="bg-black border-zinc-700 text-white placeholder:text-gray-600"
                  autoFocus
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={!name.trim()}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  ENTER THE FACILITY
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ delay: 0.6, duration: 4, repeat: Infinity }}
          className="text-center text-gray-600 text-sm"
        >
          Most people fail because they overthink, assume consistency, and trust instructions.
          <br />
          Here, nothing stays correct.
        </motion.p>
      </div>
    </motion.div>
  );
}