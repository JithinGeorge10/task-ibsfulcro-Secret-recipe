import React, { useState, useEffect } from 'react';
import {  initializeGame, submitGuess } from '@/services/gameService';
import { Ingredient, GameState, GameSettings } from '@/types/game';
import IngredientSelector from '@/components/IngredientSelector';
import RecipeDropZone from '@/components/RecipeDropZone';
import GameResults from '@/components/GameResults';
import Leaderboard from '@/components/Leaderboard';
import GameInstructions from '@/components/GameInstructions';
import GameSettingsDialog from '@/components/GameSettings';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>(() => initializeGame());
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      console.log('Target recipe:', gameState.targetRecipe.map(i => i.name));
    })()
  }, [gameState.targetRecipe]);

  const handleSelectIngredient = (ingredient: Ingredient) => {
    if (selectedIngredients.length < gameState.settings.recipeLength) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    } else {
      toast({
        title: 'Recipe Full',
        description: `You can only select ${gameState.settings.recipeLength} ingredients for this recipe.`,
        variant: 'destructive',
      });
    }
  };

  const handleRemoveIngredient = (index: number) => {
    const newSelected = [...selectedIngredients];
    newSelected.splice(index, 1);
    setSelectedIngredients(newSelected);
  };

  const handleSubmitGuess = () => {
    if (selectedIngredients.length !== gameState.settings.recipeLength) {
      toast({
        title: 'Incomplete Recipe',
        description: `You need to select exactly ${gameState.settings.recipeLength} ingredients.`,
        variant: 'destructive',
      });
      return;
    }

    const updatedGameState = submitGuess(gameState, selectedIngredients);
    setGameState(updatedGameState);
    setSelectedIngredients([]);
  };

  const handleNewGame = () => {
    setGameState(initializeGame(gameState.settings));
    setSelectedIngredients([]);
  };

  const handleSettingsChange = (newSettings: GameSettings) => {
    setGameState(initializeGame(newSettings));
    setSelectedIngredients([]);

    toast({
      title: 'Settings Updated',
      description: 'A new game has started with your settings.',
    });
  };

  const handleAddIngredient = (ingredient: Ingredient) => {
    if (selectedIngredients.length < gameState.settings.recipeLength) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    } else {
      toast({
        title: "Recipe Full",
        description: `You can only select ${gameState.settings.recipeLength} ingredients for this recipe.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-wood-pattern py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-primary">Secret Recipe</h1>
          <h1 className="text-4xl md:text-5xl  mb-2 text-primary">"The Mysterious Ingredient Game"</h1>

          <p className="text-muted-foreground mb-6">
            Can you guess the secret recipe?
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button onClick={handleNewGame} variant="default">New Game</Button>
            <GameInstructions />
            <GameSettingsDialog
              currentSettings={gameState.settings}
              onSettingsChange={handleSettingsChange}
            />
            <Leaderboard />
          </div>
          <div className="mt-4 flex justify-center items-center gap-4">
            <div className="bg-card px-3 py-1 rounded-md text-sm">
              <span className="font-medium">Attempts:</span> {gameState.attempts}/{gameState.settings.maxAttempts}
            </div>
            <div className="bg-card px-3 py-1 rounded-md text-sm">
              <span className="font-medium">Recipe:</span> {gameState.settings.recipeLength} ingredients
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <IngredientSelector
              onSelectIngredient={handleSelectIngredient}
              selectedIngredients={selectedIngredients}
              maxSelections={gameState.settings.recipeLength}
            />
          </div>

          <div>
            <RecipeDropZone
              selectedIngredients={selectedIngredients}
              onRemoveIngredient={handleRemoveIngredient}
              onSubmitGuess={handleSubmitGuess}
              maxIngredients={gameState.settings.recipeLength}
              pastGuesses={gameState.pastGuesses}
              onAddIngredient={handleAddIngredient}
            />
          </div>
        </div>

        <GameResults
          gameState={gameState}
          onNewGame={handleNewGame}
          open={gameState.gameOver}
        />
      </div>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>"Secret Recipe" - The Mysterious Ingredient Game</p>
      </footer>
    </div>
  );
};

export default Index;
