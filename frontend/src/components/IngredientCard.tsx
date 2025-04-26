
import React from 'react';
import { Ingredient, IngredientStatus } from '@/types/game';
import { cn } from '@/lib/utils';

interface IngredientCardProps {
  ingredient: Ingredient;
  onClick?: () => void;
  status?: IngredientStatus;
  selected?: boolean;
  className?: string;
}

const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredient,
  onClick,
  status = 'unguessed',
  selected = false,
  className,
}) => {
  const statusClasses = {
    unguessed: '',
    correct: 'bg-green-100 border-green-500',
    almost: 'bg-yellow-100 border-yellow-500',
    wrong: 'bg-gray-100 border-gray-300 opacity-50',
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('ingredient', JSON.stringify(ingredient));
  };

  return (
    <div
      className={cn(
        'ingredient-card transition-all duration-200 border-2 rounded-lg p-3 cursor-pointer hover:shadow-md',
        statusClasses[status],
        selected && 'ring-2 ring-primary',
        className
      )}
      onClick={onClick}
      draggable={status === 'unguessed'}
      onDragStart={handleDragStart}
    >
      <div className="flex flex-col items-center justify-center">
        <span className="text-4xl mb-2">{ingredient.emoji}</span>
        <span className="text-sm font-medium text-center">{ingredient.name}</span>
        <span className="text-xs text-muted-foreground mt-1">{ingredient.category}</span>
      </div>
    </div>
  );
};

export default IngredientCard;
