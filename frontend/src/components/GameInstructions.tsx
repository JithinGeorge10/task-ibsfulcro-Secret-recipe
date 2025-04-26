
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const GameInstructions: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">How to Play</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">How to Play</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Goal</h3>
            <p>Guess the secret recipe by selecting the right combination of ingredients!</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 mt-2">
              <li>Select ingredients from the pantry by clicking on them.</li>
              <li>Once you've selected the required number of ingredients, click "Cook Recipe!"</li>
              <li>You'll receive feedback about your guess:</li>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><span className="bg-recipe-success text-white px-2 py-0.5 rounded">Green</span> - Correct ingredient in the right position</li>
                <li><span className="bg-recipe-warning px-2 py-0.5 rounded">Yellow</span> - Correct ingredient but wrong position</li>
                <li><span className="opacity-50 px-2 py-0.5 rounded">Faded</span> - Ingredient not in the recipe</li>
              </ul>
              <li>Use the feedback to refine your next guess.</li>
              <li>Try to guess the recipe in as few attempts as possible!</li>
            </ol>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">Scoring</h3>
            <p>Your score is based on:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Number of attempts (fewer is better)</li>
              <li>Time taken (faster is better)</li>
              <li>Difficulty level</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameInstructions;
