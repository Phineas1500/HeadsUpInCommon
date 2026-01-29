import { Timer } from '../ui/Timer';
import { ScoreDisplay } from './ScoreDisplay';

interface GameHeaderProps {
  timeRemaining: number;
  score: number;
  onQuit: () => void;
}

export function GameHeader({ timeRemaining, score, onQuit }: GameHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 shrink-0 border-b border-surface-lighter">
      <button
        onClick={onQuit}
        className="text-subtext hover:text-text text-sm font-medium px-2 py-1 cursor-pointer"
      >
        Quit
      </button>
      <Timer seconds={timeRemaining} />
      <ScoreDisplay score={score} />
    </div>
  );
}
