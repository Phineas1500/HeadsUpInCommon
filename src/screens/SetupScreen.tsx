import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { DeckSelector } from '../components/deck/DeckSelector';
import { CustomNameInput } from '../components/deck/CustomNameInput';
import { TimerPicker } from '../components/deck/TimerPicker';
import { useGameStore } from '../store/gameStore';

export function SetupScreen() {
  const setScreen = useGameStore((s) => s.setScreen);
  const settings = useGameStore((s) => s.settings);
  const toggleCategory = useGameStore((s) => s.toggleCategory);
  const addCustomName = useGameStore((s) => s.addCustomName);
  const removeCustomName = useGameStore((s) => s.removeCustomName);
  const setTimerSeconds = useGameStore((s) => s.setTimerSeconds);
  const getPoolSize = useGameStore((s) => s.getPoolSize);

  const poolSize = getPoolSize();
  const canStart = poolSize >= 10;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex-1 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0 border-b border-surface-lighter">
        <button
          onClick={() => setScreen('home')}
          className="text-subtext hover:text-text text-sm font-medium cursor-pointer"
        >
          &larr; Back
        </button>
        <h2 className="text-lg font-bold text-text">Game Setup</h2>
        <div className="w-12" />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-6 pt-4">
        {/* Categories */}
        <section>
          <h3 className="text-sm font-semibold text-subtext uppercase tracking-wider mb-3">
            Categories
          </h3>
          <DeckSelector enabledCategories={settings.enabledCategories} onToggle={toggleCategory} />
        </section>

        {/* Custom Names */}
        <section>
          <h3 className="text-sm font-semibold text-subtext uppercase tracking-wider mb-3">
            Custom Names
          </h3>
          <CustomNameInput
            customNames={settings.customNames}
            onAdd={addCustomName}
            onRemove={removeCustomName}
          />
        </section>

        {/* Timer */}
        <section>
          <h3 className="text-sm font-semibold text-subtext uppercase tracking-wider mb-3">
            Timer
          </h3>
          <TimerPicker value={settings.timerSeconds} onChange={setTimerSeconds} />
        </section>

        {/* Pool size info */}
        <div className="text-center text-sm text-overlay">
          {poolSize} names in pool
          {!canStart && (
            <span className="text-danger ml-2">(need at least 10)</span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 shrink-0">
        <Button
          size="lg"
          className="w-full"
          disabled={!canStart}
          onClick={() => setScreen('ready')}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
