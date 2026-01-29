import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { CardPair } from '../components/game/CardPair';
import { GameHeader } from '../components/game/GameHeader';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { useGameStore } from '../store/gameStore';
import { useCountdown } from '../hooks/useCountdown';
import { useWakeLock } from '../hooks/useWakeLock';
import { useOrientationHint } from '../hooks/useOrientationHint';
import { useDeviceTilt } from '../hooks/useDeviceTilt';

export function GameScreen() {
  const round = useGameStore((s) => s.round);
  const tapCard = useGameStore((s) => s.tapCard);
  const skipBoth = useGameStore((s) => s.skipBoth);
  const endRound = useGameStore((s) => s.endRound);
  const [showQuit, setShowQuit] = useState(false);
  const isPortrait = useOrientationHint();

  useCountdown();
  useWakeLock(round?.isRunning ?? false);

  const handleTilt = useCallback(
    (action: 'left' | 'right') => {
      tapCard(action);
    },
    [tapCard],
  );

  useDeviceTilt({
    onTilt: handleTilt,
    enabled: round?.isRunning ?? false,
  });

  if (!round) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col h-dvh"
    >
      {/* Portrait overlay */}
      {isPortrait && (
        <div className="absolute inset-0 z-40 bg-text/90 flex flex-col items-center justify-center gap-4">
          <motion.div
            animate={{ rotate: 90 }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: 'reverse' }}
            className="text-6xl"
          >
            📱
          </motion.div>
          <p className="text-base text-xl font-semibold">Rotate to landscape</p>
        </div>
      )}

      <GameHeader
        timeRemaining={round.timeRemaining}
        score={round.score}
        onQuit={() => setShowQuit(true)}
      />

      <div className="flex-1 relative">
        <CardPair
          leftName={round.leftCard}
          rightName={round.rightCard}
          onTap={tapCard}
        />

        {/* Skip button */}
        <button
          onClick={skipBoth}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-surface/80 hover:bg-surface-light active:bg-surface-lighter text-subtext hover:text-text px-5 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-surface-lighter transition-colors cursor-pointer"
        >
          Skip Both
        </button>
      </div>

      {/* Quit confirmation modal */}
      <Modal open={showQuit} onClose={() => setShowQuit(false)}>
        <h3 className="text-lg font-bold text-text mb-3">Quit game?</h3>
        <p className="text-subtext mb-5">Your progress will be lost.</p>
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => setShowQuit(false)}>
            Cancel
          </Button>
          <Button variant="danger" className="flex-1" onClick={endRound}>
            Quit
          </Button>
        </div>
      </Modal>
    </motion.div>
  );
}
