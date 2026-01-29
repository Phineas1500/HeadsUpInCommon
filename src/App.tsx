import { AnimatePresence } from 'motion/react';
import { useGameStore } from './store/gameStore';
import { HomeScreen } from './screens/HomeScreen';
import { SetupScreen } from './screens/SetupScreen';
import { ReadyScreen } from './screens/ReadyScreen';
import { GameScreen } from './screens/GameScreen';
import { ResultsScreen } from './screens/ResultsScreen';

const screens = {
  home: HomeScreen,
  setup: SetupScreen,
  ready: ReadyScreen,
  game: GameScreen,
  results: ResultsScreen,
} as const;

export default function App() {
  const screen = useGameStore((s) => s.screen);
  const Screen = screens[screen];

  return (
    <AnimatePresence mode="wait">
      <Screen key={screen} />
    </AnimatePresence>
  );
}
