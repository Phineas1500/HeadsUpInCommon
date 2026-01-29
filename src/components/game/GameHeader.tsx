import { Timer } from '../ui/Timer';
import { ScoreDisplay } from './ScoreDisplay';

interface GameHeaderProps {
  timeRemaining: number;
  score: number;
  onQuit: () => void;
}

export function GameHeader({ timeRemaining, score, onQuit }: GameHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 shrink-0">
      <button
        onClick={onQuit}
        className="text-white/50 hover:text-white/80 text-sm font-medium px-2 py-1 cursor-pointer"
      >
        Quit
      </button>
      <Timer seconds={timeRemaining} />
      <ScoreDisplay score={score} />
    </div>
  );
}
