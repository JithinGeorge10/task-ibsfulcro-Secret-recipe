
import React, { useState } from 'react';
import { Ingredient, IngredientCategory } from '@/types/game';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import IngredientCard from './IngredientCard';
import { getIngredientsByCategory } from '@/data/ingredients';

interface IngredientSelectorProps {
  onSelectIngredient: (ingredient: Ingredient) => void;
  selectedIngredients: Ingredient[];
  maxSelections: number;
}

const IngredientSelector: React.FC<IngredientSelectorProps> = ({
  onSelectIngredient,
  selectedIngredients,
  maxSelections,
}) => {
  const [activeCategory, setActiveCategory] = useState<IngredientCategory>('vegetable');

  const categories: { value: IngredientCategory; label: string }[] = [
    { value: 'vegetable', label: '🥕 Vegetables' },
    { value: 'protein', label: '🍗 Proteins' },
    { value: 'spice', label: '🌶️ Spices' },
    { value: 'grain', label: '🍚 Grains' },
    { value: 'dairy', label: '🥛 Dairy' },
    { value: 'fruit', label: '🍎 Fruits' },
  ];

  const isIngredientSelected = (ingredient: Ingredient) => {
    return selectedIngredients.some((selected) => selected.id === ingredient.id);
  };

  const handleIngredientClick = (ingredient: Ingredient) => {
    // If already selected, do nothing
    if (isIngredientSelected(ingredient)) {
      return;
    }

    // If max selections reached, do nothing
    if (selectedIngredients.length >= maxSelections) {
      return;
    }

    onSelectIngredient(ingredient);
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-bold mb-4">Ingredient Pantry</h3>
      <Tabs defaultValue="vegetable" onValueChange={(value) => setActiveCategory(value as IngredientCategory)}>
        <TabsList className="grid grid-cols-3 mb-4">
          {categories.slice(0, 3).map((category) => (
            <TabsTrigger key={category.value} value={category.value}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsList className="grid grid-cols-3 mb-4">
          {categories.slice(3).map((category) => (
            <TabsTrigger key={category.value} value={category.value}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.value} value={category.value}>
            <ScrollArea className="h-[300px] pr-4">
              <div className="grid grid-cols-2 gap-3">
                {getIngredientsByCategory(category.value).map((ingredient) => (
                  <IngredientCard
                    key={ingredient.id}
                    ingredient={ingredient}
                    selected={isIngredientSelected(ingredient)}
                    onClick={() => handleIngredientClick(ingredient)}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
      <div className="mt-4 text-sm text-muted-foreground">
        Selected: {selectedIngredients.length}/{maxSelections} ingredients
      </div>
    </div>
  );
};

export default IngredientSelector;
