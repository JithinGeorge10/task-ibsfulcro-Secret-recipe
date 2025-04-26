// models/Ingredient.js
import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['vegetable', 'protein', 'spice', 'grain', 'dairy', 'fruit'], 
  },
});

export default mongoose.model('Ingredient', ingredientSchema);
