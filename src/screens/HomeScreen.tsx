import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { useGameStore } from '../store/gameStore';

export function HomeScreen() {
  const setScreen = useGameStore((s) => s.setScreen);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center gap-8 px-6"
    >
      <div className="text-center">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-5xl sm:text-6xl font-extrabold text-rose"
        >
          Heads Up
        </motion.h1>
        <motion.h2
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-3xl sm:text-4xl font-bold text-teal mt-1"
        >
          In Common
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-subtext mt-4 text-base max-w-xs mx-auto"
        >
          Find the connection between two famous people!
        </motion.p>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button size="lg" onClick={() => setScreen('setup')}>
          Play
        </Button>
      </motion.div>
    </motion.div>
  );
}
