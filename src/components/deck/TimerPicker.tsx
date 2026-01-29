const TIMER_OPTIONS = [30, 60, 90, 120];

interface TimerPickerProps {
  value: number;
  onChange: (seconds: number) => void;
}

export function TimerPicker({ value, onChange }: TimerPickerProps) {
  return (
    <div className="flex gap-2">
      {TIMER_OPTIONS.map((seconds) => (
        <button
          key={seconds}
          onClick={() => onChange(seconds)}
          className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-colors cursor-pointer ${
            value === seconds
              ? 'bg-primary text-white'
              : 'bg-white/10 text-white/60 hover:bg-white/15'
          }`}
        >
          {seconds}s
        </button>
      ))}
    </div>
  );
}
