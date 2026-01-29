import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { useGameStore } from '../store/gameStore';
import { requestTiltPermission } from '../hooks/useDeviceTilt';

export function ReadyScreen() {
  const setScreen = useGameStore((s) => s.setScreen);
  const startRound = useGameStore((s) => s.startRound);

  const handleStart = async () => {
    // Request tilt permission (required on iOS 13+).
    // If denied, the game still works via tap controls.
    await requestTiltPermission();
    startRound();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center gap-8 px-6"
    >
      <div className="text-center space-y-4">
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
          className="text-6xl"
        >
          📱
        </motion.div>
        <h2 className="text-2xl font-bold">Ready?</h2>
        <p className="text-white/60 max-w-xs mx-auto">
          Hold the phone up in <strong className="text-white">landscape mode</strong>.
          Others will describe what the two people have in common.
          Tap the card when someone guesses it, or{' '}
          <strong className="text-white">tilt the phone</strong> left or right!
        </p>
        <p className="text-white/40 text-sm max-w-xs mx-auto">
          Can't find a connection? Hit <strong className="text-white/60">Skip Both</strong> to get new cards.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={() => setScreen('setup')}>
          Back
        </Button>
        <Button size="lg" onClick={handleStart}>
          Start!
        </Button>
      </div>
    </motion.div>
  );
}
