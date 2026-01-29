import { motion, AnimatePresence } from 'motion/react';

interface ScoreDisplayProps {
  score: number;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-subtext text-sm font-medium">Score</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={score}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="text-accent font-bold text-2xl tabular-nums"
        >
          {score}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
