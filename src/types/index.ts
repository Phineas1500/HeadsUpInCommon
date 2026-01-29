export type Screen = 'home' | 'setup' | 'ready' | 'game' | 'results';

export type CategoryId =
  | 'hollywood'
  | 'musicians'
  | 'athletes'
  | 'historical'
  | 'tv-internet'
  | 'science-tech'
  | 'world-leaders'
  | 'fictional';

export interface Category {
  id: CategoryId;
  label: string;
  emoji: string;
}

export interface Person {
  name: string;
  categories: CategoryId[];
}

export interface GameSettings {
  enabledCategories: CategoryId[];
  customNames: string[];
  timerSeconds: number;
}

export interface GameRound {
  leftCard: string;
  rightCard: string;
  queue: string[];
  guessedNames: string[];
  score: number;
  timeRemaining: number;
  isRunning: boolean;
}
