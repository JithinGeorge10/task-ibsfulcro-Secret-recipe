
export type IngredientCategory = 
  | 'vegetable'
  | 'protein'
  | 'spice'
  | 'grain'
  | 'dairy'
  | 'fruit';

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  emoji: string;
}

export type IngredientStatus = 'correct' | 'almost' | 'wrong' | 'unguessed';

export interface IngredientGuess extends Ingredient {
  status: IngredientStatus;
}

export interface GameSettings {
  recipeLength: number;
  maxAttempts: number;
  difficultyLevel: 'easy' | 'medium' | 'hard';
}

export interface GameState {
  targetRecipe: Ingredient[];
  currentGuess: Ingredient[];
  pastGuesses: IngredientGuess[][];
  attempts: number;
  gameOver: boolean;
  gameWon: boolean;
  timeStarted: number;
  timeEnded: number | null;
  score: number;
  settings: GameSettings;
}

export interface ScoreEntry {
  playerName: string;
  score: number;
  attempts: number;
  time: number;
  date: number;
}
