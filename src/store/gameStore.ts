import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Screen, CategoryId, GameSettings, GameRound } from '../types';
import { people } from '../data/people';
import { categories } from '../data/categories';
import { shuffle } from '../utils/shuffle';

interface GameState {
  screen: Screen;
  settings: GameSettings;
  round: GameRound | null;

  // Navigation
  setScreen: (screen: Screen) => void;

  // Settings
  toggleCategory: (id: CategoryId) => void;
  addCustomName: (name: string) => void;
  removeCustomName: (name: string) => void;
  setTimerSeconds: (seconds: number) => void;

  // Game
  getPoolSize: () => number;
  startRound: () => void;
  tapCard: (side: 'left' | 'right') => void;
  skipBoth: () => void;
  tick: () => void;
  endRound: () => void;
}

function buildPool(settings: GameSettings): string[] {
  const fromCategories = people
    .filter((p) => p.categories.some((c) => settings.enabledCategories.includes(c)))
    .map((p) => p.name);

  const all = [...new Set([...fromCategories, ...settings.customNames])];
  return all;
}

function drawFromQueue(queue: string[], guessedNames: string[]): { name: string; queue: string[] } {
  if (queue.length > 0) {
    const [name, ...rest] = queue;
    return { name, queue: rest };
  }
  // Re-shuffle guessed names back in
  const reshuffled = shuffle([...guessedNames]);
  const [name, ...rest] = reshuffled;
  return { name, queue: rest };
}

const allCategoryIds = categories.map((c) => c.id);

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      screen: 'home',
      settings: {
        enabledCategories: [...allCategoryIds],
        customNames: [],
        timerSeconds: 60,
      },
      round: null,

      setScreen: (screen) => set({ screen }),

      toggleCategory: (id) =>
        set((state) => {
          const enabled = state.settings.enabledCategories;
          const next = enabled.includes(id)
            ? enabled.filter((c) => c !== id)
            : [...enabled, id];
          return { settings: { ...state.settings, enabledCategories: next } };
        }),

      addCustomName: (name) =>
        set((state) => {
          const trimmed = name.trim();
          if (!trimmed || state.settings.customNames.includes(trimmed)) return state;
          return {
            settings: {
              ...state.settings,
              customNames: [...state.settings.customNames, trimmed],
            },
          };
        }),

      removeCustomName: (name) =>
        set((state) => ({
          settings: {
            ...state.settings,
            customNames: state.settings.customNames.filter((n) => n !== name),
          },
        })),

      setTimerSeconds: (seconds) =>
        set((state) => ({
          settings: { ...state.settings, timerSeconds: seconds },
        })),

      getPoolSize: () => {
        const { settings } = get();
        return buildPool(settings).length;
      },

      startRound: () => {
        const { settings } = get();
        const pool = buildPool(settings);
        const shuffled = shuffle(pool);

        const [left, right, ...rest] = shuffled;

        set({
          screen: 'game',
          round: {
            leftCard: left,
            rightCard: right,
            queue: rest,
            guessedNames: [],
            score: 0,
            timeRemaining: settings.timerSeconds,
            isRunning: true,
          },
        });
      },

      tapCard: (side) =>
        set((state) => {
          if (!state.round || !state.round.isRunning) return state;

          const guessedName = side === 'left' ? state.round.leftCard : state.round.rightCard;
          const newGuessed = [...state.round.guessedNames, guessedName];
          const { name: newName, queue: newQueue } = drawFromQueue(
            state.round.queue,
            newGuessed,
          );

          return {
            round: {
              ...state.round,
              [side === 'left' ? 'leftCard' : 'rightCard']: newName,
              queue: newQueue,
              guessedNames: newGuessed,
              score: state.round.score + 1,
            },
          };
        }),

      skipBoth: () =>
        set((state) => {
          if (!state.round || !state.round.isRunning) return state;

          // Put current cards back into queue and shuffle
          const newQueue = shuffle([
            ...state.round.queue,
            state.round.leftCard,
            state.round.rightCard,
          ]);

          // Draw two new cards
          const draw1 = drawFromQueue(newQueue, state.round.guessedNames);
          const draw2 = drawFromQueue(draw1.queue, state.round.guessedNames);

          return {
            round: {
              ...state.round,
              leftCard: draw1.name,
              rightCard: draw2.name,
              queue: draw2.queue,
            },
          };
        }),

      tick: () =>
        set((state) => {
          if (!state.round || !state.round.isRunning) return state;
          const next = state.round.timeRemaining - 1;
          if (next <= 0) {
            return {
              round: { ...state.round, timeRemaining: 0, isRunning: false },
              screen: 'results',
            };
          }
          return {
            round: { ...state.round, timeRemaining: next },
          };
        }),

      endRound: () =>
        set((state) => ({
          round: state.round ? { ...state.round, isRunning: false } : null,
          screen: 'results',
        })),
    }),
    {
      name: 'heads-up-in-common-settings',
      partialize: (state) => ({ settings: state.settings }),
    },
  ),
);
