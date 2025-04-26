
import { Ingredient, IngredientCategory } from '@/types/game';
import axios from 'axios';

// Generate unique IDs
const generateId = (prefix: string, index: number): string => {
  return `${prefix}-${index.toString().padStart(3, '0')}`;
};
let ingredient: Ingredient[] = [];

const emojiMap: Record<string, string> = {
  Tomato: '🍅',
  Carrot: '🥕',
  Onion: '🧅',
  Garlic: '🧄',
  'Bell Pepper': '🫑',
  Spinach: '🥬',
  Broccoli: '🥦',
  Eggplant: '🍆',
  Potato: '🥔',
  Cucumber: '🥒',
  Apple: '🍎',
  Banana: '🍌',
  Chicken: '🍗',
  Beef: '🥩',
  Egg: '🥚',
  Shrimp: '🦐',
  Tofu: '🍱',     
  Pork: '🍖',    
  Fish: '🐟',   
  Salt: '🧂',
  Pepper: '🌶️',       // Red chili often used for pepper
  Oregano: '🌿',       // General herb emoji
  Cumin: '🌰',         // Closest available (not perfect, can be customized)
  Cinnamon: '🪵',      // Wood emoji to represent cinnamon sticks
  Paprika: '🌶️',       // Same as pepper; you can differentiate with labels if needed
  Rice: '🍚',
  Pasta: '🍝',
  Bread: '🍞',
  Quinoa: '🌾', // Closest match — represents grain/crop
  Milk: '🥛',
  Cheese: '🧀',
  Yogurt: '🍶',     // Traditionally used for bottles like sake or yogurt drinks
  Butter: '🧈',
  Lemon: '🍋',
  Pineapple: '🍍',
  Coconut: '🥥',

};




// Helper function to create ingredients
const createIngredients = (
  category: IngredientCategory,
  items: Array<{ name: string; emoji: string }>
): Ingredient[] => {
  return items.map((item, index) => ({
    id: generateId(category, index + 1),
    name: item.name,
    category,
    emoji: item.emoji,
  }));
};


const getVegetablesFromDB = async (ingredient) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ingredients`);
    return response.data
      .filter((item: any) => item.category === ingredient)
      .map((item: any) => ({
        name: item.name,
        emoji: emojiMap[item.name] || '❓',       }));
  } catch (error) {
    console.log(error);

  }
}


const vegetableIngredients = await getVegetablesFromDB('vegetable');
const proteinIngredients = await getVegetablesFromDB('protein');
const spiceIngredients = await getVegetablesFromDB('spice');
const grainIngredients = await getVegetablesFromDB('grain');
const dairyIngredients = await getVegetablesFromDB('dairy');
const fruitIngredients = await getVegetablesFromDB('fruit');





export const ingredients: Ingredient[] = [
  ...createIngredients('vegetable', vegetableIngredients),
  ...createIngredients('protein', proteinIngredients),
  ...createIngredients('spice', spiceIngredients),
  ...createIngredients('spice', proteinIngredients),
  ...createIngredients('grain', grainIngredients),
  ...createIngredients('dairy', dairyIngredients),
  ...createIngredients('fruit', fruitIngredients),
];

// Get ingredients by category
export const getIngredientsByCategory = (
  category: IngredientCategory
): Ingredient[] => {
  return ingredients.filter((ingredient) => ingredient.category === category);
};

// Function to get random ingredients for a recipe
export const getRandomRecipe = (length: number): Ingredient[] => {
  // Shuffle the ingredients array
  const shuffled = [...ingredients].sort(() => Math.random() - 0.5);

  // Take the first 'length' ingredients
  return shuffled.slice(0, length);
};

// Function to get ingredients by IDs
export const getIngredientsByIds = (ids: string[]): Ingredient[] => {
  return ingredients.filter((ingredient) => ids.includes(ingredient.id));
};
