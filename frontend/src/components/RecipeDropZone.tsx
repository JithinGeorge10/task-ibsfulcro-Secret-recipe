
import React from 'react';
import { Ingredient, IngredientGuess } from '@/types/game';
import IngredientCard from './IngredientCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RecipeDropZoneProps {
  selectedIngredients: Ingredient[];
  onRemoveIngredient: (index: number) => void;
  onSubmitGuess: () => void;
  maxIngredients: number;
  pastGuesses: IngredientGuess[][];
  onAddIngredient?: (ingredient: Ingredient) => void;
}

const RecipeDropZone: React.FC<RecipeDropZoneProps> = ({
  selectedIngredients,
  onRemoveIngredient,
  onSubmitGuess,
  maxIngredients,
  pastGuesses,
  onAddIngredient,
}) => {
  const canSubmit = selectedIngredients.length === maxIngredients;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (selectedIngredients.length >= maxIngredients) return;

    const ingredientData = e.dataTransfer.getData('ingredient');
    if (ingredientData && onAddIngredient) {
      const ingredient = JSON.parse(ingredientData) as Ingredient;
      onAddIngredient(ingredient);
    }
  };

  return (
    <div className="recipe-card bg-recipe-paper rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-bold mb-4">Your Recipe</h3>
      <div
        className={cn(
          'drop-zone min-h-[200px] border-2 border-dashed rounded-lg p-4',
          selectedIngredients.length > 0 ? 'border-primary' : 'border-muted',
          'transition-colors duration-200'
        )}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {selectedIngredients.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            Drag ingredients here to create your recipe!
          </div>
        ) : (
          <div className="flex flex-wrap gap-3 justify-center">
            {selectedIngredients.map((ingredient, index) => (
              <IngredientCard
                key={`${ingredient.id}-${index}`}
                ingredient={ingredient}
                className="w-24 h-28"
                onClick={() => onRemoveIngredient(index)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {selectedIngredients.length}/{maxIngredients} ingredients selected
        </span>
        <Button
          onClick={onSubmitGuess}
          disabled={!canSubmit}
          className="bg-primary hover:bg-primary/90"
        >
          Cook Recipe!
        </Button>
      </div>

      {pastGuesses.length > 0 && (
        <div className="mt-8">
          <h4 className="text-md font-semibold mb-4">Past Attempts</h4>
          <div className="space-y-6">
            {pastGuesses.map((guessSet, guessIndex) => (
              <div 
                key={guessIndex} 
                className="bg-white/80 rounded-lg p-4 shadow-sm border border-muted"
              >
                <div className="text-sm text-muted-foreground mb-3">
                  Attempt {pastGuesses.length - guessIndex}
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {guessSet.map((ingredient, index) => (
                    <IngredientCard
                      key={`${ingredient.id}-past-${guessIndex}-${index}`}
                      ingredient={ingredient}
                      status={ingredient.status}
                      className="w-20 h-24"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDropZone;
