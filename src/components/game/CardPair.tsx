import { useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CardPairProps {
  leftName: string;
  rightName: string;
  onTap: (side: 'left' | 'right') => void;
}

export function CardPair({ leftName, rightName, onTap }: CardPairProps) {
  const cooldownRef = useRef(false);

  const handleTap = useCallback(
    (side: 'left' | 'right') => {
      if (cooldownRef.current) return;
      cooldownRef.current = true;

      // Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }

      onTap(side);

      setTimeout(() => {
        cooldownRef.current = false;
      }, 200);
    },
    [onTap],
  );

  return (
    <div className="flex gap-3 p-3 h-full">
      <GameCard name={leftName} onTap={() => handleTap('left')} color="from-indigo-600 to-purple-700" />
      <GameCard name={rightName} onTap={() => handleTap('right')} color="from-fuchsia-600 to-pink-700" />
    </div>
  );
}

interface GameCardProps {
  name: string;
  onTap: () => void;
  color: string;
}

function GameCard({ name, onTap, color }: GameCardProps) {
  return (
    <motion.button
      className={`flex-1 rounded-3xl bg-gradient-to-br ${color} flex items-center justify-center cursor-pointer shadow-lg active:shadow-inner border-2 border-white/20`}
      onClick={onTap}
      whileTap={{ scale: 0.97 }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center px-4 leading-tight drop-shadow-lg"
        >
          {name}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
