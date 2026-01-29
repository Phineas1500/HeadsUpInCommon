interface TimerProps {
  seconds: number;
}

export function Timer({ seconds }: TimerProps) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = minutes > 0 ? `${minutes}:${String(secs).padStart(2, '0')}` : `${secs}`;

  let colorClass = 'text-teal';
  if (seconds <= 5) {
    colorClass = 'text-rose';
  } else if (seconds <= 15) {
    colorClass = 'text-accent';
  }

  return (
    <span className={`font-mono font-bold text-2xl tabular-nums ${colorClass}`}>
      {display}
    </span>
  );
}
