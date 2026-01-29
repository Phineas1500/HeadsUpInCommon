import { motion } from 'motion/react';
import { categories } from '../../data/categories';
import type { CategoryId } from '../../types';

interface DeckSelectorProps {
  enabledCategories: CategoryId[];
  onToggle: (id: CategoryId) => void;
}

export function DeckSelector({ enabledCategories, onToggle }: DeckSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {categories.map((cat) => {
        const isEnabled = enabledCategories.includes(cat.id);
        return (
          <motion.button
            key={cat.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggle(cat.id)}
            className={`flex items-center gap-2 px-3 py-3 rounded-xl text-left transition-colors cursor-pointer ${
              isEnabled
                ? 'bg-primary/20 border-2 border-primary'
                : 'bg-surface-light border-2 border-transparent'
            }`}
          >
            <span className="text-xl">{cat.emoji}</span>
            <span className={`text-sm font-medium ${isEnabled ? 'text-primary-dark' : 'text-subtext'}`}>
              {cat.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
