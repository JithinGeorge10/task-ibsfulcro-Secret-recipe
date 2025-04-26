import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Ingredient, GameState } from '@/types/game';
import IngredientCard from './IngredientCard';
import { saveScore } from '@/services/gameService';
import { Trophy } from 'lucide-react';

interface GameResultsProps {
  gameState: GameState;
  onNewGame: () => void;
  open: boolean;
}

const GameResults: React.FC<GameResultsProps> = ({ gameState, onNewGame, open }) => {
  const [playerName, setPlayerName] = useState('');
  const [scoreSaved, setScoreSaved] = useState(false);

  const handleSaveScore = () => {
    if (playerName.trim()) {
      saveScore(playerName.trim(), gameState);
      setScoreSaved(true);
    }
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const gameTime = gameState.timeEnded 
    ? formatTime(gameState.timeEnded - gameState.timeStarted)
    : '0:00';

  const recipeName = gameState.targetRecipe
    .map(ingredient => ingredient.name)
    .join(', ');

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl">
            {gameState.gameWon ? (
              <>
                <Trophy className="h-8 w-8 text-yellow-500" />
                You Won!
              </>
            ) : (
              '😔 Recipe Failed'
            )}
          </DialogTitle>
          <DialogDescription>
            {gameState.gameWon ? (
              <div className="text-center">
                <p className="mb-2">
                  Congratulations! You discovered the secret recipe in {gameState.attempts} attempts!
                </p>
                <p className="text-primary font-semibold">
                  The recipe was: {recipeName}
                </p>
              </div>
            ) : (
              'You ran out of attempts to discover the secret recipe.'
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <h3 className="text-lg font-semibold mb-2">The Secret Recipe Was:</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {gameState.targetRecipe.map((ingredient: Ingredient) => (
              <IngredientCard 
                key={ingredient.id} 
                ingredient={ingredient}
                className="w-20 h-20"
              />
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-center">
            <div className="bg-secondary p-3 rounded-md">
              <div className="text-xl font-bold">{gameState.attempts}</div>
              <div className="text-sm text-muted-foreground">Attempts</div>
            </div>
            <div className="bg-secondary p-3 rounded-md">
              <div className="text-xl font-bold">{gameTime}</div>
              <div className="text-sm text-muted-foreground">Time</div>
            </div>
            <div className="col-span-2 bg-primary/20 p-3 rounded-md">
              <div className="text-2xl font-bold">{gameState.score}</div>
              <div className="text-sm text-muted-foreground">Final Score</div>
            </div>
          </div>

          {gameState.gameWon && !scoreSaved && (
            <div className="mt-6">
              <h3 className="text-md font-semibold mb-2">Save Your High Score:</h3>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Your name" 
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                />
                <Button onClick={handleSaveScore}>Save</Button>
              </div>
            </div>
          )}

          {scoreSaved && (
            <div className="mt-4 text-center text-green-600">
              Your score has been saved!
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={onNewGame} className="w-full">
            Start New Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameResults;
