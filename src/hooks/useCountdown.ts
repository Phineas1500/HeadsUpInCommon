import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

export function useCountdown() {
  const tick = useGameStore((s) => s.tick);
  const isRunning = useGameStore((s) => s.round?.isRunning ?? false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        tick();
      }, 1000);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, tick]);
}
