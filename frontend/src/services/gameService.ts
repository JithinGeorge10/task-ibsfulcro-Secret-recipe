
import {
  GameState,
  GameSettings,
  Ingredient,
  IngredientGuess,
  IngredientStatus
} from '@/types/game';
import { getRandomRecipe } from '@/data/ingredients';
import axios from 'axios';


const DEFAULT_SETTINGS: GameSettings = {
  recipeLength: 4,
  maxAttempts: 10,
  difficultyLevel: 'medium',
};

// Initialize a new game
export const initializeGame = (settings: Partial<GameSettings> = {}): GameState => {
  const mergedSettings = { ...DEFAULT_SETTINGS, ...settings };
  const targetRecipe = getRandomRecipe(mergedSettings.recipeLength);

  return {
    targetRecipe,
    currentGuess: [],
    pastGuesses: [],
    attempts: 0,
    gameOver: false,
    gameWon: false,
    timeStarted: Date.now(),
    timeEnded: null,
    score: 0,
    settings: mergedSettings,
  };
};

// Evaluate a guess and get feedback
export const evaluateGuess = (
  guess: Ingredient[],
  targetRecipe: Ingredient[]
): IngredientGuess[] => {
  // Create a copy of the target recipe to track what's been matched
  const targetCopy = [...targetRecipe];

  // First pass: Mark exact matches (correct ingredient in correct position)
  const result: IngredientGuess[] = guess.map((ingredient, index) => {
    if (
      targetCopy[index] &&
      ingredient.id === targetCopy[index].id
    ) {
      // Mark as matched
      targetCopy[index] = null as any;
      return { ...ingredient, status: 'correct' };
    }
    return { ...ingredient, status: 'unguessed' };
  });

  // Second pass: Mark ingredients that exist but are in the wrong position
  result.forEach((ingredientGuess, index) => {
    if (ingredientGuess.status !== 'correct') {
      const matchIndex = targetCopy.findIndex(
        (target) => target && target.id === ingredientGuess.id
      );

      if (matchIndex >= 0) {
        // Found a match in wrong position
        ingredientGuess.status = 'almost';
        // Mark as matched
        targetCopy[matchIndex] = null as any;
      } else {
        // No match at all
        ingredientGuess.status = 'wrong';
      }
    }
  });

  return result;
};

// Check if the guess is correct
export const isGuessCorrect = (evaluatedGuess: IngredientGuess[]): boolean => {
  return evaluatedGuess.every((ingredient) => ingredient.status === 'correct');
};

// Calculate score based on attempts, time, and difficulty
export const calculateScore = (
  gameState: GameState
): number => {
  const timeSpent = (gameState.timeEnded || Date.now()) - gameState.timeStarted;
  const timeInSeconds = Math.floor(timeSpent / 1000);

  const difficultyMultiplier =
    gameState.settings.difficultyLevel === 'easy' ? 1 :
      gameState.settings.difficultyLevel === 'medium' ? 1.5 : 2;

  const recipeBonus = gameState.settings.recipeLength * 100;

  // Base score calculation
  let score = 1000;

  // Deduct points for each attempt (more attempts = lower score)
  score -= (gameState.attempts - 1) * 50;

  // Deduct points for time (quicker = higher score)
  score -= Math.min(500, timeInSeconds);

  // Apply difficulty multiplier and recipe length bonus
  score = Math.max(0, score) * difficultyMultiplier + recipeBonus;

  return Math.round(score);
};

// Submit a guess and update game state
export const submitGuess = (
  gameState: GameState,
  guess: Ingredient[]
): GameState => {
  if (gameState.gameOver || guess.length !== gameState.settings.recipeLength) {
    return gameState;
  }

  const evaluatedGuess = evaluateGuess(guess, gameState.targetRecipe);
  const isCorrect = isGuessCorrect(evaluatedGuess);
  const attempts = gameState.attempts + 1;
  const gameOver = isCorrect || attempts >= gameState.settings.maxAttempts;
  const timeEnded = gameOver ? Date.now() : null;

  const updatedState = {
    ...gameState,
    pastGuesses: [...gameState.pastGuesses, evaluatedGuess],
    currentGuess: [],
    attempts,
    gameOver,
    gameWon: isCorrect,
    timeEnded,
  };

  if (gameOver) {
    updatedState.score = calculateScore(updatedState);
  }

  return updatedState;
};


export const saveScore = async (playerName: string, gameState: GameState): Promise<void> => {
  if (!gameState.gameOver) return;

  const scoreEntry = {
    playerName,
    score: gameState.score,
    attempts: gameState.attempts,
    time: (gameState.timeEnded as number) - gameState.timeStarted,
    date: Date.now(),
  };

  await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/leaderBoard`,
    scoreEntry
  );
};

// Get scores from local storage
export const getScores = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/existingleaderBoard`);
  return response.data || [];
};

