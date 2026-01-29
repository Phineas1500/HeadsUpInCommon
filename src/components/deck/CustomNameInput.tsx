import { useState } from 'react';

interface CustomNameInputProps {
  customNames: string[];
  onAdd: (name: string) => void;
  onRemove: (name: string) => void;
}

export function CustomNameInput({ customNames, onAdd, onRemove }: CustomNameInputProps) {
  const [value, setValue] = useState('');

  function handleAdd() {
    if (value.trim()) {
      onAdd(value.trim());
      setValue('');
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add a custom name..."
          className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/40 outline-none focus:border-primary"
        />
        <button
          onClick={handleAdd}
          disabled={!value.trim()}
          className="bg-primary hover:bg-primary-light disabled:opacity-40 text-white px-4 py-2.5 rounded-xl font-medium cursor-pointer disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>
      {customNames.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {customNames.map((name) => (
            <span
              key={name}
              className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-sm"
            >
              {name}
              <button
                onClick={() => onRemove(name)}
                className="text-white/50 hover:text-white ml-1 cursor-pointer"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
