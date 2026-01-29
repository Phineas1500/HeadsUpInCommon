import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { useGameStore } from '../store/gameStore';

export function ResultsScreen() {
  const round = useGameStore((s) => s.round);
  const setScreen = useGameStore((s) => s.setScreen);

  if (!round) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center overflow-hidden"
    >
      {/* Score header */}
      <div className="text-center pt-8 pb-4 px-6 shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-6xl font-extrabold text-accent mb-2"
        >
          {round.score}
        </motion.div>
        <p className="text-white/60 text-lg">
          {round.score === 1 ? 'name guessed' : 'names guessed'}
        </p>
      </div>

      {/* Guessed names list */}
      {round.guessedNames.length > 0 && (
        <div className="flex-1 overflow-y-auto w-full max-w-md px-6 pb-4">
          <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3">
            Guessed
          </h3>
          <div className="space-y-2">
            {round.guessedNames.map((name, i) => (
              <motion.div
                key={`${name}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 rounded-xl px-4 py-2.5 flex items-center justify-between"
              >
                <span className="text-white font-medium">{name}</span>
                <span className="text-white/30 text-sm">#{i + 1}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 px-6 py-4 shrink-0">
        <Button variant="secondary" onClick={() => setScreen('home')}>
          Home
        </Button>
        <Button onClick={() => setScreen('setup')}>
          Play Again
        </Button>
      </div>
    </motion.div>
  );
}
